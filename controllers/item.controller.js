import { asyncHandler } from "../middlewares/index.js";
import ErrorHandler from "../utils/index.js";
import { Category, Item } from "../models/index.js";
import { SUCCESSFULL_DELETE, SUCCESSFULL_UPDATE } from "../constants/index.js";
import fileUploader from "../utils/fileUploader.js";

export const getAllItemsFiltered = asyncHandler(async (req, res, next) => {
  const categoryQuery = req.query.category;
  let results = [];

  if (categoryQuery) {
    const category = await Category.findOne({ name: categoryQuery });
    if (category) {
      const items = await Item.find({ categoryId: category._id }).populate(
        "categoryId",
        "name"
      );
      results.push({
        category: category.name,
        list: items,
      });
    }
  } else {
    const categories = await Category.find();
    results = await Promise.all(
      categories.map(async (category) => {
        const items = await Item.find({ categoryId: category._id }).populate(
          "categoryId",
          "name"
        );
        return {
          category: category.name,
          list: items,
        };
      })
    );
  }

  res.status(200).json({
    success: true,
    results,
  });
});

export const createNewItem = asyncHandler(async (req, res, next) => {
  const { name, price, categoryName } = req.body;

  console.log(req.body);

  // return

  const image = req.files[0].path;

  // console.log(image);

  // return

  if (!name) return next(new ErrorHandler("Item name is required.", 400));
  if (!price) return next(new ErrorHandler("Item price is required.", 400));
  if (!categoryName)
    return next(new ErrorHandler("Category name is required.", 400));

  const imageurl = await fileUploader(image)
  // return console.log(imageurl.secure_url);
  const category = await Category.findOne({ name: categoryName });
  const newItem = await Item.create({ name, price, categoryId: category._id, image : imageurl.secure_url });

  res.status(201).json({
    success: true,
    results: newItem,
  });
});

export const updateItem = asyncHandler(async (req, res, next) => {
  const { name, price, categoryName } = req.body;
  const image = req.files[0].path;
  // return console.log(req);
  const imageurl = await fileUploader(image)

  const item = await Item.findById(req.params.id);
  const category = await Category.findOne({ name: categoryName });

  if (!item) return next(new ErrorHandler("No item exists with given id", 400));

  if (name) item.name = name;
  if (price) item.price = price;
  if (categoryName) item.categoryId = category._id;
  // console.log(item); 
  if(imageurl) item.image = imageurl.secure_url



  await item.save();

  res.status(200).json({
    success: true,
    message: SUCCESSFULL_UPDATE("Item"),
  });
});

export const deleteItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  if (!item) return next(new ErrorHandler("No item found with given Id.", 400));

  await Item.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: SUCCESSFULL_DELETE("Item"),
  });
});

export const getAllItemsUnfiltered = asyncHandler(async (req, res, next) => {
  const results = await Item.find({}).populate("categoryId", "name");
  res.status(200).json({
    success: true,
    results,
  });
});
