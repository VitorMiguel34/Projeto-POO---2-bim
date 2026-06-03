import Leitura from '../classes/leitura.js'

export default class LeituraController{
    #leituras

    constructor(leituras){
        this.#leituras = {}
        for(let leitura of leituras){
            this.#leituras[leitura.id] = leitura
        }
    }

    listarLeituras(){
        for(let leitura of Object.values(this.#leituras)){
            leitura.informacoes()
        }
    }

    adicionarLeitura({sensor, valorRegistrado}){
        const novaLeitura = new Leitura(sensor, valorRegistrado)
        this.#leituras[novaLeitura.id] = novaLeitura
    }

    buscarLeitura(id){
        if(id < Leitura.id && id >= 0){
            return this.#leituras[id]
        }
    }
}