import express,{ Express } from "express";
import cors from "cors";
import { connectarBD } from "./controllers/baseDatos.controller";
import usuariosRouter from "./routers/usuarios.router";
import proyectosRouter from "./routers/proyectos.router";
import codigosRouters from "./routers/codigos.routers";
import planesRouters from "./routers/planes.router";
import { crearPlanes } from "./controllers/planes.controller";

const app: Express = express();

app.use(cors()); //para habilitar cors
app.use(express.json());

const uri  = "mongodb://localhost:27017/codeLive";

(async () => {
  await connectarBD(uri);
  await crearPlanes();
})();

//localhost:8000/
app.use("/codeLive", usuariosRouter);
app.use("/codeLive", proyectosRouter);
app.use("/codeLive", codigosRouters);
app.use("/codeLive", planesRouters);

app.listen(8000, () => {
    console.log("El servidor esta corriendo en el puerto 8000")
})




