// Mengambil konfigurasi environment dari file .env
import dotenv from "dotenv";

// Mengambil instance express app dari app.js
import app from "./app.js";

// Mengaktifkan dotenv agar process.env bisa digunakan
dotenv.config();

// Menentukan port server
// Jika ada PORT di .env maka gunakan itu
// Jika tidak ada, default ke 3000
const PORT = process.env.PORT || 3000;

// Base URL API
const BASE_URL = `http://localhost:${PORT}`;

// run server
app.listen(PORT, () => {
  console.log(`Server running on ${BASE_URL}`);
  console.log(`Test API User ${BASE_URL}/users`);
});
