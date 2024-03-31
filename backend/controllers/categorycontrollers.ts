import { Request, Response, NextFunction } from "express";
import Category from "../models/PostCategories";
import * as types from "../shared/types";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const category = await Category.findOne({ name });

    if (category) {
      const error = new Error("Category already exists");
      return next(error);
    }

    const newCategory = new Category({
      name,
    });

    const createdCategory = await newCategory.save();
    res.status(200).json(createdCategory);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter = req.query.searchKeyword;
    let where: types.ICategoryWhere = {};
    if (filter && typeof filter === "string") {
      where.name = { $regex: filter, $options: "i" };
    }

    let query = Category.find(where);
    const page = parseInt(req?.query?.page as string) || 1;
    const pageSize = parseInt(req?.query?.limit as string) || 1;
    const skip = (page - 1) * pageSize;
    const total = await Category.find(where).countDocuments();
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
      .sort({ updatedAt: "descending" });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export { createCategory, getAllCategories };
