import Blog from "@/models/BlogModel";
import connectMongoDB from "@/libs/mongodb";

export default function handler(req, res) {
  const blog = req.body;
  connectMongoDB();
  console.log(blog);
  Blog.create(blog);
  res.status(201).json({ message: "Blog Created" });
}
