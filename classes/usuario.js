export default class Usuario{
    static id = 0

    constructor(nome, ativo, regiao){
        this.id = Usuario.id
        Usuario.id += 1
        this.nome = nome
        this.ativo = ativo
    }
}