const express = require('express')
const axios = require('axios')
const app = express()
const db = require('./db')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

async function getLocation(cep){
    let urlViaCep = `https://viacep.com.br/ws/${cep}/json`
    const response = await axios.get(urlViaCep)
    return response.data
}

//GET para obter o endereço via CEP
app.get('/cep/:cep', async (req, res) => {
    try{
        let address = req.params
        const response = await getLocation(address.cep)
        res.status(200)
        res.json(response)
    }catch(erro){
        res.status(400)
        res.json(erro)
    }
})

//GET para todos os itens do menu
app.get('/', async (req, res) => {
    let result = await db.getMenu()
    res.status(200)
    res.json(result)
})

//GET para um item específico do menu
app.get('/:id', async (req, res) => {
    try{
        const id = req.params.id -1
        let result = await db.getMenu()
        res.status(200)
        res.json(result[id])
    }catch(erro){
        res.status(404)
        res.send('Item não encontrado')
    }
})

//POST para adicionar itens ao menu
app.post('/', (req, res) => {
    try{
        const data = {
            id: req.body.id,
            nome: req.body.nome,
            valor: req.body.valor
        }
        db.addToMenu(data)
        res.status(201)
        res.send('Item adicionado com sucesso')
    }catch(erro){
        res.status(400)
        res.send(erro)
    }
})

//PUT para modificar itens do menu
app.put('/:id', async (req, res) => {
    try{
        const id = req.params.id -1
        const data = {
            id: req.body.id,
            nome: req.body.nome,
            valor: req.body.valor
        }
        db.editMenu(id, data)
        res.status(200)
        res.send('Item alterado com sucesso')
    }catch(erro){
        res.status(404)
        res.send('Item não encontrado')
    }
})

//DELETE para remover itens do menu
app.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id -1
        db.deleteFromMenu(id)
        res.status(200)
        res.send('Item removido com sucesso')
    }catch(erro){
        res.status(404)
        res.send('Item não encontrado')
    }
})

let port = process.env.PORT
if (port == null || port == "") {
  port = 3000
}
app.listen(port, () => {
    console.log(`Ouvindo na porta ${port}`)
})
