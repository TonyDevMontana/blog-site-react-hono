import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@repo/common";
import { verify } from "hono/jwt";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      date: true,
      author: {
        select: {
          username: true,
        },
      },
    },
  });

  return c.json({ blogs });
});

blogRouter.use("/*", async (c, next) => {
  const jwt = c.req.header("Authorization");

  if (!jwt) {
    c.status(401);
    return c.json({ message: "unauthorized" });
  }

  const token: string = jwt.split(" ")[1];

  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ message: "unauthorized" });
  }

  c.set("userId", payload.id);
  console.log(c.get("userId"));
  await next();
});

function formatShortDate(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

const currentDate = new Date();
const formattedDate = formatShortDate(currentDate);

blogRouter.post("/post", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid inputs" });
  }

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("userId"),
        date: formattedDate,
      },
    });
    return c.json({ id: blog.id, message: "Blog created" });
  } catch (e: any) {
    console.log(e.message);
    c.status(411);
    return c.json({ message: "Error while creating blog", msg: e.message });
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = await c.req.param("id");

  const blog = await prisma.blog.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      date: true,
      author: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!blog) {
    c.status(411);
    return c.json({ message: "Unable to get blog", error: true });
  }

  return c.json({ blog, error: false });
});

blogRouter.put("/update/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);

  if (!success) {
    return c.json({ error: "Invalid inputs" });
  }

  try {
    const updatedBlog = await prisma.blog.update({
      where: {
        id: c.req.param("id"),
      },
      data: {
        title: body.title,
        content: body.content,
      },
      select: {
        id: true,
      },
    });

    return c.json({ message: "Updated", id: updatedBlog.id });
  } catch (e) {
    c.status(411);
    return c.json({ error: "Error while Updating" });
  }
});

blogRouter.delete("/delete/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.blog.delete({ where: { id: c.req.param("id") } });
    return c.json({ message: "Blog deleted" });
  } catch (e) {
    return c.json({ error: "Some error occured" });
  }
});

export default blogRouter;
