const db = require('../database/models/index.js')
const Op = db.Sequelize.Op;

module.exports = {
    list : (req,res) => {
        db.Movie.findAll()
        .then((movies) => {
            return res.render('moviesList',{
                movies
            })
        })
        .catch(error => console.log(error))
    },
    new : (req,res) => {
        db.Movie.findAll({
            order : [
                ['title', 'ASC']
            ]
        })
        .then((movies) => {
            return res.render('newestMovies',{
                movies
            })
        })
        .catch(error => console.log(error))
    },
    recomended : (req,res) => {
        db.Movie.findAll({
            where : {
                release_date : { [Op.gt]: 2008 }
            },
            limit : 5,
            order : [
                ['release_date', 'DESC']
            ],
        })
        .then(movies => {
            return res.render('recommendedMovies',{
                movies
            })
        })
        .catch(error => console.log(error))
    },
    detail : (req,res) => {
        db.Movie.findByPk(req.params.id)
        .then(movie => res.render('moviesDetail', {
            movie
        }))
        .catch(error => console.log(error))
    }
}