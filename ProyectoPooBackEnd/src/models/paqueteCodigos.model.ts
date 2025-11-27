import { Schema, model, InferSchemaType } from "mongoose";

const esquemaPaqueteCodigos = new Schema({
  idProyecto: { type: Schema.Types.ObjectId, ref: "Proyectos", required: true, unique: true, index: true },
  html: { type: String, default: "" },
  css: { type: String, default: "" },
  js: { type: String, default: "" },
  img: {type: String, default: ""},
  configuraciones: {
    autoSave: { type: Boolean, default: true },
    runOnChange: { type: Boolean, default: true },
  }
}, { timestamps: true });

export type paqueteCodigos = InferSchemaType<typeof esquemaPaqueteCodigos>;
export default model("paqueteCodigos", esquemaPaqueteCodigos);
