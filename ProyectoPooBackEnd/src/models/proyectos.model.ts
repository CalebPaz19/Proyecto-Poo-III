import { Schema, model, InferSchemaType } from "mongoose";

const esquemaProyecto = new Schema({
  idPropietario: { type: Schema.Types.ObjectId, ref: "usuarios", required: true, index: true },
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, default: "" },
  visibility: { type: String, enum: ["private", "unlisted", "public"], default: "private" },
  colaboradores: [{ type: Schema.Types.ObjectId, ref: "usuarios" }],
  tags: { type: [String], default: [] },
  updatedAt: { type: Date },
}, { timestamps: true });

esquemaProyecto.index({ idPropietario: 1, nombre: 1 }, { unique: true });

export type Proyectos = InferSchemaType<typeof esquemaProyecto>;
export default model("Proyectos", esquemaProyecto);
