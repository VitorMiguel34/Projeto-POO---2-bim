import Alerta from '../classes/alerta.js'

export default class AlertaController{
    #alertas

    constructor(alertas){
        this.#alertas = {}
        this.criarAlertas(alertas)
    }

    listarAlertas(){
        for(let alerta of Object.values(this.#alertas)){
            alerta.informacoes()
        }
    }

    criarAlerta({leitura, regiao, mensagem}){
        if (!(leitura instanceof Leitura)) throw new Error("O parâmetro leitura deve ser uma instância da classe Leitura")
        const novoAlerta = new Alerta({leitura: leitura, regiao: regiao, mensagem: mensagem})
        this.#alertas[novoAlerta.id] = novoAlerta
    }
    
    criarAlertas(alertas){
        if (!(Array.isArray(alertas))) throw new Error("O parâmetro deve ser uma lista!")
        for(let alerta of alertas){
            this.criarAlerta(alerta)
        }
    }

    buscarAlerta(id){
        if(id < Alerta.id && id >= 0) throw new Error("O Id deve ser maior que zero e válido")
        return this.#alertas[id]
    }
}