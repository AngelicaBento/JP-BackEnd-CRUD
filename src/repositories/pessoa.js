const Pessoa = require('../models/pessoa.js')
const bcrypt = require('bcrypt.js')


class RepositoriePessoa {

    async PegarUm(id) {
        return Pessoa.findOne({
            where: { id }
        });
    }

    async PegarUmPorEmail(email) {
        return Pessoa.findOne({
            where: { email }
        });
    }
    
    async PegarTodos() {
        return Pessoa.findAll();
    }

    async Add(pessoa) {
        const hashSenha = bcrypt.hash(pessoa.senha, 10) 
        const { senha, email } = pessoa
        const result = await Pessoa.create(
            { pessoa, senha: hashSenha },
            { transaction }
        )

        return result
    }

    async Update(id, pessoa) {
        const result = await Pessoa.update(pessoa, {
            where: {
                id
            }
        })

        console.log(result)

        return result
    }

    async Delete(id) {
        return Pessoa.destroy({
            where: { id }
        });
    }

}

module.exports = RepositoriePessoa