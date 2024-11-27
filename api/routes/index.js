const bodyParser = require('body-parser')
 
const produto = require('./produtoRoute')

module.exports = app => {
  app.use(
    bodyParser.json(),
    produto
  )
}
