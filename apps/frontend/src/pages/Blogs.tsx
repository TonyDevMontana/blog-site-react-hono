import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { Spinner } from "../components/Spinner";
import { useBlogs } from "../hooks";

export function Blogs() {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center flex-col items-center">
        {blogs.map((blog) => (
          <BlogCard
            id={blog.id}
            username={blog.author.username}
            title={blog.title}
            content={blog.content}
            date={blog.date}
            key={blogs.indexOf(blog) + 1}
          />
        ))}
      </div>
    </div>
  );
}
