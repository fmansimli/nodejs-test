import { Router } from "express";
import * as todosCont from "../controllers/todos.controller";

const router = Router();

router.get("/", todosCont.getAll);
router.get("/:id", todosCont.getById);

router.post("/", todosCont.create);

router.patch("/:id", todosCont.updateById);

router.delete("/", todosCont.deleteAll);
router.delete("/:id", todosCont.deleteById);

export default router;
