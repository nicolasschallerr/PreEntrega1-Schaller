import express from "express";

const express = require("express");
const app = express();
const PORT = 8080;

//Middleware
app.use(express.json());
//Metodo POST
app.use(express.urlencoded({ extended: true }));

// Rutas para products
const productsRouter = require("./routes/products");
app.use("/api/products", productsRouter);

// Rutas para carts
const cartsRouter = require("./routes/carts");
app.use("/api/carts", cartsRouter);

//Puerto del servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

export default app;
