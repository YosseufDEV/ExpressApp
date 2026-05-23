import express from "express";

import { authMiddleware } from "../middleware/middleware.js";

import { getWatchList, addToWatchList, deleteFromWatchList } from "../controllers/watchListController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchListSchema } from "../validators/watchListValidators.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/:id", getWatchList);
router.delete("/:id", deleteFromWatchList);
router.post("/", validateRequest(addToWatchListSchema), addToWatchList);

export default router;
