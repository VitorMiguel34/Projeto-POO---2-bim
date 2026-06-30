import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dadosDir = path.join(__dirname, '../seeds')

function criarRegioes(){
    const informacoes = JSON.parse(fs.readFileSync(path.join(dadosDir, 'regioes.json')))
    return informacoes.map((i) => ({ "nome": i[0], "descricao": i[1] }))
}

function criarSensores(regioes){
    const informacoes = JSON.parse(fs.readFileSync(path.join(dadosDir, 'sensores.json')))
    return informacoes.map((i, index) => ({
        "tipo": i[0],
        "ativo": i[1],
        "regiao": regioes[index]
    }))
}

function criarLeituras(){
    const informacoes = JSON.parse(fs.readFileSync(path.join(dadosDir, 'leituras.json')))
    return informacoes.map((i) => ({
        "valorRegistrado": i[0],
        "mensagem": "Leitura inicializada por seed"
    }))
}

function criarAlertas(regioes){
    const informacoes = JSON.parse(fs.readFileSync(path.join(dadosDir, 'alertas.json')))
    return informacoes.map((i, index) => ({
        "mensagem": i[0],
        "leituraId": index,
        "regiao": regioes[index]
    }))
}

function criarUsuarios(){
    const informacoes = JSON.parse(fs.readFileSync(path.join(dadosDir, 'usuarios.json')))
    return informacoes.map(i => ({ nome: i[0], senha: i[1], admin: i[2], ativo: i[3] }))
}

export default function seed(){
    const usuarios = criarUsuarios()
    const regioes = criarRegioes()
    const leituras = criarLeituras()
    const sensores = criarSensores(regioes)
    const alertas = criarAlertas(regioes)

    return { usuarios, sensores, leituras, alertas }
}