import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Blogs } from "./pages/Blogs";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Publish } from "./pages/Publish";
import { Blog } from "./pages/Blog";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blogs />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/publish" element={<Publish />}></Route>
        <Route path="/blog/:id" element={<Blog />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
