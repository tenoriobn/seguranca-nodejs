const RoleService = require('../services/roleService');

const roleService = new RoleService();

class RoleController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body;
    
    try {
      const role = roleService.cadastrar({ nome, descricao });

      res.status(201).send(role);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

module.exports = RoleController;