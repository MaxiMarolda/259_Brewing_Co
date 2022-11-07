import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
//import morgan from "morgan";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
//app.use(morgan("dev"));

const CONNECTION_URL = "mongodb+srv://pablo:40142329@cluster0.nn5qyj7.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3001;

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => {
    console.log(error.message);
  });
