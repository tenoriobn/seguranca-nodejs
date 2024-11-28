const UsuarioServices = require('../services/usuarioService');

const usuarioService = new UsuarioServices();

class UsuarioController {
  async cadastrar(req, res) {
    const { nome, email, senha } = req.body;

    try {
      const usuario = await usuarioService.cadastrar({ nome, email, senha});
      res.status(201).send(usuario);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = UsuarioController;