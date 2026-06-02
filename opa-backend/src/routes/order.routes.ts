import { Router } from "express";

import {
  createOrder,
  getOrderById,
  getUserOrders,
  getAllOrders,
} from "../controllers/order.controller";

const router = Router();

router.post("/", createOrder);
router.get("/user/:userId", getUserOrders);
router.get("/:id", getOrderById);
router.get("/", getAllOrders);

export default router;
