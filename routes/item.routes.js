import express from "express";
import {
  createNewItem,
  deleteItem,
  getAllItemsFiltered,
  getAllItemsUnfiltered,
  updateItem,
} from "../controllers/index.js";
import { ROUTES } from "../constants/index.js";

export const router = express.Router();

router
  .route(ROUTES.ITEMS_UNFILTERED)
  .get(getAllItemsUnfiltered)
  .post(createNewItem);

router
  .route(`${ROUTES.ITEMS_UNFILTERED}${ROUTES.ID}`)
  .put(updateItem)
  .delete(deleteItem);

router.route(ROUTES.ITEMS_FILTERED).get(getAllItemsFiltered);

export { router as itemRoutes };
