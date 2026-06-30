import Leitura from '../classes/leitura.js'

export default class LeituraController {
    #leituras
    constructor(leituras) {
        this.#leituras = {}
        this.criarLeituras(leituras)
    }

    listarLeituras() {
        for (let leitura of Object.values(this.#leituras)) {
            leitura.informacoes()
        }
    }


    criarLeitura({ mensagem, valorRegistrado }) {
        if (typeof valorRegistrado !== 'number' || valorRegistrado <= 0) {
            throw new Error("O parâmetro valor registrado deve ser um número maior que zero.")
        }
        const novaLeitura = new Leitura({ mensagem: mensagem, valorRegistrado: valorRegistrado })
        this.#leituras[novaLeitura.id] = novaLeitura
        return {
            sucesso: true,
            registro: novaLeitura,
            log: `Nova leitura registrada com sucesso: "${mensagem}" [Valor: ${valorRegistrado}]`,
            timestamp: new Date()
        }
    }

    criarLeituras(leituras){
        if(!Array.isArray(leituras)) { throw new Error("O parâmetro deve ser uma lista!")}
        for(let leitura of leituras){
            this.criarLeitura(leitura)
        }
    }

    buscarLeitura(id) {
        if (id in this.#leituras) {
            return {
                sucesso: true,
                registro: this.#leituras[id],
                log: `Leitura com ID ${id} recuperada com sucesso do sistema.`,
                timestamp: new Date()
            }
        } 
        throw new Error(`Leitura com ID ${id} não foi encontrada no sistema.`)
    }
}