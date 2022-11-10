import { Router } from "express";
import * as teamController from "./recetas.controller.js";

const router = Router();

router.get("/teams", teamController.getAllTeams);
router.get("/teams/:name", teamController.getTeam);

router.post("/teams", teamController.createTeam);

export default router;
