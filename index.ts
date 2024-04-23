import express from "express";
import { MONGO_DB_URL } from "./config";
import {PORT} from "./config/Port";

// FUNCTION TO CONNECT TO DATABASE
import { DbConnect } from "./services/Database";

// FUNCTION WHICH HAS THE APPLICATION CONFIG LOGIC
import MainApp from "./services/ExpressApp";

async function StartServer() {
  const app = express();

  await MainApp(app);

  await DbConnect(MONGO_DB_URL);

  app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
  });
}

StartServer();
