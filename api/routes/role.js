const { Router } = require('express');
const RoleController = require('../controllers/roleController');

const router = Router();

router
  .post('/roles', RoleController.cadastrar)
  .get('/role')
  .get('/role/:id')
  .delete('/role/:id')
  .put('/role/:id')

module.exports = router;