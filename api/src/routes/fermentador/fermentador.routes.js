import { Router } from "express";
import * as fermentadorController from "./fermentador.controller.js";

const router = Router();

router.post("/fermentador", fermentadorController.createFermentador);

export default router;
