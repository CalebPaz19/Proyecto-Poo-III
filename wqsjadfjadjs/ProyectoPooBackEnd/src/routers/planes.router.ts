import { Router } from "express";
import { obtenerPlan } from "../controllers/planes.controller";


const router:Router = Router();

router.get("/planes/:id", obtenerPlan);

export default router;
