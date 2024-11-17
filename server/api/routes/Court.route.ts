import express from "express";
import * as courtController from "../controllers/Court.controller";

const router = express.Router();

router.get("/", courtController.getCourts);
router.get("/:id", courtController.getCourtById);
router.post("/", courtController.createCourt);
router.put("/:id", courtController.updateCourt);
router.delete("/:id", courtController.deleteCourt);

router.get(
    "/:courtId/statistics/:year/:category",
    courtController.getStatisticsByCourt
);
router.post("/:courtId/statistics", courtController.addStatisticToCourt);
router.put(
    "/:courtId/statistics/:statisticId",
    courtController.updateStatisticById
);
router.delete(
    "/:courtId/statistics/:statisticId",
    courtController.deleteStatisticById
);

export default router;
