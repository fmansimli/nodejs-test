import { Router } from "express";
import * as nodeintCont from "../controllers/nodeint.controller";

const router = Router();

router.get("/sequence", nodeintCont.sequence);
router.get("/sequence2", nodeintCont.sequence2);
router.get("/split-to-chunks", nodeintCont.splitToChunks);
router.get("/estimate-time", nodeintCont.estimateTime);

export default router;
