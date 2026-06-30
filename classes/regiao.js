export default class Regiao {
    static #contadorid = 0
    #nome
    #descricao
    #id
    constructor({ nome, descricao }) {
        this.#id = Regiao.#contadorid
        Regiao.#contadorid += 1
        this.#nome = nome
        this.#descricao = descricao
    }
    get id(){
        return this.#id
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