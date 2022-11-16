import { Router } from "express";
import * as recetaController from "./receta.controller.js";

const router = Router();

router.post("/receta", recetaController.createReceta);

export default router;
