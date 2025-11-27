import { Schema, model, InferSchemaType } from "mongoose";

const esquemaPreferencias = new Schema({
  tema: { type: String, enum: ["light", "dark"], default: "light" },
  lenguaje: { type: String, enum: ["es", "en"], default: "es" },
}, { _id: false });

const esquemaUsuario = new Schema({
    nombre: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    contraseña: { type: String, required: true },
    //role: { type: String, enum: ["Usuario", "admin"], default: "Usuario" },
    planId: { type: Schema.Types.ObjectId, ref: "Planes", required: true },
    preferencias: { type: esquemaPreferencias, default: {} },
}, { timestamps: true });


export type Usuarios = InferSchemaType<typeof esquemaUsuario>;
export default model("Usuarios", esquemaUsuario);
