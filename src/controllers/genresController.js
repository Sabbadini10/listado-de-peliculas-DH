const db = require("../database/models/index.js");
const { Op } = require("sequelize");

module.exports = {
  list: (req, res) => {
    /* let count = db.Movie.findAll({
      where: { genre_id : { 
        [ Op . gt ] :  0
      }}
    });*/ //queria hacer un contador de generos pero no me salio xd

    db.Genre.findAll(
      { include: [{ association: "movies" }],
      order: [['name', 'ASC']]}
      )
    // Promise.all([genres, count])
      .then((genres) => {
        res.render("genresList", {
          genres,
          //count,
        });
      })
      .catch((error) => console.log(error));
  },
  add: function (req, res) {
    db.Genre.findAll()
      .then((genres) =>
        res.render("genresAdd", {
          genres,
        })
      )
      .catch((error) => console.log(error));
  },
  create: (req, res) => {
    const { name } = req.body;
    db.Genre.create({
      ...req.body,
      name: name.trim(),
    })
      .then((genre) => {
        console.log(genre);
        return res.redirect("/genres/detail/" + genre.id);
      })
      .catch((error) => console.log(error));
  },
  detail: (req, res) => {
    db.Genre.findByPk(req.params.id)
      .then((genres) =>
        res.render("genresDetail", {
          genres,
        })
      )
      .catch((error) => console.log(error));
  },
  edit: function (req, res) {
    db.Genre.findByPk(req.params.id)
      .then((genres) => {
        res.render("genresEdit", {
          genres,
        });
      })
      .catch((error) => console.log(error));
  },
  update: function (req, res) {
    db.Genre.update(
      {
        ...req.body,
        name: req.body.name.trim(),
      },
      {
        where: { id: req.params.id },
      }
    )
      .then((response) => {
        return res.redirect("/genres/detail/" + req.params.id);
      })
      .catch((error) => console.log(error));
  },
  delete: function (req, res) {
    db.Genre.findByPk(req.params.id)
      .then((genre) =>
        res.render("genresDelete", {
          Genre: genre,
        })
      )
      .catch((error) => console.log(error));
  },
  destroy: function (req, res) {
    db.Genre.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((result) => {
        console.log(result);
        return res.redirect("/genres");
      })

      .catch((error) => console.log(error));
  },
};
