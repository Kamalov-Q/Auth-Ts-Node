import { Request, Response } from "express";
import { User } from "../../../models/users.model";
import { hashPassword } from "../../../utils/hash";
const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(422).json({ message: "All fields are required" });
      return;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const { _id, name: userName, email: userEmail } = newUser.toObject();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id,
        name: userName,
        email: userEmail,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(422).json({ message: "All fields are required" });
//     }

//     const existingUser = await User.findOne({ email });

//     if (!existingUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isPasswordMatch = await comparePassword(
//       password,
//       existingUser.password
//     );

//     if (!isPasswordMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//   } catch (error) {
//     res.status(500).json({ message: `Internal Server Error : ${error}` });
//   }
// };

export default register;
