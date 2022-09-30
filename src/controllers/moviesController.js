const dayjs = require("dayjs");
const db = require("../database/models/index.js");
const {validationResult} = require('express-validator');
const Op = db.Sequelize.Op;

module.exports = {
  list: (req, res) => {
    db.Movie.findAll(
      {include: [{association: 'genres'}]}
    )
      .then((movies) => {
        return res.render("moviesList", {
          movies,
        });
      })
      .catch((error) => console.log(error));
  },
  new: (req, res) => {
    db.Movie.findAll({
      order: [["release_date", "DESC"]],
      limit: 5,
    })
      .then((movies) => {
        return res.render("newestMovies", {
          movies,
        });
      })
      .catch((error) => console.log(error));
  },
  recomended: (req, res) => {
    db.Movie.findAll({
      where: {
        rating: { [db.Sequelize.Op.gte]: 8 },
      },
      order: [["rating", "DESC"]],
    })
      .then((movies) => {
        return res.render("recommendedMovies", {
          movies,
        });
      })
      .catch((error) => console.log(error));
  },
  detail: (req, res) => {
    db.Movie.findByPk(req.params.id)
      .then((movie) =>
        res.render("moviesDetail", {
          movie,
        })
      )
      .catch((error) => console.log(error));
  },
  add: function (req, res) {
    db.Genre.findAll({ order: ["name"] })
      .then((genres) =>
        res.render("moviesAdd", {
          genres,
        })
      )
      .catch((error) => console.log(error));
  },
  create:(req, res) => {
    //const errors = validationResult(req);
    //if(errors.isEmpty()){
    const { title, rating, awards, release_date, length, genre_id } = req.body;
    db.Movie.create({
      ...req.body,
      title: title.trim(),
    })
      .then((movie) => {
        console.log(movie);
        return res.redirect("/movies/detail/" + movie.id);
      })
      .catch((error) => console.log(error));
  /*}else {
    return res.redirect("/movies/moviesAdd", {
        errors : errors.mapped(),
        old : req.body
      })
    }*/
},
  edit: function (req, res) {
    let genres = db.Genre.findAll({ order: ["name"] });
    let movie = db.Movie.findByPk(req.params.id);
    Promise.all([genres, movie])
      .then(([genres, movie]) => {
        res.render("moviesEdit", {
          genres,
          Movie: movie,
          dayjs: dayjs,
        });
      })
      .catch((error) => console.log(error));
  },
  update: function (req, res) {
    db.Movie.update(
      {
        ...req.body,
        title: req.body.title.trim(),
      },
      {
        where: { id: req.params.id },
      }
    )
      .then((response) => {
        return res.redirect("/movies/detail/" + req.params.id);
      })
      .catch((error) => console.log(error));
  },
  delete: function (req, res) {
    db.Movie.findByPk(req.params.id)
      .then((movie) =>
        res.render("moviesDelete", {
          Movie: movie,
        })
      )
      .catch((error) => console.log(error));
  },

  destroy: function (req, res) {
    db.Movie.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((result) => {
        console.log(result);
        return res.redirect("/movies");
      })

      .catch((error) => console.log(error));
  },
};
