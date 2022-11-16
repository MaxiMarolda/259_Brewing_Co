import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import materiaPrimaRoutes from "./routes/materiaPrima/materiaPrima.routes.js";
import fermentadorRoutes from "./routes/fermentador/fermentador.routes.js";
import recetaRoutes from "./routes/receta/receta.routes.js";
import barrilRoutes from "./routes/barril/barril.routes.js";
import productoRoutes from "./routes/producto/producto.routes.js";
import usuarioRoutes from "./routes/usuario/usuario.routes.js";


const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use(materiaPrimaRoutes);
app.use(fermentadorRoutes);
app.use(recetaRoutes);
app.use(barrilRoutes);
app.use(productoRoutes);
app.use(usuarioRoutes);

const PASSWORD = process.env.DATABASE_PASSWORD;
const USER = process.env.DATABASE_USER;
const CONNECTION_URL = `mongodb+srv://admin:NgOEhyAwhfJQetT5@cluster0.zqbxj5p.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 3001;

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => {
    console.log(error.message);
  });
