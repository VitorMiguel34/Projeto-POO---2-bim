import Usuario from '../classes/usuario.js'
import { formatarString } from '../utils/validacoes.js'

export default class UsuarioController {
    #usuarios
    constructor(usuarios) {
        this.#usuarios = {}
        this.adicionarUsuarios(usuarios)
    }

    adicionarUsuario({nome, senha, admin, ativo}) {
        if ((this.existeUsuario(nome))) { throw new Error(`O usuário ${nome} já existe no sistema.`) }
        const novoUsuario = new Usuario({nome : nome, senha : senha, admin: admin, ativo: ativo})
        this.#usuarios[novoUsuario.id] = novoUsuario
    }

    adicionarUsuarios(usuarios){
        if (!(Array.isArray(usuarios))) throw new Error("O parâmetro deve ser uma lista")
        for(let usuario of usuarios){
            this.adicionarUsuario(usuario)
        }
    }

    autenticar(nome, senha) {
        const usuarioEncontrado = Object.values(this.#usuarios).find(u => u.nome === nome);
        if (!usuarioEncontrado) {
            throw new Error("Usuário não encontrado no sistema.");
        }
        if (!usuarioEncontrado.ativo) {
            throw new Error("Este usuário está desativado.");
        }
        if (!usuarioEncontrado.compararSenha(senha)) {
            throw new Error("Senha incorreta.");
        }

        return {usuario: usuarioEncontrado, log: "Autenticado com sucesso!", timestamp: new Date()}
    }

    existeUsuario(nome) {
        const listaUsuarios = Object.values(this.#usuarios)
        return listaUsuarios.find(usuario => formatarString(usuario.nome) === formatarString(nome))
    }

    listarUsuarios() {
        console.log("\n--- Lista de Usuários do Sistema ---")
        for (let usuario of Object.values(this.#usuarios)) {
            const status = usuario.ativo ? "Ativo" : "Desativado"
            const tipo = usuario.admin ? "[ADMIN]" : "[COMUM]"
            console.log(`ID: ${usuario.id} | ${tipo} ${usuario.nome} - Status: ${status}`)
        }
    }

    buscarUsuarioPorId(id) {
        if (id in this.#usuarios) {
            return this.#usuarios[id]
        }
        throw new Error(`Usuário com ID ${id} não foi encontrado.`)
    }

}
