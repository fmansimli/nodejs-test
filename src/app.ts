import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { join } from "path";

import router from "./routes";
import { catch404, catchError } from "./middlewares/error";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(process.cwd(), "public")));

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

app.use("/api", router);

app.use(catch404);
app.use(catchError);

export default app;
