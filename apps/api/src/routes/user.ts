import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInput, signupInput } from "@repo/common";
import { decode, sign, verify } from "hono/jwt";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.get("/check", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const payload = await c.req.header("Authorization");

  if (!payload) {
    c.status(401);
    return c.json({ permitted: false, msg: "No JWT" });
  }

  const token = payload.split(" ")[1];
  try {
    const payload = await verify(token, c.env.JWT_SECRET);

    if (!payload) {
      return c.json({ permitted: false });
    }

    const decoded = decode(token);
    console.log(decoded);
    const userId = decoded.payload.id;

    const data = await prisma.user.findUnique({ where: { id: userId } });

    return c.json({
      permitted: true,
      username: data?.username,
      email: data?.email,
    });
  } catch (e: any) {
    return c.json({ permitted: false, msg: `Error: ${e.message}` });
  }
});

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      message: "Invalid inputs",
      success: false,
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });
    return c.json({ message: "Signup successful", success: true });
  } catch (e) {
    c.status(403);
    return c.json({ message: "Error while signing up", success: false });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);
  if (!success) {
    return c.json({ error: "Invalid Inputs" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    const userData: {
      id: String | undefined;
    } = {
      id: user?.id,
    };

    const jwt = await sign(userData, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    return c.json({ error: "Cannot find user in database" });
  }
});

export default userRouter;
