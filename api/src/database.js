import mongoose from "mongoose";
import { app } from "../index";
import dotenv from "dotenv";

dotenv.config();

const PASSWORD = process.env.DATABASE_PASSWORD;
const USER = process.env.DATABASE_USER;
const CONNECTION_URL = `mongodb+srv://${USER}:${PASSWORD}@cluster0.zqbxj5p.mongodb.net/?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => {
    console.log(error.message);
  });

mongoose.set("useFindAndModify", false);
