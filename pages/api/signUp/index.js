import User from "@/models/UserModel";
import connectMongoDB from "@/libs/mongodb";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  const { fullName, email, password } = req.body;

  connectMongoDB();

  if (!fullName || !email || !password) {
    res.status(400).json({ error: "لطفا تمام ی فیلدها را پر کنید." });
    return;
  }
  const exists = await User.findOne({ email });
  console.log(exists);
  if (exists) {
    res.status(409).json({ error: "ایمیل وجود دارد." });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    fullName,
    email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    const token = jwt.sign({ userId: savedUser._id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({
      token,
      user: {
        id: savedUser.id,
        fullName: savedUser.fullName,
        email: savedUser.email,
      },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}
