const bodyParser = require('body-parser')
 
const produto = require('./produtoRoute')
const usuario = require('./usuariosRoute')
const auth = require('./authRoute');

module.exports = app => {
  app.use(
    bodyParser.json(),
    produto,
    usuario,
    auth
  )
}
