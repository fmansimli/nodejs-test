import { Router } from "express";

import apiv1 from "./apiv1";

import todosRouter from "./todos";
import filesRouter from "./files";

const router = Router();

router.use("/", apiv1);
router.use("/todos", todosRouter);
router.use("/files", filesRouter);

export default router;
