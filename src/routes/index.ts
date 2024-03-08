import { Router } from "express";

import apiv1 from "./apiv1";

import todosRouter from "./todos";
import filesRouter from "./files";
import nodeintRouter from "./nodeint";

const router = Router();

router.use("/", apiv1);
router.use("/todos", todosRouter);
router.use("/files", filesRouter);
router.use("/nodeint", nodeintRouter);

export default router;
