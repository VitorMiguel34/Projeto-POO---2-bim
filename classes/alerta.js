export default class Alerta{
    static id = 0
    #dataHora
    #leitura
    #mensagem
    #regiao

    constructor({mensagem, leitura, regiao}){
        this.id = Alerta.id
        Alerta.id += 1
        this.#mensagem = mensagem
        this.#leitura = leitura
        this.#regiao = regiao
        this.#dataHora = new Date()
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
        console.log(`Região: ${this.#regiao}`)
        console.log(`Mensagem: ${this.mensagem}\n`)
    }
}
