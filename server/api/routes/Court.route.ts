import express from "express";
import * as courtController from "../controllers/Court.controller";

const router = express.Router();

router.get("/", courtController.getCourts);
router.get("/:id", courtController.getCourtById);
router.post("/", courtController.createCourt);
router.put("/:id", courtController.updateCourt);
router.delete("/:id", courtController.deleteCourt);

export default router;
