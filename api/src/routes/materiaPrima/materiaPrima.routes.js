import { Router } from "express";
import * as materiaPrimaController from "./materiaPrima.controller.js";

const router = Router();

//  Si no se le pasa un type, devuelve todas las materias primas
router.get("/materiaPrima/:type", materiaPrimaController.getMateriaPrima);
router.get("/materiaPrima", materiaPrimaController.getAllMateriasPrimas);

router.put("/materiaPrima", materiaPrimaController.createMateriaPrima); //crea o modifica una existente
router.put("/materiaPrima/:id", materiaPrimaController.updateMateriaPrima); //cuando se cocina una receta

router.delete("/materiaPrima/:id", materiaPrimaController.deleteMateriaPrima);

// Ruta put para descontar materias primas al producir una receta

export default router;
