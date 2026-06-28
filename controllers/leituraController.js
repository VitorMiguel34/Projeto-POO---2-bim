import Leitura from '../classes/leitura.js'

export default class LeituraController{
    #leituras

    constructor(leituras){
        this.#leituras = {}
        this.criarLeituras(leituras)
    }

    listarLeituras(){
        for(let leitura of Object.values(this.#leituras)){
            leitura.informacoes()
        }
    }

    criarLeitura({mensagem, valorRegistrado}){
        if (!(typeof mensagem === 'string')) throw new Error("O parâmetro mensagem deve ser uma mensagem (str!)")
        if (!(typeof valorRegistrado === 'number') || valorRegistrado <= 0) throw new Error("O parâmetro valor registrado deve ser um número válido")
        const novaLeitura = new Leitura({mensagem: mensagem, valorRegistrado: valorRegistrado})
        this.#leituras[novaLeitura.id] = novaLeitura
    }

    criarLeituras(leituras){
        if (!(Array.isArray(leituras))) throw new Error("O parâmetro leituras deve ser uma lista")
        for(let leitura of leituras){
            this.criarLeitura(leitura)
        }
    }

    buscarLeitura(id){
        if(id < Leitura.id && id >= 0){
            return this.#leituras[id]
        }
    }

    
}