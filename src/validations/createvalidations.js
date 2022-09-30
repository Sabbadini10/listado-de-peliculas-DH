const {check} = require('express-validator');

module.exports = [
    check('title')
        .notEmpty().withMessage('El titulo es obligatorio').bail()
        .isLength({
            min : 2
        }).withMessage('Mínimo 2 caracteres').bail(),

    check('rating')
        .notEmpty().withMessage('El raiting es obligatorio').bail()
       .isNumeric().isLength({ min: 0, max: 2 }),
    check('awards')
        .notEmpty().withMessage('Los premios es obligatorio').bail()
        .isNumeric().isLength({ min: 0, max: 2 }),
    check('release_date')
        .notEmpty().withMessage('La fecha es obligatoria').bail(),

    check('length')
        .notEmpty().withMessage('La duracion es obligatoria').bail()
        .isNumeric().isLength({ min: 0, max: 3}),
    check('genre_id')
    .notEmpty().withMessage('El genero es obligatorio').bail(),
]