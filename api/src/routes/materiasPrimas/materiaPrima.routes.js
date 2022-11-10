import { Router } from "express";
import * as materiaPrimaController from "./materiaPrima.controller.js";

const router = Router();

router.post("/materiaPrima", materiaPrimaController.createMateriaPrima);

export default router;
