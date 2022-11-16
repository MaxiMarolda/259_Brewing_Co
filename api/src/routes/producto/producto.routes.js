import { Router } from "express";
import * as productoController from "./producto.controller.js";

const router = Router();

router.post("/producto", productoController.createProducto);
router.get("/producto", productoController.getAllProducto);
router.get("/producto/:_id", productoController.getProducto);
router.put("/producto/:_id", productoController.putProducto);

export default router;
