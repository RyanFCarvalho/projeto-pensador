const { compareSync } = require('bcryptjs')
const User = require('../models/User')
const { use } = require('../routes/authsRouters')

const bcrypt = require('bcryptjs')

module.exports = class UsersController {
  static registerUser(request, response) {
    return response.render('auth/register')
  }

  static async registerUserSave(request, response) {
    const { name, email, password, passwordConfirmation } = request.body

    // 1° - Validação de senha - password math
    if (password != passwordConfirmation) {
      //mesagem informando ao usuário o problema
      request.flash('message', 'As senhas não coincidem')
      response.render('auth/register')
      return
    }

    // 2° - Validação de email
    if (await User.findOne({ raw: true, where: { email: email } })) {
      //mesagem informando ao usuário o problema
      request.flash('message', 'O endereço de E-mail informado já está cadastrado')
      response.render('auth/register')
      return
    }

    // 3° - Criptografia do password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    // 4° - Criar usuário no banco
    try {
      const createdUser = await User.create({ name, email, password: hashedPassword })

      // 5° - Regra de negócio do app

      console.log(createdUser.id);
      request.session.userId = createdUser.id

      await request.flash('message', 'Cadastro realizado com sucesso')

      request.session.save(() => {
        response.redirect('/')
      })
      return
    } catch (error) {
      console.error('Não foi possível cadastrar o usuário, erro: ' + error)
    }
  }

  static logoutUser(request, response) {
    request.session.destroy()

    response.redirect('/login')
  }

  static loginUser(request, response) {
    return response.render('auth/login')
  }

  static async loginUserSave(request, response) {
    const { email, password } = request.body

    const user = await User.findOne({ raw: true, where: { email: email } })

    if (user) {
      if(await bcrypt.compare(password, user.password)) {
        request.session.userId = user.id

        request.session.save(async () => {
        await request.flash('message', 'Login realizado com secesso')
        response.redirect('/')
        })
        return
      } else {
        request.flash('message', 'A senha informada não confere')
        return response.render('auth/login')
      }
    } else {
      request.flash('message', 'Endereço de E-mail não cadastrado na aplicação')
      return response.render('auth/login')
    }
  }
}
