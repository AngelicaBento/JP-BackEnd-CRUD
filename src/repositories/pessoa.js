const Pessoa = require('../models/pessoa.js')
const bcrypt = require('bcrypt')


class RepositoriePessoa {

    async PegarUm(id, transaction) {
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

    async Add(pessoa, transaction) {
        const hashSenha = await bcrypt.hash(pessoa.senha, 10)

        pessoa.senha = hashSenha
        const result = await Pessoa.create(
            pessoa,
            { transaction}
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