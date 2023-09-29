const express = require('express')
const expHandlebars = require('express-handlebars')
const session = require('express-session') // Criar sessão do usuário
const Filestore = require('session-file-store')(session)
const flash = require('express-flash')

const connection = require('./db/connection')
const { request } = require('http')
const { response } = require('express')
const { nextTick } = require('process')

const hbsPartials = expHandlebars.create({ partialsDir: ['views/partials'] })
const app = express()

const port = 4004

// Aplicando a engine
app.engine('handlebars', hbsPartials.engine)
app.set('view engine', 'handlebars')

// Importando JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Import middleware para controle de sessões
app.use(session({
  name: 'session',
  secret: 'secreto (temporario)',
  resave: false,
  saveUninitialized: false,
  store: new Filestore({
    logFn: function () { },
    path: require('path').join(require('os').tmpdir(), 'sessions')
  }),
  cookie: {
    secure: false,
    maxAge: 360000,
    expires: new Date(Date.now() + 360000),
    httpOnly: true
  }
}))

// Importar as flash messages
app.use(flash())

// Importando static files
app.use(express.static('public'))

// Middleware para armazenar sessões na resposta
app.use((request, response, nextT)=>{
  if(request.session.userid){
    response.locals.session = request.session
  }
})



connection
  .sync()
  .then(() => {
    app.listen(port, () => console.log(`Servidor inciado: porta(${port})`))
  })
  .catch(error => console.error(`Falha ao inciar o servidor: ${error}`))
