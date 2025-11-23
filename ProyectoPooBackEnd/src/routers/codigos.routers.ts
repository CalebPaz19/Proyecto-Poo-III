import { Router } from "express";
import { guardarCodigos, traerCodigos } from "../controllers/codigos.controller";

const router = Router();

router.get("/codigos/:idProyecto", traerCodigos);
router.put("/codigos/:idProyecto", guardarCodigos);

export default router;
