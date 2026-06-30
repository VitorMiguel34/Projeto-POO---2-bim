import promptSync from 'prompt-sync'
const prompt = promptSync({ sigint : true})

export function formatarString(valor){
    return valor.toLowerCase().trim()
}
export function isStringValida(valor) {
    return typeof valor === 'string' && valor.trim().length > 0
}

export function lerString(mensagem) {
    let entrada = prompt(mensagem)
    while (!isStringValida(entrada)) {
        console.log("Entrada inválida. Por favor, não deixe em branco.")
        entrada = prompt(mensagem)
    }
    return entrada.trim()
}

export function lerSenhaInvisivel(mensagem) {
    let entrada = prompt(mensagem, { echo : '*'})
    while (!isStringValida(entrada)) {
        console.log(" A senha não pode estar em branco.")
        entrada = promptSenha(mensagem)
    }
    return entrada.trim()
}

export function lerConfirmacao(mensagem) {
    while (true) {
        let entrada = prompt(mensagem).trim().toLowerCase()
        
        if (entrada === 's') return true
        if (entrada === 'n') return false
        
        console.log(" Resposta inválida. Digite 's' para Sim ou 'n' para Não.")
    }
}