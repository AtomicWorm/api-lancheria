const express = require('express')
const axios = require('axios')
const app = express()
const DB = [
    {id: 1, nome: 'pizza de bacon', valor: 13.00},
    {id: 2, nome: 'pizza de calabresa', valor: 14.00},
    {id: 3, nome: 'pizza de frango', valor: 12.00},
    {id: 4, nome: 'hamburger', valor: 20.00},
    {id: 5, nome: 'cheeseburger', valor: 25.00},
]

app.use(express.json())

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
app.get('/', (req, res) => {
    res.status(200)
    res.json(DB)
})

//GET para um item específico do menu
app.get('/:id', (req, res) => {
    try{
        const id = req.params.id -1
        res.status(200)
        res.json(DB[id])
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
        DB.push(data)
        res.status(201)
        res.send('Item adicionado com sucesso')
    }catch(erro){
        res.status(400)
        res.send(erro)
    }
})

//PUT para modificar itens do menu
app.put('/:id', (req, res) => {
    try{
        const id = req.params.id -1
        const data = {
            id: req.body.id,
            nome: req.body.nome,
            valor: req.body.valor
        }
        DB[id] = data
        res.status(200)
        res.send('Item alterado com sucesso')
    }catch(erro){
        res.status(404)
        res.send('Item não encontrado')
    }
})

//DELETE para remover itens do menu
app.delete('/:id', (req, res) => {
    try{
        const id = req.params.id -1
        DB.splice(id, 1)
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
