import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import "./database/Config.js";

dotenv.config(); // Place this before any references to process.env

const app = express();
const port = process.env.PORT;
app.use(express.json()); // This line is sufficient for handling JSON data
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public/uploads", express.static("public/uploads"));

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
