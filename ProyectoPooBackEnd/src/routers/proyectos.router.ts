import { Router } from "express";
import { crearProyecto, eliminarProyecto, listarProyectos } from "../controllers/proyectos.controller";

const router = Router();

router.post("/proyectos", crearProyecto);
router.get("/proyectos/:idPropietario", listarProyectos);
router.delete("/proyectos/:_id", eliminarProyecto);

export default router;
