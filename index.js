const express = require('express')
const expHandlebars = require('express-handlebars')
const session = require('expres-session') // Criar sessão do usuário
const Filestore = require('session-file-store')(session)
const flash = require('express-flash')

const connection = require('./db/connection')

const app = express()

const port = 4004

connection
  .sync()
  .then(() => {
    app.listen(port, () => console.log(`Servidor inciado: porta(${port})`))
  })
  .catch(error => console.error(`Falha ao inciar o servidor: ${error}`))
