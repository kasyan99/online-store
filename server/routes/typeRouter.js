const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')

//api/type/
router.get('/', typeController.getAll)
router.post('/', typeController.create)

module.exports = router