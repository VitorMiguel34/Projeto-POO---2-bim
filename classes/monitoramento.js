export default class Monitoramento{
    static id = 0

    constructor(sensores, alertas){
        this.id = Monitoramento.id
        Monitoramento.id += 1
        this.sensores = sensores 
        this.alertas = alertas
    }
}
