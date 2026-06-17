import { Router } from "express";

import { register, login, updateUser } from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.put("/users/:id", updateUser);

export default router;
