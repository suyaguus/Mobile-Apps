import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Finance API Running" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
