import Usuario from '../classes/usuario.js'

export default class UsuarioController {
    #usuarios
    constructor(usuarios) {
        this.#usuarios = {}
        this.adicionarUsuarios(usuarios)
    }

    adicionarUsuario({nome, senha, admin, ativo}) {
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
}
