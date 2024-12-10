const database = require('../models');
const Sequelize = require('sequelize')

class SegurancaService {
  async cadastrarAcl(dto) {
    const usuario = await database.usuarios.findOne({
      include: [
        {
          model: database.roles,
          as: 'usuario_roles',
          attributes: ['id', 'nome', 'descricao']
        },
        {
          model: database.permissoes,
          as: 'usuario_permissoes',
          attributes: ['id', 'nome', 'descricao']
        }
      ],
      where: {
        id: dto.usuarioId
      }
    });

    if (!usuario) {
      throw new Error("Usuário não cadastrado!");
    };

    const rolesCadastradas = await database.roles.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.roles
        }
      }
    });

    const permissoesCadastradas = await database.permissoes.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissoes
        }
      }
    });

    await usuario.removeUsuario_roles(usuario.usuario_roles);
    await usuario.removeUsuario_permissoes(usuario.usuario_permissoes);

    await usuario.addUsuario_roles(rolesCadastradas);
    await usuario.addUsuario_permissoes(permissoesCadastradas);

    const novoUsuario = await database.usuarios.findOne({
      include: [
        {
          model: database.roles,
          as: 'usuario_roles',
          attributes: ['id', 'nome', 'descricao']
        },
        {
          model: database.permissoes,
          as: 'usuario_permissoes',
          attributes: ['id', 'nome', 'descricao']
        }
      ],
      where: {
        id: dto.usuarioId
      }
    });

    return novoUsuario;
  }
}

module.exports = SegurancaService;