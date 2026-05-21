export default class Alerta{
    static id = 0
    #dataHora
    #leitura
    #mensagem
    #regiao

    constructor(leitura, regiao, mensagem){
        this.id = Alerta.id
        Alerta.id += 1
        this.#leitura = leitura
        this.#regiao = regiao
        this.#mensagem = mensagem
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
            throw new Error("Erro! O campo 'mensagem' espera uma string")
        }
        this.#mensagem = novaMensagem
    }

    informacoes(){
        console.log(`ID do alerta: ${this.id}`)
        console.log(`Região: ${this.#regiao}`)
        console.log(`Mensagem: ${this.mensagem}\n`)
    }
}
