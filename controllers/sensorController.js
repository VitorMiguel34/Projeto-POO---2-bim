import Sensor from "../classes/sensor.js"

export default class SensorController{
    #sensores

    constructor(sensores){
        this.#sensores = {}
        for(let sensor of sensores){
            this.#sensores[sensor.id] = sensor
        }
    }

    listarSensores(){
        for(let sensor of Object.values(this.#sensores)){
            sensor.informacoes()
        }
    }

    criarSensor({tipo, ativo, regiao}){
        const novoSensor = new Sensor(tipo,ativo,regiao)
        this.#sensores[novoSensor.id] = novoSensor
    }

    buscarSensor(id){
        if(id < Sensor.id && id >= 0){
            return this.#sensores[id]
        }
    }
}