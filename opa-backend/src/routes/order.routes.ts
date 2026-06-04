import { Router } from "express";

import {
  createOrder,
  getOrderById,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} from "../controllers/order.controller";

const router = Router();

router.post("/", createOrder);
router.get("/user/:userId", getUserOrders);
router.get("/:id", getOrderById);
router.get("/", getAllOrders);
router.patch("/:id/status", updateOrderStatus);

export default router;
