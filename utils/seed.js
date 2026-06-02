import fs from 'fs'

import Regiao from '../classes/regiao.js'
import Sensor from '../classes/sensor.js'
import Leitura from '../classes/leitura.js'


function criarRegioes(){
    const informacoes = JSON.parse(fs.readFileSync("../dados/regioes.json"))
    const regioes = []
    for(let info of informacoes){
        infos = {"nome": info[0], "descricao": info[1]}
        const novaRegiao = new Regiao(infos)
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
        infos = {"tipo": info[0], "ativo": info[1], "regiao": info[2]}
        const novoSensor = new Sensor(infos)
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
        const infos = {"sensor": info[0], "valorRegistrado": info[1]}
        const novaLeitura = new Leitura(infos)
        leituras.push(novaLeitura)
    }

    return leituras
}