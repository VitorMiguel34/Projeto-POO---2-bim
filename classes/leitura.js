export default class Leitura{
    static id = 0

    constructor(sensor, valorRegistrado){
        this.id = Leitura.id
        Leitura.id += 1
        this.sensor = sensor
        this.valorRegistrado = valorRegistrado
        this.dataHora = new Date()
    }
}