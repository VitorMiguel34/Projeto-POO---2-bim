export default class Leitura{
    static id = 0
    #dataHora

    constructor(sensor, valorRegistrado){
        this.id = Leitura.id
        Leitura.id += 1
        this.sensor = sensor
        this.valorRegistrado = valorRegistrado
        this.#dataHora = new Date()
    }

    get data(){
        return this.#dataHora.toLocaleDateString("PT-BR")
    }

    get hora(){
        return this.#dataHora.toLocaleTimeString("PT-BR")
    }

    informacoes(){
        console.log(`Leitura ${this.id}`)
        console.log(`Sensor: ${this.sensor.id}`)
        console.log(`Valor registrado: ${this.valorRegistrado}`)
        console.log(`Data: ${this.data}. Hora: ${this.hora}`)
    }
}