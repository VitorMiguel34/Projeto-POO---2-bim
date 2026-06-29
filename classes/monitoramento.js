export default class Monitoramento {
    static id = 0
    #sensores
    #alertas
    constructor({ sensores, alertas }) {
        this.id = Monitoramento.id
        Monitoramento.id += 1
        this.#sensores = sensores
        this.#alertas = alertas
    }

    get sensores() {
        return this.#sensores
    }

    get alertas() {
        return this.#alertas
    }

    informacoes() {
        console.log(`ID do Monitoramento: ${this.id}`)
        console.log(`Sensores vinculados: `, this.#sensores)
        console.log(`Alertas vinculados: `, this.#alertas)
    }
}