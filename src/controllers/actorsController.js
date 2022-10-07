const db = require("../database/models/index.js");

module.exports = {
  list: (req, res) => {
    db.Actor.findAll({
      include: [{ association: "movies" }],
      order: [["first_name", "ASC"]],
    })
      .then((actors) => {
        return res.render("actorsList", {
          actors,
        });
      })
      .catch((error) => console.log(error));
  },
  detail: (req, res) => {
   db.Actor.findByPk(req.params.id)
    .then((actor) =>
        res.render("actorsDetail", {
            actor
        })
      )
      .catch((error) => console.log(error));
  },
  add: function (req, res) {
    db.Movie.findAll()
      .then((movies) =>
        res.render("actorsAdd", {
          movies,
        })
      )
      .catch((error) => console.log(error));
  },
  create: (req, res) => {
    const { first_name, last_name, rating} = req.body;
    db.Actor.create({
      ...req.body,
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      rating,
    })
      .then((actors) => {
        console.log(actors);
        return res.redirect("/actors/detail/" + actors.id);
      })
      .catch((error) => console.log(error));
  },
  edit: function (req, res) {
    db.Actor.findByPk(req.params.id)
      .then((actors) => {
        res.render("actorsEdit", {
          actors,
        });
      })
      .catch((error) => console.log(error));
  },
  update: function (req, res) {
    db.Actor.update(
      {
        ...req.body,
        first_name: req.body.first_name.trim(),
      },
      {
        where: { id: req.params.id },
      }
    )
      .then((response) => {
        return res.redirect("/actors/detail/" + req.params.id);
      })
      .catch((error) => console.log(error));
  },
  delete: function (req, res) {
    db.Actor.findByPk(req.params.id)
      .then((actor) =>
        res.render("actorsDelete", {
          Actor: actor,
        })
      )
      .catch((error) => console.log(error));
  },
  destroy: function (req, res) {
    db.Actor.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((result) => {
        console.log(result);
        return res.redirect("/actors");
      })

      .catch((error) => console.log(error));
  },
};
