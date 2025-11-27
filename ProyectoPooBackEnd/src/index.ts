import express,{ Express } from "express";
import cors from "cors";
import { connectarBD } from "./controllers/baseDatos.controller";
import usuariosRouter from "./routers/usuarios.router";
import proyectosRouter from "./routers/proyectos.router";
import codigosRouters from "./routers/codigos.routers";

const app: Express = express();

app.use(cors()); //para habilitar cors
app.use(express.json());

const uri  = "mongodb://localhost:27017/quickcodemaker";

(async () => {
  await connectarBD(uri);
})();

//localhost:8000/
app.use("/codeMaker", usuariosRouter);
app.use("/codeMaker", proyectosRouter);
app.use("/codeMaker", codigosRouters);

app.listen(8000, () => {
    console.log("El servidor esta corriendo en el puerto 8000")
})



function crearPlanes() {
  throw new Error("Function not implemented.");
}

