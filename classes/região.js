export default class Regiao{
    static id = 0

    constructor(id, nome, descricao){
        this.id = Regiao.id
        Regiao.id += 1
        this.nome = nome
        this.descricao = descricao
    }
}