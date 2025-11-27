import { Request, Response } from "express";
import Proyectos from "../models/proyectos.model";
import PaqueteCodigos from "../models/paqueteCodigos.model";

// POST /proyectos
export const crearProyecto = async (req: Request, res: Response) => {
  const { idPropietario, nombre, descripcion = "" } = req.body || {};

  if (!idPropietario || !nombre?.trim()) {
    return res.status(400).json({ ok: false, message: "idPropietario y nombre son requeridos" });
  }

  try {
    // Evita duplicado por usuario+nombre
    const yaExiste = await Proyectos.findOne({ idPropietario, nombre: nombre.trim() });
    if (yaExiste) {
      return res.status(409).json({ ok: false, message: "Ya existe un proyecto con ese nombre" });
    }

    // 1) Crear proyecto
    const proyecto = await Proyectos.create({
      idPropietario,
      nombre: nombre.trim(),
      descripcion,
    });

    try {
      // 2) Crear paquete de códigos
      await PaqueteCodigos.create({
        idProyecto: proyecto._id,
        html: "",
        css: "",
        js: "",
      });

      return res.status(201).json({ ok: true, proyecto });
    } catch (e: any) {
      // Si la 2da parte falla, deshace la 1ra
      await Proyectos.findByIdAndDelete(proyecto._id);

      // Duplicado único del paquete (idProyecto unique)
      if (e?.code === 11000) {
        return res.status(409).json({ ok: false, message: "El proyecto ya tiene paquete de códigos" });
      }

      console.error("Error crear paqueteCodigos:", e?.message || e);
      return res.status(500).json({ ok: false, message: "No se pudo crear el paquete de códigos" });
    }

  } catch (e: any) {
    if (e?.code === 11000) {
      return res.status(409).json({ ok: false, message: "Proyecto duplicado" });
    }
    console.error("Error crearProyecto:", e?.message || e);
    return res.status(500).json({ ok: false, message: "Error interno" });
  }
};

// GET /proyectos/idPropietario=...
export  const listarProyectos = async(req: Request, res: Response) => {
  try {
    const idPropietario = req.params.idPropietario;
    if (!idPropietario) return res.status(400).json({ ok: false, message: "idPropietario requerido" });

    const proyectos = await Proyectos.find({ idPropietario }).sort({ updatedAt: -1 });

    // Agregar miniatura desde PaqueteCodigos
    const proyectosConImagen = await Promise.all(
      proyectos.map(async p => {
        const paquete = await PaqueteCodigos.findOne({ idProyecto: p._id });
        return {
          ...p.toObject(),
          img: paquete?.img || ""
        };
      })
    );

    return res.json({ ok: true, proyectos: proyectosConImagen });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, message: "Error interno" });
  }
}

export const eliminarProyecto = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
        // Verificar que exista el proyecto
        const proyecto = await Proyectos.findById(_id);
        
        if (!proyecto) {
            return res.status(404).json({ ok: false, message: "Proyecto no encontrado" });
        }
        
        // Borrar el PaqueteCodigos asociado 
        await PaqueteCodigos.deleteOne({ idProyecto: _id });
        // Borrar el proyecto
        await Proyectos.findByIdAndDelete(_id);

        return res.json({ ok: true, message: "Proyecto eliminado correctamente" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ ok: false, message: "Error eliminando proyecto" });
  }
};
