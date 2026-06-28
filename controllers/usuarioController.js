import Usuario from '../classes/usuario.js'

export default class UsuarioController {
    #usuarios
    constructor(usuarios) {
        this.#usuarios = {}
        adicionarUsuarios(usuarios)
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
}