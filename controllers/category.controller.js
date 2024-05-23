import { asyncHandler } from "../middlewares/index.js";
import { Category, Item } from "../models/index.js";
import ErrorHandler from "../utils/index.js";

export const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({});
  res.status(200).json({ success: true, results: categories });
});

export const postCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  if (!name) return next(new ErrorHandler("Category is required.", 400));

  const newCategory = await Category.create({ name });

  res.status(201).json({ success: true, results: newCategory });
});

export const putCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) return next(new ErrorHandler("id is required.", 400));
  if (!name) return next(new ErrorHandler("category is required.", 400));

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { name: name },
    { new: true }
  );

  res.status(201).json({ success: true, results: updatedCategory });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorHandler("category id is required.", 400));

  const itemsToDelete = await Item.find({ categoryId: id });

  if (itemsToDelete.length > 0) {
    await Item.deleteMany({ categoryId: id });
  }

  await Category.findByIdAndDelete(id);

  res.status(201).json({ success: true });
});
