export default class Sensor{
    static id = 0

    constructor({tipo, ativo, regiao}){
        this.id = Sensor.id
        Sensor.id += 1
        this.tipo = tipo
        this.ativo = ativo
        this.regiao = regiao
    }
}