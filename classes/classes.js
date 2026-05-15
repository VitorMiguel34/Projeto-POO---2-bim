export class Usuario{
    static id = 0

    constructor(nome, ativo, regiao){
        this.id = Usuario.id
        Usuario.id += 1
        this.nome = nome
        this.ativo = ativo
    }
}

export class Regiao{
    static id = 0

    constructor(id, nome, descricao){
        this.id = Regiao.id
        Regiao.id += 1
        this.nome = nome
        this.descricao = descricao
    }
}

export class Sensor{
    static id = 0

    constructor(tipo, ativo, regiao){
        this.id = Sensor.id
        Sensor.id += 1
        this.tipo = tipo
        this.ativo = ativo
        this.regiao = regiao
    }
}

export class Leitura{
    static id = 0

    constructor(sensor, valorRegistrado){
        this.id = Leitura.id
        Leitura.id += 1
        this.sensor = sensor
        this.valorRegistrado = valorRegistrado
        this.dataHora = new Date()
    }
}

export class Alerta{
    static id = 0

    constructor(leitura, mensagem){
        this.id = Alerta.id
        Alerta.id += 1
        this.leitura = leitura
        this.mensagem = mensagem
        this.dataHora = new Date()
    }
}

export class Monitoramento{
    static id = 0

    constructor(sensores, alertas){
        this.id = Monitoramento.id
        Monitoramento.id += 1
        this.sensores = sensores 
        this.alertas = alertas
    }
}
