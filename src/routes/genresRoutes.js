const express = require("express");
const router = express.Router();
const genresController = require("../controllers/genresController");

router
  .get("/genres", genresController.list)
  .get("/genres/detail/:id", genresController.detail)
  .get("/genres/add", genresController.add)
  .post("/genres/create", genresController.create)
  .get("/genres/edit/:id", genresController.edit)
  .put("/genres/update/:id", genresController.update)
  .get("/genres/delete/:id", genresController.delete)
  .delete("/genres/delete/:id", genresController.destroy);

module.exports = router;
