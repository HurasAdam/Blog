import express, { Request, Response } from "express"
import User from "../models/User";

const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "User already exist." })
        }

        user = await User.create({
            name, email, password
        });
        return res.status(201).json({
            _id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            verified: user.verified,
            admin: user.admin,
            token: await user.generateJWT(),
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong..." })
    }
};

export { registerUser };