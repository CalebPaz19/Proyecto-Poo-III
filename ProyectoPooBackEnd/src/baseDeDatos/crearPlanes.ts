import mongoose from "mongoose";
import Planes from "../models/planes.model";

const crearPlanes = async()=> {
    await mongoose.connect("mongodb://localhost:27017/quickcodemaker");

    const planes = [
        { nombre: "Free", maxProyectos: 3, precio: 0 },
        { nombre: "Basic", maxProyectos: 10, precio: 5 },
        { nombre: "Premium", maxProyectos: 999, precio: 10 },
    ];

    for (const p of planes) {
        const existe = await Planes.findOne({ nombre: p.nombre });
        if (!existe) {
            await Planes.create(p);
            console.log(`Plan creado: ${p.nombre}`);
        } else {
            console.log(`Plan ya existe: ${p.nombre}`);
        }
    }

    console.log("Listo.");
    process.exit(0);
}

crearPlanes();
