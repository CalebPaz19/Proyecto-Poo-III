import { Router } from "express";
import { inicioSesion, registro } from "../controllers/usuarios.controller";

const router = Router();

router.post("/registro", registro);
router.post("/inicioSesion", inicioSesion);

export default router;
