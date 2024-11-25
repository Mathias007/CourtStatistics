import express from "express";

import { CourtController } from "../controllers";
import { AuthMiddleware } from "../middlewares";

const router = express.Router();

router.get("/", AuthMiddleware.authorize, CourtController.getCourts);
router.get("/:id", AuthMiddleware.authorize, CourtController.getCourtById);
router.post("/", AuthMiddleware.authorize, CourtController.createCourt);
router.put("/:id", AuthMiddleware.authorize, CourtController.updateCourt);
router.delete("/:id", AuthMiddleware.authorize, CourtController.deleteCourt);

router.get(
    "/:courtId/statistics/:year/:category",
    AuthMiddleware.authorize,
    CourtController.getStatisticsByCourt
);
router.post(
    "/:courtId/statistics",
    AuthMiddleware.authorize,
    CourtController.addStatisticToCourt
);
router.put(
    "/:courtId/statistics/:statisticId",
    AuthMiddleware.authorize,
    CourtController.updateStatisticById
);
router.delete(
    "/:courtId/statistics/:statisticId",
    AuthMiddleware.authorize,
    CourtController.deleteStatisticById
);

export default router;
