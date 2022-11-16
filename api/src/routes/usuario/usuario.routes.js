import { Router } from "express";
import * as usuarioController from "./usuario.controller.js";

const router = Router();

router.post("/usuario", usuarioController.createUsuario);
router.get("/usuario", usuarioController.getAllUsuario);
router.get("/usuario/:name", usuarioController.getUsuario);
router.put("/usuario/:name", usuarioController.putUsuario);

export default router;
