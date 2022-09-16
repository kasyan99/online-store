const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

//api/basket
router.get('/', basketController.getAll)
router.post('/', basketController.create)

module.exports = router