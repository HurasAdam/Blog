import { Request, Response, NextFunction } from "express";
import * as types from "../shared/types";
import Tag from "../models/PostTags";

const createTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, color } = req.body;

    const tag = await Tag.findOne({ name });

    if (tag) {
      const error = new Error("Tag already exists");
      return next(error);
    }

    const newTag = new Tag({
      name,
      createdBy: req?.user,
      color: color || "blue-500",
    });

    const createdTag = await newTag.save();
    res.status(201).json(createdTag);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllTags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter = req.query.searchKeyword;
    let where: types.ICategoryWhere = {};
    if (filter && typeof filter === "string") {
      where.name = { $regex: filter, $options: "i" };
    }

    let query = Tag.find(where);
    const page = parseInt(req?.query?.page as string) || 1;
    const pageSize = parseInt(req?.query?.limit as string) || 100;
    const skip = (page - 1) * pageSize;
    const total = await Tag.find(where).countDocuments();
    const pages = Math.ceil(total / pageSize);

    res.header({
      "x-filter": filter,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pageSize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages),
    });

    if (page > pages) {
      return res.json([]);
    }
    const result = await query
      .skip(skip)
      .limit(pageSize)
      .populate([{ path: "createdBy", select: ["name", "avatar"] }])
      .sort({ updatedAt: "descending" });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export { createTag, getAllTags };
