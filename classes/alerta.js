export default class Alerta{
    static #contadorid = 0
    #dataHora
    #leitura
    #mensagem
    #regiao
    #id
    constructor({mensagem, leitura, regiao}){
        this.#id = Alerta.#contadorid
        Alerta.#contadorid += 1
        this.#mensagem = mensagem
        this.#leitura = leitura
        this.#regiao = regiao
        this.#dataHora = new Date()
    }

    get id(){
        return this.#id
    }

    get data(){
        return this.#dataHora.toLocaleDateString("PT-BR")
    }

    get hora(){
        return this.#dataHora.toLocaleTimeString("PT-BR")
    }

    get mensagem(){
        return this.#mensagem
    }

    set mensagem(novaMensagem){
        if(typeof novaMensagem != "string"){
            throw new Error("Erro! mensagem espera uma string")
        }
        this.#mensagem = novaMensagem
    }

    informacoes(){
        console.log(`ID do alerta: ${this.id}`)
        console.log(`Região: ${this.#regiao.nome}`)
        console.log(`Mensagem: ${this.mensagem}\n`)
    }
}
