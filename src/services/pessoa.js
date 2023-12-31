const RepositoriePessoa = require("../repositories/pessoa.js");

const repositorio = new RepositoriePessoa()

class ServicoPessoa {
    
    VerficarPessoa(pessoa) {
        if(!pessoa){
            throw new Error('Não foi enviada a pessoa para adicionar');
        } else if(!pessoa.nome){
            throw new Error('Não foi enviado o nome da pessoa');
        } else if(!pessoa.email){
            throw new Error('Não foi enviado o email da pessoa');
        } else if(!pessoa.senha){
            throw new Error('Não foi enviado o senha da pessoa');
        }

        return true
    }

    async PegarUm(id, transaction) {
        return repositorio.PegarUm(id, transaction);
    }

    async PegarUmPorEmail(email) {
        return repositorio.PegarUmPorEmail(email);
    }

    async PegarTodos() {
        return repositorio.PegarTodos();
    }

    async Add(pessoa, transaction) {
        this.VerficarPessoa(pessoa)

        return repositorio.Add(pessoa, transaction);
    }

    async Update(id, pessoa) {
        if(!id) {
            throw new Error('Não foi enviada o identificador da pessoa para alterar');
        } 
        this.VerficarPessoa(pessoa)

        return repositorio.Update(id, pessoa);
    }

    async Delete(id) {
        return repositorio.Delete(id);
    }

} 

module.exports = ServicoPessoa