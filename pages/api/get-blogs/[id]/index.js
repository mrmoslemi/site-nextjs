import Blog from "@/models/BlogModel";
import connectMongoDB from "@/libs/mongodb";

export default async function handler(req, res) {
  const { id } = req.query;
  await connectMongoDB();
  const blog = await Blog.findById(id);
  console.log(blog);

  res.status(200).json(blog);
}
