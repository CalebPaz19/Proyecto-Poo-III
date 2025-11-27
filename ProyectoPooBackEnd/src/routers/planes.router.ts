import { Router } from "express";
import { cambiarPlan, obtenerPlan, obtenerPlanes } from "../controllers/planes.controller";


const router:Router = Router();

router.get("/planes/:id", obtenerPlan);
router.put("/cambiarPlan/:userId", cambiarPlan);
router.get("/planes", obtenerPlanes);

export default router;
