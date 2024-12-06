const { Router } = require('express')
const PermissaoController = require('../controllers/permissaoController')

const router = Router()

router
  .post('/permissao', PermissaoController.cadastrar)
  .get('/permissao', PermissaoController.buscarTodasPermissoes)
  .get('/permissao/:id', PermissaoController.buscarPermissaoPorId)
  .put('/permissao/:id', PermissaoController.editarPermissao)
  .delete('/permissao/:id', PermissaoController.deletarPermissao)

module.exports = router