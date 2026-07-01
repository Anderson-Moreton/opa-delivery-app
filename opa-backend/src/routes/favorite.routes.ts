import { Router } from "express";

import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favorite.controller";

const router = Router();

router.post("/", addFavorite);

router.get("/:userId", getFavorites);

router.delete("/:userId/:productId", removeFavorite);

export default router;
