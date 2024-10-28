export const productValidator = (req, res, next) => {
  const { title, price } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({
      message: "El 'title' es requerido y debe ser un texto",
    });
  }

  if (price === undefined || typeof price !== "number") {
    return res
      .status(400)
      .json({ message: "El campo 'price' es requerido y debe ser un número" });
  }
  // Si todo validado, sigue el programa
  next();
};
