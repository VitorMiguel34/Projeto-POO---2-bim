import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import Regiao from '../classes/regiao.js'
import Sensor from '../classes/sensor.js'
import Leitura from '../classes/leitura.js'
import Alerta from '../classes/alerta.js'
import Monitoramento from '../classes/monitoramento.js'
import Usuario from '../classes/usuario.js'
import { info } from 'console'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dadosDir = path.join(__dirname, '../seeds')

function criarRegioes(){
    const informacoes = JSON.parse(fs.readFileSync(path.join(dadosDir, 'regioes.json')))
    const regioes = informacoes.map((i) => {
        return new Regiao({"nome": i[0], "descricao": i[1]})
    })
    return regioes
}

function criarSensores(regioes){
    const informacoes = JSON.parse(fs.readFileSync(path.join(dadosDir, 'sensores.json')))
    for(let i in informacoes){
        informacoes[i].splice(2,0,regioes[i])
    }
    const sensores = informacoes.map((i) => {
        return new Sensor({"tipo": i[0], "ativo": i[1], "regiao": i[2]})
    })

    return sensores
}

function criarLeituras(){
    const informacoes = JSON.parse(fs.readFileSync(path.join(dadosDir, 'leituras.json')))

    const leituras = informacoes.map((i) => {
        return new Leitura({"valorRegistrado": i[0]})
    })

    return leituras
}

function criarAlertas(leituras, regioes){
    const informacoes = JSON.parse(fs.readFileSync(path.join(dadosDir, 'alertas.json')))
    for(let i in informacoes){
        informacoes[i].splice(2,0,leituras[i],regioes[i])
    }
    const alertas = informacoes.map((i) => {
        return new Alerta({"mensagem": i[0], "leitura": i[1], "regiao": i[2]})
    })
    return alertas
}

function criarUsuarios(){
    const usuarios = JSON.parse(fs.readFileSync(path.join(dadosDir, 'usuarios.json')))
    
    usuarios.map( i => {
        return new Usuario({nome: i[0], senha: i[1], admin: i[2], ativo: i[3]})
    })
    return usuarios
}
function criarMonitoramento(sensores, alertas){
    return new Monitoramento({sensores, alertas})
}

function seed(){
    const usuarios = criarUsuarios()
    const regioes = criarRegioes()
    const leituras = criarLeituras()
    const sensores = criarSensores(regioes)
    const alertas = criarAlertas(leituras,regioes)
    const monitoramento = criarMonitoramento(sensores, alertas)
    return {
        usuarios,
        regioes,
        leituras,
        sensores,
        alertas,
        monitoramento
    }
}

export default seed