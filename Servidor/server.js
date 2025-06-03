const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "usuarios_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexión a MySQL:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});

// Ruta para registrar usuarios
app.post("/api/usuarios", (req, res) => {
  const { nombre, email } = req.body;
  if (!nombre || !email) {
    return res
      .status(400)
      .json({ mensaje: "Todos los campos son obligatorios" });
  }

  const query = "INSERT INTO usuarios (nombre, email) VALUES (?, ?)";
  db.query(query, [nombre, email], (err, result) => {
    if (err) {
      return res.status(500).json({ mensaje: "Error al registrar usuario" });
    }
    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
  });
});

// Ruta para obtener usuarios
app.get("/api/usuarios", (req, res) => {
  const query = "SELECT * FROM usuarios";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ mensaje: "Error al obtener usuarios" });
    }
    res.json(results);
  });
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
