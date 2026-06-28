import UsuarioController from './usuarioController.js'
import LeituraController from './leituraController.js'
import AlertaController from './alertaController.js'
import SensorController from './sensorController.js'
import seed from '../utils/seed.js'
import prompt from 'prompt-sync'

class Controller{
    #usuarios
    #regioes
    #sensores
    #leituras
    #alertas
    constructor(usuarios, sensores, leituras, alertas){
    // recebe listas de obj ou apenas um
        this.#usuarios = new UsuarioController(usuarios)
        this.#sensores = new SensorController(sensores)
        this.#leituras = new LeituraController(leituras)
        this.#alertas = new AlertaController(alertas)
    }

    apresentarMenu(){
        console.log("Seja bem vindo ao seu sistema de gerenciamento de alertas!")
    }
}

export default function main(){
    const dados = seed()
    const controller = new Controller(dados.usuarios, dados.sensores, dados.leituras, dados.alertas)
    controller.apresentarMenu()
}