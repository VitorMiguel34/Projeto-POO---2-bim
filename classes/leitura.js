export default class Leitura{
    static id = 0
    #dataHora
    #mensagem
    constructor({valorRegistrado, mensagem}){
        this.id = Leitura.id
        Leitura.id += 1
        this.valorRegistrado = valorRegistrado
        this.#dataHora = new Date()
        this.#mensagem = mensagem
    }

    get data(){
        return this.#dataHora.toLocaleDateString("PT-BR")
    }

    get mensagem(){
        return this.#mensagem
    }

    get hora(){
        return this.#dataHora.toLocaleTimeString("PT-BR")
    }

    informacoes(){
        console.log(`Leitura ${this.id}`)
        console.log(`Valor registrado: ${this.valorRegistrado}`)
        console.log(`Data: ${this.data}. Hora: ${this.hora}`)
        console.log(`Mensagem: ${this.mensagem || "Nenhuma mensagem gravada"}`)
    }
}