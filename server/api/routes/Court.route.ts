import express from "express";
import * as courtController from "../controllers/Court.controller";
import { authMiddleware } from "../middlewares/Auth.middleware";

const router = express.Router();

router.get("/", authMiddleware, courtController.getCourts);
router.get("/:id", authMiddleware, courtController.getCourtById);
router.post("/", authMiddleware, courtController.createCourt);
router.put("/:id", authMiddleware, courtController.updateCourt);
router.delete("/:id", authMiddleware, courtController.deleteCourt);

router.get(
    "/:courtId/statistics/:year/:category",
    authMiddleware,
    courtController.getStatisticsByCourt
);
router.post(
    "/:courtId/statistics",
    authMiddleware,
    courtController.addStatisticToCourt
);
router.put(
    "/:courtId/statistics/:statisticId",
    authMiddleware,
    courtController.updateStatisticById
);
router.delete(
    "/:courtId/statistics/:statisticId",
    authMiddleware,
    courtController.deleteStatisticById
);

export default router;
