import Usuario from '../classes/usuario.js';

export default class UsuarioController {
    #usuarios

    constructor() {
        this.#usuarios = {};
    }

    adicionarUsuario(nome, login, senha, isAdmin = false) {
        const novoUsuario = new Usuario(nome, login, senha, isAdmin);
        this.#usuarios[novoUsuario.id] = novoUsuario;
        
        return novoUsuario;
    }
}