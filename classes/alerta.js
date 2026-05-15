export default class Alerta{
    static id = 0

    constructor(leitura, mensagem){
        this.id = Alerta.id
        Alerta.id += 1
        this.leitura = leitura
        this.mensagem = mensagem
        this.dataHora = new Date()
    }
}
