export default class Regiao {
    static id = 0
    #nome
    #descricao
    constructor({ nome, descricao }) {
        this.id = Regiao.id
        Regiao.id += 1
        this.#nome = nome
        this.#descricao = descricao
    }

    get nome() {
        return this.#nome
    }

    get descricao() {
        return this.#descricao
    }

    informacoes() {
        console.log(`ID da Região: ${this.id}`)
        console.log(`Nome: ${this.nome}`)
        console.log(`Descrição: ${this.descricao}\n`)
    }
}