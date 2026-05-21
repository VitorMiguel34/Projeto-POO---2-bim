import fs from 'fs'

import Regiao from '../classes/regiao.js'
import Sensor from '../classes/sensor.js'
import Leitura from '../classes/leitura.js'

/*ERRO CRÍTICO DESSE MÓDULO: caminho dos arquivos de dados
OBS: Ao executar em outro nível de diretório qualquer função desse arquivo
gerará um erro
*/


function criarRegioes(){
    const informacoes = JSON.parse(fs.readFileSync("../dados/regioes.json"))
    const regioes = []
    for(let info of informacoes){
        const novaRegiao = new Regiao(info[0], info[1])
        regioes.push(novaRegiao)
    }

    return regioes
}

function criarSensores(){
    const informacoes = JSON.parse(fs.readFileSync("../dados/sensores.json"))
    const regioes = criarRegioes()
    for(let i in informacoes){
        informacoes[i].splice(2,0,regioes[i])
    }

    const sensores = []
    for(let info of informacoes){
        const novoSensor = new Sensor(info[0], info[1], info[2])
        sensores.push(novoSensor)
    }

    return sensores
}

function criarLeituras(){
    const informacoes = JSON.parse(fs.readFileSync("../dados/leituras.json"))
    const sensores = criarSensores()
    for(let i in informacoes){
        informacoes[i].splice(0,0,sensores[i])
    }

    const leituras = []
    for(let info of informacoes){
        const novaLeitura = new Leitura(info[0], info[1])
        leituras.push(novaLeitura)
    }

    return leituras
}