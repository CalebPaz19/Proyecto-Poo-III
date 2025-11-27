import planesModel from "../models/planes.model";
import { Request, Response } from "express";


export const crearPlanes = async () => {
  const planes = [
    { nombre: "Free",    maxProyectos: 3,   precio: 0 },
    { nombre: "Basic",   maxProyectos: 10,  precio: 5 },
    { nombre: "Premium", maxProyectos: 999, precio: 10 },
  ];

  for (const p of planes) {
    const existe = await planesModel.findOne({ nombre: p.nombre });
    if (!existe) {
      await planesModel.create(p);
      console.log(`Plan creado: ${p.nombre}`);
    } else {
      console.log(`Plan ya existe: ${p.nombre}`);
    }
  }
};

export const obtenerPlan = async (req: Request, res: Response) => {
    try {
        const plan = await planesModel.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ ok: false, message: "Plan no encontrado" });
        }

        return res.json({ ok: true, plan });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ ok: false, message: "Error interno" });
    }
};
