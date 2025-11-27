import { Request, Response } from "express";
import paqueteCodigos from "../models/paqueteCodigos.model";

export const traerCodigos = async(req: Request, res: Response) => {
    const { idProyecto } = req.params;
    const codigos = await paqueteCodigos.findOne({ idProyecto });
    if (!codigos) {
        return res.status(404).json({ ok: false, message: "No existe el código del proyecto" });
    }
    /*res.json(codigos);*/
    return res.json({ 
      ok: true, 
      codigo: { 
        html: codigos.html, 
        css: codigos.css, 
        js: codigos.js,
        img: codigos.img
      }
    });
}

export const guardarCodigos = async(req: Request, res: Response) => {
  const { idProyecto } = req.params;
  const { html = "", css = "", js = "", img = "" } = req.body || {};
  const upd = await paqueteCodigos.findOneAndUpdate(
    { idProyecto },
    { $set: { html, css, js, img } },
    { new: true }
  );
  if (!upd) return res.status(404).json({ ok: false, message: "No existe el paquete" });
  return res.json({ ok: true, updatedAt: upd.updatedAt });
}
