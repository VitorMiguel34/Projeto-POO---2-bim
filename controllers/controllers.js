import Usuario from '../classes/usuario.js'
import Regiao from '../classes/região.js'
import Sensor from '../classes/sensor.js'
import Leitura from '../classes/leitura.js'
import Alerta from "../classes/alerta.js"


class Controller{
    #usuarios
    #regioes
    #sensores
    #leituras
    #alertas
    constructor(){
        this.#usuarios = []
        this.#regioes = []
        this.#sensores = []
        this.#leituras = []
        this.#alertas = []
    }

    apresentarMenu(){
        console.log("Seja bem vindo ao seu sistema de gerenciamento de alertas!")
    }
}

export default function main(){

    const controller = new Controller()
    controller.apresentarMenu()
}