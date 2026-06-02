import { Router } from "express";

import {
  createOrder,
  getOrderById,
  getUserOrders
} from "../controllers/order.controller";

const router = Router();

router.post("/", createOrder);
router.get("/user/:userId", getUserOrders);
router.get("/:id", getOrderById);

export default router;
