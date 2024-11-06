import express from "express";
const router = express.Router();

import { createTask } from "../controllers/task/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/task/create", protect, createTask);

export default router;
