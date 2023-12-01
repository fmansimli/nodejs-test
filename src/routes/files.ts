import { Router } from "express";
import * as filesCont from "../controllers/files.controller";

const router = Router();

router.get("/download", filesCont.downloadFile);

export default router;
