import Alerta from '../classes/alerta.js'

export default class AlertaController{
    #alertas

    constructor(alertas){
        this.#alertas = {}
        for(let alerta of alertas){
            this.#alertas[alerta.id] = alerta
        }
    }

    listarAlertas(){
        for(let alerta of Object.values(this.#alertas)){
            alerta.informacoes()
        }
    }

    criarAlerta(leitura, regiao, mensagem){
        const novoAlerta = new Alerta(leitura, regiao, mensagem)
        this.#alertas[novoAlerta.id] = novoAlerta
    }

    buscarAlerta(id){
        if(id < Alerta.id && id >= 0){
            return this.#alertas[id]
        }
    }
}