import express from "express";
import connenctDB from "./config/db.js";
import chalk from "chalk";
import { UserRegisteration } from "./controllers/userController.js";

const app = express();
app.use(express.json())
const PORT = 8000;

app.post("/api/register_user", UserRegisteration);

connenctDB();

app.listen(PORT, () => {
  console.log(`${chalk.green.bold("LISTENING ON PORT")}${PORT}...`);
});

// app.listen(3000, () => console.log('Server is running on port 3000'));
