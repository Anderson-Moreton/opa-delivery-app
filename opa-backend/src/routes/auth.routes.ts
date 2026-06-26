import { Router } from "express";

import {
  register,
  login,
  updateUser,
  googleLogin,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/google", googleLogin);

router.put("/users/:id", updateUser);

export default router;
