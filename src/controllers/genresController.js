const db = require('../database/models/index.js')

module.exports = {
    list : (req,res) => {
        db.Genre.findAll()
        .then((genres) => {
            return res.render('genresList',{
            genres})
        })
        .catch(error => console.log(error))
    },
    new : (req,res) => {

    },
    recomended : (req,res) => {

    },
    detail : (req,res) => {
        db.Genre.findByPk(req.params.id)
        .then(genres => res.render('genresDetail', {
            genres
        }))
        .catch(error => console.log(error))
    }
}