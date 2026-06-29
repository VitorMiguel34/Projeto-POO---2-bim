import UsuarioController from './usuarioController.js'
import LeituraController from './leituraController.js'
import AlertaController from './alertaController.js'
import SensorController from './sensorController.js'
import seed from '../utils/seed.js'
import prompt from 'prompt-sync'

class Controller {
    #usuarios
    #sensores
    #leituras
    #alertas
    #usuarioLogado 
    constructor(usuarios, sensores, leituras, alertas) {
        this.#usuarios = new UsuarioController(usuarios)
        this.#sensores = new SensorController(sensores)
        this.#leituras = new LeituraController(leituras)
        this.#alertas = new AlertaController(alertas)
        this.#usuarioLogado = null
    }

    iniciar() {
        console.log("Seja bem-vindo ao seu sistema de gerenciamento de alertas!")
        
        let sistemaRodando = true;
        while (sistemaRodando) {
            if (!this.#usuarioLogado) {
                sistemaRodando = this.#menuVisitante()
            } else {
                sistemaRodando = this.#menuAutenticado()
            }
        }
        console.log("\nSistema encerrado.")
    }

    #menuVisitante() {
        console.log("\n--- MENU INICIAL ---")
        console.log("1. Fazer Login")
        console.log("0. Sair do Sistema")
        const opcao = prompt("Escolha uma opção: ")

        switch (opcao) {
            case "1":
                this.#login();
                break;
            case "0":
                return false; 
            default:
                console.log("\n❌ Opção inválida!");
        }
        return true;
    }

    #menuAutenticado() {
        console.log(`\n--- MENU PRINCIPAL [${this.#usuarioLogado.nome}] ---`);
        console.log("1. Listar Sensores");
        console.log("2. Listar Leituras");
        console.log("3. Listar Alertas");
        console.log("0. Fazer Logout");
        const opcao = prompt("Escolha uma opção: ")

        switch (opcao) {
            case "1":
                this.#sensores.listarSensores();
                break;
            case "2":
                this.#leituras.listarLeituras();
                break;
            case "3":
                this.#alertas.listarAlertas();
                break;
            case "0":
                this.#logout();
                break;
            default:
                console.log("\n Opção inválida!");
        }
        return true;
    }

    #login() {
        console.log("\n--- TELA DE LOGIN ---");
        const nome = prompt("Usuário: ");
        const senha = prompt("Senha: ");

        try {
            const respostaAutenticacao = this.#usuarios.autenticar(nome, senha)
            this.#usuarioLogado = respostaAutenticacao.usuario;
            console.log(`\n [${respostaAutenticacao.timestamp.toLocaleTimeString()}] [${respostaAutenticacao.usuario.nome}] ${respostaAutenticacao.log}`);
        } catch (error) {
            console.log(`\n Falha no Login: ${error.message}`);
        }
    }

    #logout() {
        const logLogout = {
            usuarioDesconectado: this.#usuarioLogado.nome,
            data: new Date(),
            mensagem: "Sessão encerrada pelo usuário."
        }
        this.#usuarioLogado = false
        console.log(`\n [${logLogout.data.toLocaleTimeString()}] ${logLogout.mensagem} (${logLogout.usuarioDesconectado})`);
    }
}

export default function main() {
    const dados = seed()
    const controller = new Controller(dados.usuarios, dados.sensores, dados.leituras, dados.alertas)
    controller.iniciar(); 
}