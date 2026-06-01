export default class Usuario {
    static id = 0

    constructor(nome, login, senha, isAdmin = false, ativo = true) {
        this.id = Usuario.id
        Usuario.id += 1
        
        this.nome = nome
        this.login = login
        this.senha = senha
        this.isAdmin = isAdmin
        this.ativo = ativo
    }
}