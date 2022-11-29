import { Router } from "express";
import * as recetaController from "./receta.controller.js";

const router = Router();

router.get("/receta", recetaController.getReceta);

router.post("/receta", recetaController.createReceta);

router.put("/receta", recetaController.updateReceta);

export default router;
