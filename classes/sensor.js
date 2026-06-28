export default class Sensor {
    static id = 0
    #id
    #ativo
    #regiao
    #leituras
    #tipo
    constructor({ tipo, ativo = false, regiao }) {
        this.#id = Sensor.id;
        Sensor.id += 1;
        this.#tipo = tipo;
        this.#ativo = ativo;
        this.#regiao = regiao;
        this.#leituras = {};
    }

    get id(){ 
        return this.#id;
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

    informações() {
        const listaDeLeituras = Object.values(this.#leituras)

        if (listaDeLeituras.length === 0) {
            return {log: `Sensor ${this.#id} - ${this.#tipo}: Nenhuma leitura registrada até o momento.`}
        }

        console.log(`Leituras do Sensor ${this.#id} (${this.#tipo})`)
        listaDeLeituras.map(leitura => {
            return {log: `Leitura ID: ${leitura.id} | Dados:`, leitura}
        })
        return {log: `Sensor ${this.#id} - ${this.#tipo}: ${listaDeLeituras.length} leituras registradas.`,
        leituras: listaDeLeituras}
    }
}