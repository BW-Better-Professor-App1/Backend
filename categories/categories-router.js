const router = require("express").Router();
const categories = require('./categories-model')

router.get('/', (req, res) => {
    categories.getAllCategories()
        .then(categories => {
            res.status(200).json(categories)
        })
        .catch(({
            name,
            code,
            message,
            stack
        }) => {
            res.status(500).json({
                name,
                code,
                message,
                stack
            })
        })
})

router.get('/:id', (req, res) => {
    categories.findCategoryName(req.params.id)
        .then(category => {
            res.status(200).json(category)
        })
        .catch(({
            name,
            code,
            message,
            stack
        }) => {
            res.status(500).json({
                name,
                code,
                message,
                stack
            })
        })
})

module.exports = router;