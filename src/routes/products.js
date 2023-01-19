const { Router } = require("express");
const prodsRouter = Router();
const {
  getAll,
  getOne,
  createProd,
  updateProd,
  deleteProd,
  editProd,
  newProd,
} = require("../controllers/productsController");

prodsRouter.get("/", getAll);
prodsRouter.get("/create", newProd);
prodsRouter.get("/:categoria", getAll);
prodsRouter.get("/prod/:id", getOne);
prodsRouter.get("/edit/:id", editProd);
prodsRouter.post("/", createProd);
prodsRouter.put("/:id", updateProd);
prodsRouter.delete("/:id", deleteProd);

module.exports = prodsRouter;
