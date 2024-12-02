const database = require('../models');

class AuthService {
  async login(dto) {
    const usuario = await database.usuarios.findOne({
      attributes: ['id', 'email', 'senha'],
      where: {
        email: dto.email
      }
    });

    if (!usuario) {
      throw new Error('Usuário não cadastrado!')
    }
  }
}

module.exports = AuthService;