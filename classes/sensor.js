export default class Sensor {
    static #contadorid = 0
    #id
    #ativo
    #regiao
    #leituras
    #tipo
    constructor({ tipo, ativo = false, regiao }) {
        this.#id = Sensor.#contadorid
        Sensor.#contadorid += 1
        this.#tipo = tipo
        this.#ativo = ativo
        this.#regiao = regiao
        this.#leituras = {}
    }

    get id(){ 
        return this.#id
    }

    get tipo(){
     return this.#tipo 
    }
    get ativo(){ 
        return this.#ativo
    }

    get regiao(){return this.#regiao 

    }
    get leituras(){ 
        return { ...this.#leituras } 
    }


    registrarLeitura(novaLeitura) {
        this.#leituras[novaLeitura.id] = novaLeitura
    }

    informacoes() { 
        const listaDeLeituras = Object.values(this.#leituras)

        if (listaDeLeituras.length === 0) {
            console.log(`Sensor ${this.id} - ${this.tipo}: Nenhuma leitura registrada até o momento.`)
            return
        }

        console.log(`Leituras do Sensor ${this.id} (${this.tipo})`)
        listaDeLeituras.forEach(leitura => {
            console.log(` - Leitura ID: ${leitura.id} | Dados:`, leitura)
        })
        console.log(`Total: ${listaDeLeituras.length} leituras registradas.\n`)
    }
}