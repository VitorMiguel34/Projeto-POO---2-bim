import Usuario from '../classes/usuario.js'
import Regiao from '../classes/regiao.js'
import Sensor from '../classes/sensor.js'
import Leitura from '../classes/leitura.js'
import Alerta from "../classes/alerta.js"
import UsuarioController from './usuarioController.js'
import RegiaoController from '../classes/regiao.js'
import LeituraController from './leituraController.js'
import AlertaController from './alertaController.js'
import SensorController from './sensorController.js'


class Controller{
    #usuarios
    #regioes
    #sensores
    #leituras
    #alertas
    constructor(){
        this.#usuarios = new UsuarioController()
        this.#regioes = new RegiaoController()
        this.#sensores = new SensorController()
        this.#leituras = new LeituraController()
        this.#alertas = new AlertaController()
    }

    apresentarMenu(){
        console.log("Seja bem vindo ao seu sistema de gerenciamento de alertas!")
    }
}

export default function main(){

    const controller = new Controller()
    controller.apresentarMenu()
}