import { Request, Response } from "express";
import Proyectos from "../models/proyectos.model";
import PaqueteCodigos from "../models/paqueteCodigos.model";
import planesModel from "../models/planes.model";
import usuariosModel from "../models/usuarios.model";

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


export const listarProyectos = async (req: Request, res: Response) => {
    try {
        const idUsuario = req.params.idPropietario;
        if (!idUsuario) {
            return res.status(400).json({ ok: false, message: "idPropietario requerido" });
        }

        //Proyectos creados por el usuario
        const propios = await Proyectos.find({ idPropietario: idUsuario });

        //Proyectos donde es colaborador
        const compartidos = await Proyectos.find({ colaboradores: idUsuario });

        //Evitar duplicados (en caso de que el propietario también esté en colaboradores)
        const mapa = new Map();
        
        propios.forEach(p => mapa.set(String(p._id), p));
        compartidos.forEach(p => mapa.set(String(p._id), p));

        const proyectosUnicos = [...mapa.values()];

        //Adjuntar miniatura desde PaqueteCodigos
        const proyectosConImagen = await Promise.all(
            proyectosUnicos.map(async (p) => {
                const paquete = await PaqueteCodigos.findOne({ idProyecto: p._id });

                return {
                    ...p.toObject(),
                    img: paquete?.img || "",
                    esPropietario: String(p.idPropietario) === idUsuario  // extra opcional
                };
            })
        );

        //Ordenar por fecha (como antes)
        proyectosConImagen.sort((a, b) => {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });

        return res.json({ ok: true, proyectos: proyectosConImagen });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Error interno" });
    }
};


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

export const compartirProyecto = async (req: Request, res: Response) => {
    try {
        const { idProyecto } = req.params;
        const { email } = req.body;
        const idPropietario = req.body.idPropietario;

        if (!email) {
            return res.status(400).json({ ok: false, message: "Email requerido" });
        }

        const proyecto = await Proyectos.findById(idProyecto);
        if (!proyecto) {
            return res.status(404).json({ ok: false, message: "Proyecto no encontrado" });
        }

        if (String(proyecto.idPropietario) !== idPropietario) {
            return res.status(403).json({ ok: false, message: "No puedes compartir un proyecto que no te pertenece" });
        }

        // BUSCAR USUARIO POR EMAIL
        const usuario = await usuariosModel.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ ok: false, message: "Ese usuario no existe" });
        }

        // YA ES COLABORADOR
        if (proyecto.colaboradores.includes(usuario._id)) {
            return res.json({ ok: false, message: "Ese usuario ya tiene acceso" });
        }

        // VALIDAR PLAN
        const planUsuario = await planesModel.findById(usuario.planId);
        const planOwner = await planesModel.findById(idPropietario);

        const limitePorPlan = {
            Free: 0,
            Basic: 1,
            Premium: 3
        };

        if(planOwner){
          const planOwnerName = planOwner.nombre;
          const max = limitePorPlan[planOwnerName] ?? 0;
          
          if (proyecto.colaboradores.length >= max) {
            return res.status(403).json({
                ok: false,
                message: `Tu plan (${planOwnerName}) solo permite ${max} colaborador(es)`
            });
        }
        }
        

        proyecto.colaboradores.push(usuario._id);
        await proyecto.save();

        res.json({ ok: true, message: "Usuario agregado como colaborador" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Error interno" });
    }
};

export const listarProyectosCompartidos = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

        const proyectos = await Proyectos.find({
            colaboradores: userId
        });

        return res.json({ ok: true, proyectos });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ ok: false, message: "Error interno" });
    }
};



