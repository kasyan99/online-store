const { BasketDevice, Basket, Device } = require('../models/models')
const ApiError = require('../error/ApiError')
const userController = require('./userController')

class BasketController {
   async create(req, res) {
      const { basketId, deviceId } = req.body
      const basketDevice = await BasketDevice.create({ basketId, deviceId })
      return res.json(basketDevice)
   }
   async getAll(req, res) {
      const { basketId } = req.query

      const basketDevices = await BasketDevice.findAll({
         where: { basketId: Number(basketId) },
         include: { model: Device }
      })
      return res.json(basketDevices)
   }
}

module.exports = new BasketController