import { Router } from "express";
import { compartirProyecto, crearProyecto, eliminarProyecto, listarProyectos, listarProyectosCompartidos } from "../controllers/proyectos.controller";

const router = Router();

router.post("/proyectos", crearProyecto);
router.get("/proyectos/:idPropietario", listarProyectos);
router.delete("/proyectos/:_id", eliminarProyecto);
router.post("/proyectos/compartir/:idProyecto", compartirProyecto);
router.get("/proyectosCompartidos/:userId", listarProyectosCompartidos);


export default router;
