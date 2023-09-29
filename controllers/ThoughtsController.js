const Thought = require('../models/Thought')

module.exports = class ThoughtsController {
  static async showThoughts(request, response) {
    const tasks = Thought.findAll({ raw: true })

    return response.render('thoughts/home', { tasks: tasks })
  }
}
