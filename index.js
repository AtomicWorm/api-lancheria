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

function filterByCpf(arr, cpf){
    return arr.filter((result) => result.cpf == cpf)
}

function makeAddressObject(response){
    let address = new Object()
    address['estado'] = response.uf
    address['cidade'] = response.localidade
    address['bairro'] = response.bairro
    address['rua'] = response.logradouro
    return address
}

//GET para obter o endereço via CEP
app.get('/cep/:cep', async (req, res) => {
    try{
        let address = req.params
        const response = await getLocation(address.cep)
        address = makeAddressObject(response)
        res.status(200)
        res.json(address)
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

//GET para o histórico completo de pedidos
app.get('/pedidos/todos', async (req, res) => {
    let result = await db.getHistory()
    res.status(200)
    res.json(result)
})

//GET para pedidos especificados por CPF
app.get('/pedidos/:cpf', async (req, res) => {
    try{
        const cpf = req.params.cpf
        let result = await db.getHistory()
        result = filterByCpf(result, cpf)
        res.status(200)
        res.json(result)
    }catch(erro){
        res.status(404)
        res.send('Não há pedidos a serem exibidos')
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

//POST para adicionar pedidos ao histórico
app.post('/pedidos', (req, res) => {
    try{
        const data = req.body
        db.addToHistory(data)
        res.status(201)
        res.end
    }catch(erro){
        res.status(400)
        res.end
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
