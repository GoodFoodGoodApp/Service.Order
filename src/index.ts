import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router/index.js";
import swaggerDocs from "./utils/swagger.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = parseInt(process.env.PORT as string, 10) || 8083;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
  swaggerDocs(app, PORT);
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());

// Tutorial : https://www.youtube.com/watch?v=b8ZUb_Okxro
