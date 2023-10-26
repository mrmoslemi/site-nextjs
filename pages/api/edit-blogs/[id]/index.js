import Blog from "@/models/BlogModel";

export default async function handler(req, res) {
  const updatedBlog = req.body;
  const { id } = req.query;
  await Blog.findByIdAndUpdate(id, updatedBlog);
  res.status(202).json({ message: "blog updated" });
}
