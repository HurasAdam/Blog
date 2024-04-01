import express, { Request, Response, NextFunction } from "express";
import cloudinary from "cloudinary";
import User from "../models/User";
import * as types from "../shared/types";

const registerUser = async (
  req: Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exist.");
    }

    user = await User.create({
      name,
      email,
      password,
    });
    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      throw new Error("Email not found");
    }

    if (await user.comparePassword(password)) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    } else {
      throw new Error("Invalid email or password.");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const userProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = await User.findById({ _id: req.user });

    if (user) {
      return res.status(200).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
      });
    } else {
      let error: types.customError = new Error("User not found");
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findById(req.user);

    if (!user) {
      throw new Error("User not found.");
    }
    user.name = name || user.name;
    user.email = email || user.email;
    if (password && password.lenhth < 6) {
      throw new Error("Password length must be at least 6 characters.");
    } else if (password) {
      user.password = password;
    }
    const updatedUserProfile = await user.save();
    res.status(200).json({
      _id: updatedUserProfile._id,
      avatar: updatedUserProfile.avatar,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      verified: updatedUserProfile.verified,
      admin: updatedUserProfile.admin,
      token: await updatedUserProfile.generateJWT(),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateProfilePicture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file;
  try {
    if (!file) {
      throw new Error("An unexpected error occurred while uploading the file.");
    }

    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    let user = await User.findById(req.user);

    if (!user) {
      throw new Error("An unexpected error occurred while uploading the file.");
    }
    const response = await cloudinary.v2.uploader.upload(dataURI);
    if (!response) {
      throw new Error("An unexpected error occurred while uploading the file.");
    }
    user.avatar = response.url;
    const updatedUser = await user.save();
    return res.status(200).json({
      _id: updatedUser._id,
      avatar: updatedUser.avatar,
      name: updatedUser.name,
      email: updatedUser.email,
      verified: updatedUser.verified,
      admin: updatedUser.admin,
      token: await updatedUser.generateJWT(),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
};
