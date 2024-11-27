const { Router } = require('express');

const router = Router();

router
  .post('/usuarios')
  .get('/usuarios')
  .get('/usuarios/id/:id')
  .put('/usuarios/id/:id')
  .delete('/usuarios/id/:id')

module.exports = router;