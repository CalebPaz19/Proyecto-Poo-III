import { Request, Response } from "express";
import paqueteCodigos from "../models/paqueteCodigos.model";

export const traerCodigos = async(req: Request, res: Response) => {
    const { idProyecto } = req.params;
    const codigos = await paqueteCodigos.findOne({ idProyecto });
    if (!codigos) {
        return res.status(404).json({ ok: false, message: "No existe el código del proyecto" });
    }
    return /*res.json(codigos);*/res.json({ ok: true, codigo: { html: codigos.html, css: codigos.css, js: codigos.js } });
}

export const guardarCodigos = async(req: Request, res: Response) => {
  const { idProyecto } = req.params;
  const { html = "", css = "", js = "" } = req.body || {};
  const upd = await paqueteCodigos.findOneAndUpdate(
    { idProyecto },
    { $set: { html, css, js } },
    { new: true }
  );
  if (!upd) return res.status(404).json({ ok: false, message: "No existe el paquete" });
  return res.json({ ok: true, updatedAt: upd.updatedAt });
}
