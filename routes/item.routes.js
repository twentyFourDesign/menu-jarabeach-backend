import express from "express";
import {
  createNewItem,
  deleteItem,
  getAllItemsFiltered,
  getAllItemsUnfiltered,
  updateItem,
} from "../controllers/index.js";
import { ROUTES } from "../constants/index.js";
import upload from "../utils/multer.js"

export const router = express.Router();

router
  .route(ROUTES.ITEMS_UNFILTERED)
  .get(getAllItemsUnfiltered)
  .post(upload.any("image"),createNewItem);

router
  .route(`${ROUTES.ITEMS_UNFILTERED}${ROUTES.ID}`)
  .put(upload.any("image"),updateItem)
  .delete(deleteItem);

router.route(ROUTES.ITEMS_FILTERED).get(getAllItemsFiltered);

export { router as itemRoutes };
