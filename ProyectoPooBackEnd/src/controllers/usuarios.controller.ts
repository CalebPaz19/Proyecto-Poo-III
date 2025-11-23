import { Request, Response } from "express";
import usuariosModel from "../models/usuarios.model";
import bcrypt from "bcryptjs";

export const registro = async(req: Request, res: Response) => {
    try {
        const { email, contraseña, nombre } = req.body || {};
        
        if (!nombre) {
            return res.status(400).json({ ok: false, message: "nombre requerid0" });
        }
        if (!email) {
             return res.status(400).json({ ok: false, message: "Email requerido" });
        }
        if (!contraseña) {
            return res.status(400).json({ ok: false, message: "contraseña requerida" });
        }
        
        const existe = await usuariosModel.findOne({ email });
        if (existe) {
            return res.status(409).json({ ok: false, message: "El email ya está registrado" });
        }
        const contraseñaHash = await bcrypt.hash(contraseña, 10);
        
        const Usuario = await usuariosModel.create({
            email,
            contraseña: contraseñaHash,
            nombre: nombre || "",
            //role: "Usuario",
            preferencias: { theme: "light", language: "es" }
        });
        
        return res.status(201).json({
            ok: true,
            Usuario: {
                _id: Usuario._id,
                nombre: Usuario.nombre,
                email: Usuario.email,
                //role: Usuario.role,
                preferencias: Usuario.preferencias,
                createdAt: Usuario.createdAt
            }
        });
    } catch (err: any) {
        if (err?.code === 11000) {
            return res.status(409).json({ ok: false, message: "El email ya está registrado" });
        }
        console.error(err);
        return res.status(500).json({ ok: false, message: "Error interno" });
    }
};

export const inicioSesion = async(req: Request, res: Response) => {
    try {
        let { email, contraseña} = req.body;
        
        if (!email) {
            return res.status(400).json({ ok: false, message: "Email requerido" });
        }
        if (!contraseña) {
            return res.status(400).json({ ok: false, message: "contraseña requerida" });
        }

        // Normaliza email para que coincida con cómo se guarda (lowercase+trim)
        email = String(email).toLowerCase().trim();

        const Usuario = await usuariosModel.findOne({ email });
        if (!Usuario) {
            return res.status(400).json({ ok: false, message: "El Usuario no existe, Registrate" });
        }

        const ok = await bcrypt.compare(contraseña, Usuario.contraseña);
        if (!ok) {
        return res.status(401).json({ ok: false, message: "Contraseña incorrecta" });
        }
        
        return res.status(201).json({
            ok: true,
            Usuario: {
                _id: Usuario._id,
                email: Usuario.email,
                nombre: Usuario.nombre,
                //role: Usuario.role,
                preferencias: Usuario.preferencias,
                createdAt: Usuario.createdAt
            }
        });
        }
    catch (err: any) {
        console.error(err);
        return res.status(500).json({ ok: false, message: "Error interno" });
    }
};
