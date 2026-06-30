class Usuario{
    #nome
    #ativo
    #senha
    #admin
    #id
    static #contadorid = 0
    constructor({nome, ativo = true, senha, admin = false}){
        Usuario.#contadorid += 1
        this.#id = Usuario.#contadorid
        this.#nome = nome
        this.#ativo = ativo
        this.#senha = senha
        this.#admin = admin
    }

    get id(){
        return this.#id
    }

    get nome(){
        return this.#nome
    }

    get ativo(){
        return this.#ativo
    }

    get admin(){
        return this.#admin
    }

    compararSenha(tentativa){
        return tentativa === this.#senha
    }

    desativar(){
        if (this.ativo){ 
            this.#ativo = false
            return {log : `O usuário ${this.nome} foi desativado`, data: new Date()}
        } else {
            return {log : `O usuário ${this.nome} já está desativado`, data: new Date()}
        }
    }

    ativar(){
        if (!this.ativo){
            this.#ativo = true
            return {log : `O usuário ${this.nome} foi ativado`, data: new Date()}
        } else {
            return {log : `O usuário ${this.nome} já está ativado`, data: new Date()}
        }
    }
    
}

export default Usuario