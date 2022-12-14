const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const { User, Basket } = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
   return jwt.sign(
      { id, email, role },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
   )
}

class UserController {
   async registration(req, res, next) {
      const { email, password, role } = req.body
      if (!email || !password) {
         return next(ApiError.badRequest('Wrong data'))
      }

      const candidate = await User.find({ email })
      if (candidate.length > 0) {
         return next(ApiError.badRequest('user exists'))
      }
      const hashPassword = await bcrypt.hash(password, 5)

      const user = new User({
         email, role, password: hashPassword
      })

      await user.save()

      const token = generateJwt(user.id, user.email, user.role)
      return res.json(token)
   }

   async login(req, res, next) {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
         return next(ApiError.internal('user is not found'))
      }
      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) {
         return next(ApiError.internal('wrong password or email'))
      }
      const token = generateJwt(user.id, user.email, user.role)
      return res.json(token)
   }

   async check(req, res, next) {
      const token = generateJwt(req.user.id, req.user.email, req.user.role)
      return res.json({ token })
   }
}

module.exports = new UserController()