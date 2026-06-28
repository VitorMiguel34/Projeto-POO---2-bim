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
        const novoSensor = new Sensor({"tipo" : tipo, "ativo" : ativo, "regiao" : regiao})
        this.#sensores[novoSensor.id] = novoSensor
    }

    criarSensores(sensores){
        if (!(Array.isArray(sensores))) throw new Error('O parâmetro deve ser uma lista')
        for(let sensor of sensores){
            this.criarSensor(sensor)
        }

    }

    buscarSensor(id){
        if(id < Sensor.id && id >= 0){
            return this.#sensores[id]
        }
    }

}