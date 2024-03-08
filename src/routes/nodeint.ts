import { Router } from "express";

import sequence1 from "../controllers/node-internals/sequence1";
import sequence2 from "../controllers/node-internals/sequence2";
import splitToChunks from "../controllers/node-internals/split-to-chunks";
import estimateTime from "../controllers/node-internals/estimate-time";

const router = Router();

router.get("/sequence1", sequence1);
router.get("/sequence2", sequence2);
router.get("/split-to-chunks", splitToChunks);
router.get("/estimate-time", estimateTime);

export default router;
