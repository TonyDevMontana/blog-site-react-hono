import { Link } from "react-router-dom";

export const BlogCard = ({
  id,
  title,
  content,
  date,
  username,
}: {
  id: String;
  title: String;
  content: String;
  date: String;
  username: String;
}) => {
  const words = content.split(" ").length;
  return (
    <div className="w-2/4 border-b p-4">
      <Link to={`/blog/${id}`}>
        <div className="flex gap-2 items-center">
          <div>{username}</div>
          <div className="rounded p-0.5 border border-black"></div>
          <div>{date}</div>
        </div>
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-slate-500">{content.slice(0, 200) + "..."}</div>
        <div>{Math.ceil(words / 100)} mins read</div>
      </Link>
    </div>
  );
};
