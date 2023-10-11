const { compareSync } = require('bcryptjs')
const Thought = require('../models/Thought')
const User = require('../models/User')

module.exports = class ThoughtsController {
  static async showThoughts(request, response) {
    try {
      const thoughts = await Thought.findAll({ include: User, raw: true })

      return response.render('thoughts/home', { thoughts: thoughts })
    } catch (error) {
      console.error('Não foi possível acessar os dados de pensamento: '+error)
    }
  }
}
