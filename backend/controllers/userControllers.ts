import express, { Request, Response, NextFunction } from "express"
import User from "../models/User";


const registerUser = async (req: Request, res: express.Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email })

        if (user) {
            // return res.status(400).json({ message: "User already exist." })
            throw new Error("User already exist.")
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
        next(error)
    }
};

export { registerUser };