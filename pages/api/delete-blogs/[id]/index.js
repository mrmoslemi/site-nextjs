import Blog from "@/models/BlogModel";

export default async function handler(req, res) {
  const { id } = req.query;
  await Blog.findByIdAndDelete(id);
  res.status(202).json({ message: "blog deleted" });
}
