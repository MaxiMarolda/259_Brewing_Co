import { Router } from "express";
import * as barrilController from "./barril.controller.js";

const router = Router();

router.post("/barril", barrilController.createBarril);
router.get("/barril", barrilController.getAllBarril);
router.get("/barril/:_id", barrilController.getBarril);
router.put("/barril/:_id", barrilController.putBarril);

export default router;
