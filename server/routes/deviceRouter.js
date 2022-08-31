const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')

router.get('/', deviceController.getAll)
router.post('/', deviceController.create)
router.get('/:id', deviceController.getOne)

module.exports = router