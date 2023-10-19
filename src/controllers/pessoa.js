const ServicoPessoa = require("../services/pessoa.js")
const bcrypt = require('bcrypt.js')
const jwt = require('jsonwebtoken')

const servico = new ServicoPessoa()

class ControllerPessoa {

    async Login(req, res){
        const { email, senha } = req.body //o mesmo que: -> const email = req.body.email e senha = req.body.senha

        const { dataValues: pessoa } = await servico.PegarUmPorEmail(email)

        if(!pessoa){
            console.log('erro1')
            res.status(401).json({ message: 'Email ou senha inválido' })
        }

        if(!(await bcrypt.compare(senha, pessoa.senha))){
            console.log('erro2')
            res.status(401).json({ message: 'Email ou senha inválido' })
        }

        const token = jwt.sign(
            {id: pessoa.id, email: pessoa.email, nome: pessoa.nome},
            config.secret
        )

        res.json({
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6Ikpvw6NvIGRhIFNpbHZhIiwiZW1haWwiOiJqb2FvQGV4YW1wbGUuY29tIiwiaWF0IjoxNjk1NTYyNzE3fQ.2mBpC7pViB3KoXtAbnUvGZAXKo8LMew5U8l74ElQVd4"
        })



    }

    async PegarUm(req, res){
        try {
            console.log(req.params.id)
            const result = await servico.PegarUm(req.params.id)
            res.status(200).json({
                pessoa: result
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    }
    
    async PegarTodos(_, res){
        try {
            const result = await servico.PegarTodos()
            res.status(200).json({
                pessoas: result
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    }

    async Add(req, res){
        try {
            const result = await servico.Add(req.body.pessoa)
            res.status(201).json({
                pessoa: result
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    }

    async Update(req, res){
        try {
            const result = await servico.Update(req.params.id, req.body.pessoa)
            res.status(200).json({
                pessoa: result
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    }

    async Delete(req, res){
        try {
            await servico.Delete(req.params.id)
            res.status(204)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    }

}

module.exports = ControllerPessoa