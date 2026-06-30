import Alerta from '../classes/alerta.js'
import Leitura from '../classes/leitura.js'

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

    buscarAlerta(id) {
        if (id in this.#alertas) {
            return {
                sucesso: true,
                registro: this.#alertas[id],
                log: `Alerta com ID ${id} recuperado com sucesso do sistema.`,
                timestamp: new Date()
            }
        }
        throw new Error(`Alerta com ID ${id} não foi encontrado no sistema.`)
    }
}