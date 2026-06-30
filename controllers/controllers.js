import UsuarioController from './usuarioController.js'
import LeituraController from './leituraController.js'
import AlertaController from './alertaController.js'
import SensorController from './sensorController.js'
import seed from '../utils/seed.js'
import promptSync from 'prompt-sync'
const prompt = promptSync()

import { lerString, lerSenhaInvisivel, lerConfirmacao } from '../utils/validacoes.js'

class Controller {
    #usuarios
    #sensores
    #leituras
    #alertas
    #usuarioLogado 
    #logs
    constructor(usuarios, sensores, leituras, alertas) {
        this.#usuarios = new UsuarioController(usuarios)
        this.#leituras = new LeituraController(leituras) 
        this.#sensores = new SensorController(sensores)
        this.#alertas = new AlertaController(alertas, this.#leituras) 
        this.#usuarioLogado = null
        this.#logs = []
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
        console.log("2. Criar Conta")
        console.log("0. Sair do Sistema")
        const opcao = prompt("Escolha uma opção: ")

        switch (opcao) {
            case "1":
                this.#login()
                break
            case "2":
                this.#criarConta()
                break
            case "0":
                return false
            default:
                console.log("\n Opção inválida!")
        }
        return true
    }

    #menuAutenticado() {
        console.log(`\n--- MENU PRINCIPAL [${this.#usuarioLogado.nome}] ---`);
        console.log("1. Listar Sensores")
        console.log("2. Listar Leituras")
        console.log("3. Listar Alertas")
        console.log("4. Desativar Minha Conta")
        if (this.#usuarioLogado.admin) {
            console.log("5. Gerenciar Contas (Admin)")
        }
        console.log("0. Fazer Logout")
        const opcao = prompt("Escolha uma opção: ")

        switch (opcao) {
            case "1":
                this.#sensores.listarSensores()
                break
            case "2":
                this.#leituras.listarLeituras()
                break
            case "3":
                this.#alertas.listarAlertas()
                break
            case "4":
                this.#desativarMinhaConta()
                break
            case "5":
                if (this.#usuarioLogado.admin) {
                    this.#gerenciarContasAdmin()
                } else {
                    console.log("\n Opção inválida!")
                }
                break
            case "0":
                this.#logout()
                break
            default:
                console.log("\n Opção inválida!")
        }
        return true;
    }

    #login() {
        console.log("\n--- TELA DE LOGIN ---")
        const nome = lerString("Usuário: ")
        const senha = lerSenhaInvisivel("Senha: ")
        try {
            const respostaAutenticacao = this.#usuarios.autenticar(nome, senha)
            this.#usuarioLogado = respostaAutenticacao.usuario
            if (!this.#usuarioLogado.ativo) {
                console.log("\n ATENÇÃO: Sua conta está DESATIVADA.")
                const reativar = lerConfirmacao("Deseja reativar sua conta agora para acessar o sistema? (s/n): ")
                if (reativar) {
                    console.log(`\n ${this.#usuarioLogado.ativar().log}`)
                } else {
                    console.log("Conta mantida desativada. Fazendo logout...")
                    this.#usuarioLogado = null 
                    return
                }
            }
            console.log(`\n[${respostaAutenticacao.timestamp.toLocaleTimeString()}] [${this.#usuarioLogado.nome}] Logado com sucesso.`)
        } catch (error) {
            console.log(`\n Falha no Login: ${error.message}`)
        }
    }

    #logout() {
        const logLogout = {
            usuarioDesconectado: this.#usuarioLogado.nome,
            data: new Date(),
            mensagem: "Sessão encerrada pelo usuário."
        }
        this.#usuarioLogado = null
        console.log(`\n [${logLogout.data.toLocaleTimeString()}] ${logLogout.mensagem} (${logLogout.usuarioDesconectado})`);
    }

    #criarConta() {
        console.log("\n--- CRIAR NOVA CONTA ---")
        const nome = lerString("Digite o nome de usuário desejado: ")
        const senha = lerSenhaInvisivel("Digite sua senha: ")

        try {
            this.#usuarios.adicionarUsuario({nome: nome, senha: senha, admin: false, ativo: true})
            console.log(`\n Conta criada com sucesso! Você já pode fazer login, ${nome}.`)
        } catch (error) {
            console.log(`\n Falha ao criar conta: ${error.message}`)
        }
    }

    #desativarMinhaConta() {
        console.log("\n--- DESATIVAR CONTA ---")
        const confirmar = lerConfirmacao("Tem certeza que deseja DESATIVAR sua conta? Você será deslogado imediatamente. (s/n): ")
        if (confirmar) {
            console.log(`\n${this.#usuarioLogado.desativar().log}`)
            this.#usuarioLogado = null
        } else {
            console.log("Operação cancelada.")
        }
    }

    #gerenciarContasAdmin() {
        console.log("\n--- GERENCIAMENTO DE CONTAS (ADMIN) ---")
        this.#usuarios.listarUsuarios()
        
        const id = lerString("\nDigite o ID do usuário que deseja alterar (ou '0' para cancelar): ")
        if (id === '0') return

        try {
            const usuarioAlvo = this.#usuarios.buscarUsuarioPorId(id)
            console.log(`\nUsuário selecionado: ${usuarioAlvo.nome} (Status atual: ${usuarioAlvo.ativo ? 'Ativo' : 'Desativado'})`)
            if (usuarioAlvo.id === this.#usuarioLogado.id) {
                console.log("Use a opção 'Desativar Minha Conta' no seu menu para desativar a si mesmo.")
                return
            }
            const acao = lerConfirmacao(`Deseja alterar o status de ${usuarioAlvo.nome}? (s/n): `)
            if (acao) {
                if (usuarioAlvo.ativo) {
                    console.log(`${usuarioAlvo.desativar().log}`)
                } else {
                    console.log(`${usuarioAlvo.ativar().log}`)
                }
            }
        } catch (error) {
            console.log(`\n Erro: ${error.message}`)
        }
    }
}

export default function main() {
    const dados = seed()
    const controller = new Controller(dados.usuarios, dados.sensores, dados.leituras, dados.alertas)
    controller.iniciar(); 
}