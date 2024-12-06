const database = require('../models');
const uuid = require('uuid');

class PermissaoService {
  async cadastrar(dto) {
    const permissao = await database.permissoes.findOne({
      where: {
        nome: dto.nome
      }
    });

    if (permissao) {
      throw new Error('Permissão já cadastrada');
    }

    try {
      const newPermissao = await database.permissoes.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao
      });

      return newPermissao;
    } catch (error) {
      throw new Error('Erro ao cadastrar Permissão!');
    }
  }

  async buscarTodasPermissoes() {
    const permissoes = await database.permissoes.findAll();
    return permissoes;
  }   

  async buscarPermissaoPorId(id) {
    const permissao = await database.permissoes.findOne({
      where: {
        id: id
      }
    });

    if (!permissao) {
      throw new Error('Permissão informada não cadastrada!');
    }

    return permissao;
  }

  async editarPermissao(dto) {
    const permissao = await this.buscarPermissaoPorId(dto.id);

    try {
        permissao.nome = dto.nome;
        permissao.descricao = dto.descricao;
        await permissao.save();

        return permissao;
    } catch (error) {
        throw new Error('Erro ao editar Permissão!');
    }
  }

  async deletarPermissao(id) {
    await this.buscarPermissaoPorId(id);

    try {
      await database.permissoes.destroy({
        where: {
          id: id
        }
      });
    } catch (error) {
        throw new Error('Erro ao tentar deletar a Permissão!');
    }
  }
}

module.exports = PermissaoService;