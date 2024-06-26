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

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
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

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {

  try {
    let where: types.IUserWhere = {};
    const selectedUser = req.query.username;
    if (selectedUser && typeof selectedUser === "string") {
      where.$or = [
        { name: { $regex: selectedUser, $options: "i" } },
        { email: { $regex: selectedUser, $options: "i" } }
      ];
    }
    const result = await User.find(where).select(["-password"])

    const page = parseInt(req?.query?.page as string) || 1;
    const pageSize = parseInt(req?.query?.limit as string) || 10;
    const skip = (page - 1) * pageSize;
    const total = await User.find(where).countDocuments();
    const pages = Math.ceil(total / pageSize);

    res.header({
      "x-filter": selectedUser,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pageSize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages),
    });

    if (page > pages) {
      return res.json([]);
    }


    return res.status(200).json(result)
  } catch (error) {
    console.log(error);
    next(error);
  }
}


const deleteUser = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { id } = req.params;
    const user = await User.findOneAndDelete({ _id: id })
    console.log(user)
    return res.status(200).send()
  } catch (error) {
    console.log(error);
    next(error)
  }
}


const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name, email, password, admin, verified } = req.body;
  console.log(req.body)
  try {
    let user = await User.findById({ _id: id });

    if (!user) {
      throw new Error("User not found.");
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.admin = typeof (admin !== "") && typeof (admin !== undefined) && admin !== null ? admin : user?.admin;
    user.verified = typeof (verified !== "") && typeof (verified !== undefined) && verified !== null ? verified : user?.verified;
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

const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    let user = await User.findById({ _id: id });

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



export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  updateProfilePicture,
  getAllUsers,
  deleteUser,
  updateUserProfile,
  getUserProfile
};
