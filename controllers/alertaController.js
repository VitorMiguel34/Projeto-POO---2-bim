import Alerta from '../classes/alerta.js'
import Leitura from '../classes/leitura.js'

export default class AlertaController{
    #alertas
    #leituraController
    constructor(alertas, leituraController){ 
        this.#alertas = {}
        this.#leituraController = leituraController
        this.criarAlertas(alertas)
    }

    listarAlertas(){
        for(let alerta of Object.values(this.#alertas)){
            alerta.informacoes()
        }
    }

    criarAlerta({leituraId, regiao, mensagem}){ 
        const leitura = this.#leituraController.buscarLeitura(leituraId).registro
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
        if (id in this.#alertas) {
            return {
                sucesso: true,
                registro: this.#alertas[id],
                log: `Alerta com ID ${id} recuperada com sucesso do sistema.`,
                timestamp: new Date()
            }
        } 
        throw new Error(`Alerta com ID ${id} não foi encontrada no sistema.`)
    }
}