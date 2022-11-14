import { Router } from "express";
import * as materiaPrimaController from "./materiaPrima.controller.js";

const router = Router();

//  Si no se le pasa un type, devuelve todas las materias primas
router.get("/materiaPrima/:type", materiaPrimaController.getMateriaPrima);
router.get("/materiaPrima", materiaPrimaController.getAllMateriasPrimas);

router.post("/materiaPrima", materiaPrimaController.createMateriaPrima);

router.put("/materiaPrima/:name", materiaPrimaController.updateMateriaPrima);

// Ruta put para descontar materias primas al producir una receta

export default router;
