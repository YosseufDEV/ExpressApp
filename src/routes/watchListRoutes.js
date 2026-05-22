import express from "express";

import { authMiddleware } from "../middleware/middleware.js";

import { addToWatchList, deleteFromWatchList } from "../controllers/watchListController.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/", addToWatchList);
router.delete("/:id", deleteFromWatchList);

export default router;
