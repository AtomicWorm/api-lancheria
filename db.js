const fs = require('fs')

module.exports = {
    async getMenu(){
        let result = await fs.readFileSync('./db.json', {encoding: 'utf-8'})
        return JSON.parse(result)
    },
    async addToMenu(item){
        let result = await this.getMenu()
        result.push(item)
        await fs.writeFileSync('./db.json', JSON.stringify(result))
    },
    async editMenu(id, item){
        let result = await this.getMenu()
        result[id] = item
        await fs.writeFileSync('./db.json', JSON.stringify(result))
    },
    async deleteFromMenu(id){
        let result = await this.getMenu()
        result.splice(id, 1)
        await fs.writeFileSync('./db.json', JSON.stringify(result))
    }
}