import http from "http";

import app from "./app";
import { AppConfig } from "./config/config";

AppConfig.initialize();

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 6007;

httpServer.listen(PORT, async () => {
  try {
    console.log("@@@@ mongodb connected!");
  } catch (error: any) {
    console.log(`$$$ db connection error! (${error.messsage})`);
  } finally {
    console.log(`@@@@ server is running on http://localhost:${PORT} ...`);
  }
});
