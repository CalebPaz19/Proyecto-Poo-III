import { Schema, model } from "mongoose";

const PlanSchema = new Schema({
  nombre: { type: String, required: true, unique: true },
  maxProyectos: { type: Number, required: true }, // límite de proyectos
  precio: { type: Number, default: 0 },
}, { timestamps: true });

export default model("Planes", PlanSchema);
