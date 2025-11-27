import { Request, Response } from "express";
import planesModel from "../models/planes.model";
import Usuarios from "../models/usuarios.model";

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

export const cambiarPlan = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { nuevoPlanId } = req.body;

        if (!nuevoPlanId) {
            return res.status(400).json({ ok: false, message: "nuevoPlanId requerido" });
        }

        const usuario = await Usuarios.findById(userId);
        if (!usuario) {
            return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
        }

        const plan = await planesModel.findById(nuevoPlanId);
        if (!plan) {
            return res.status(404).json({ ok: false, message: "Plan no existe" });
        }

        // Actualizar plan
        usuario.planId = plan._id;
        await usuario.save();

        return res.json({ ok: true, message: "Plan actualizado correctamente", plan });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ ok: false, message: "Error interno" });
    }
};

export const obtenerPlanes = async(req:Request, res:Response) => {
    try {
        const planes = await planesModel.find().sort({ precio: 1 });
        res.json({ ok: true, planes });
    } catch (e) {
        res.status(500).json({ ok: false, message: "Error interno" });
    }
}
