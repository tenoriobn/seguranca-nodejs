const database = require('../models');
const uuid = require('uuid');

class RoleService {
  async cadastrar(dto) {
    const role = database.roles.findOne({
      where: {
        nome: dto.nome
      }
    });

    if (role) {
      throw new Error('Role já cadastrada');
    }

    try {
      const newRole = database.roles.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao
      })

      return newRole;
    } catch (error) {
      throw new Error('Erro ao cadastrar role!');
    }
  }
}

module.exports = RoleService;