const database = require('../models');
const uuid = require('uuid');

class RoleService {
  async cadastrar(dto) {
    const role = await database.roles.findOne({
      where: {
        nome: dto.nome
      }
    });

    if (role) {
      throw new Error('Role já cadastrada');
    }

    try {
      const newRole = await database.roles.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao
      });

      return newRole;
    } catch (error) {
      throw new Error('Erro ao cadastrar role!');
    }
  }

  async buscarTodosRoles() {
    const roles = await database.roles.findAll({
      include: [
        {
          model: database.permissoes,
          as: 'role_das_permissoes',
          attributes: ['id', 'nome', 'descricao'],
          through: {
            attributes: [],
          }
        }
      ]
    });
    return roles;
  }   

  async buscarRolePorId(id) {
    const role = await database.roles.findOne({
      include: [
        {
          model: database.permissoes,
          as: 'role_das_permissoes',
          attributes: ['id', 'nome', 'descricao'],
          through: {
            attributes: [],
          }
        }
      ],
      where: {
        id: id
      }
    });

    if (!role) {
      throw new Error('Role informado não cadastrado!');
    }

    return role;
  }

  async editarRole(dto) {
    const role = await this.buscarRolePorId(dto.id);

    try {
        role.nome = dto.nome;
        role.descricao = dto.descricao;
        await role.save();

        return role;
    } catch (error) {
        throw new Error('Erro ao editar Role!');
    }
  }

  async deletarRole(id) {
    await this.buscarRolePorId(id);

    try {
      await database.roles.destroy({
        where: {
          id: id
        }
      });
    } catch (error) {
        throw new Error('Erro ao tentar deletar o Role!');
    }
  }
}

module.exports = RoleService;