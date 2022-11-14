import { Router } from "express";
import * as fermentadorController from "./fermentador.controller.js";

const router = Router();

router.post("/fermentador", fermentadorController.createFermentador);
router.get("/fermentador", fermentadorController.getAllFermentador);
router.get("/fermentador/:name", fermentadorController.getFermentador);
router.put("/fermentador/:name", fermentadorController.putFermentador);

export default router;
