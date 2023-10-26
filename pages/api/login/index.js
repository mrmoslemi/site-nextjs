import User from "@/models/UserModel";
import connectMongoDB from "@/libs/mongodb";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function login(email, password) {
  if (!email || !password) {
    throw Error("رمز عبور و ایمیل الزامیست");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw Error("ایمیل نادرست است");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("رمز عبور نادرست است");
  }

  return user;
}

export default async function handler(req, res) {
  const { email, password } = req.body;
  connectMongoDB();

  try {
    const user = await login(email, password);

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "7d",
    });

    const role = user.role;

    res.status(200).json({ email, token, role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
