import mongoose, { Mongoose } from "mongoose";

export const connectarBD = async(uri: string) => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("MongoDB conectado");
}