import Blog from "@/models/BlogModel";
import connectMongoDB from "@/libs/mongodb";

export default async function handler(req, res) {
  await connectMongoDB();
  const blogs = await Blog.find();
  res.status(200).json(blogs);
}
