import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { useBlog } from "../hooks";
import { Spinner } from "../components/Spinner";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog, error } = useBlog(id);

  if (loading) {
    return (
      <div>
        <Appbar />
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center mt-16">
          Cannot load blog. You entered a wrong URL
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="grid grid-cols-4">
        <div className="flex flex-col col-span-3 p-12">
          <div>
            <div className="text-4xl font-semibold mb-8">{blog?.title}</div>
            <div className="text-lg leading-relaxed">{blog?.content}</div>
          </div>
        </div>
        <div className="p-12 flex gap-2">
          <div>{blog?.author.username}</div>
          <div>{blog?.date}</div>
        </div>
      </div>
    </div>
  );
};
