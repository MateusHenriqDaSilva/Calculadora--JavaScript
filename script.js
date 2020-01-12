class Calculadora  {
    constructor(previsaoOperandoTextoElementos,proximoOperandoTextoElementos) {
        this.previsaoOperandoTextoElementos = previsaoOperandoTextoElementos
        this.proximoOperandoTextoElementos = proximoOperandoTextoElementos
        this.limpar();
    }
    limpar() {
        this.proximaOperacao = '';
        this.previsaoOperacao = '';
        this.operacao = undefined;
    }

    delete() {
        this.proximaOperacao = this.proximaOperacao.toString().slice(0, -1)
    }

    adicionarNumero(numero) {
        if(numero === '.' && this.proximaOperacao.includes('.')) return
        this.proximaOperacao = this.proximaOperacao.toString() + numero.toString()
    }

    fecharOperacao(operacao) {
        if(this.proximaOperacao === '') return
        if(this.previsaoOperacao !== '') {
            this.computado()
        }
        this.operacao = operacao
        this.previsaoOperacao = this.proximaOperacao
        this.proximaOperacao = ''
    }

    computado() {
        let computado
        const previsao = parseFloat(this.previsaoOperacao)
        const proximo = parseFloat(this.proximaOperacao)
        if(isNaN(previsao) || isNaN(proximo)) return
        switch (this.operacao) {
            case '+':
                computado = previsao + proximo
                break
            
            case '-':
                 computado = previsao - proximo
                break

            case '*':
                computado = previsao * proximo
                break

            case '/':
                computado = previsao / proximo
                break
            default: 
                return
        }
            this.proximaOperacao = computado
            this.operacao = undefined
            this.previsaoOperacao = ''
        }
    
    pegarNumeroDisplay(numero){
        const stringNumero = numero.toString()
        const digitosInteiro = parseFloat(stringNumero.split('.')[0])
        const digitosDecimal = stringNumero.split('.')[1]
        let inteirosDisplay
        if(isNaN(digitosInteiro)) {
            inteirosDisplay = ''
        } else {
            inteirosDisplay = digitosInteiro.toLocaleString('en', { maximumFractionDigits: 0})
        }
        if(digitosDecimal != null) {
            return `${inteirosDisplay}.${digitosDecimal}`
        } else {
            return inteirosDisplay
        }
    }

    atualizarDisplay() {
        this.proximoOperandoTextoElementos.innerText = this.pegarNumeroDisplay(this.proximaOperacao)
        if(this.operacao != null) {
            this.previsaoOperandoTextoElementos.innerText = `${this.pegarNumeroDisplay(this.previsaoOperacao)} ${this.operacao}`
        } else {
            this.previsaoOperandoTextoElementos.innerText = ''
        }
    }
}

const numerosBotao = document.querySelectorAll('[numero]');
const operacaoBotao = document.querySelectorAll('[operacao]')
const igualBotao = document.querySelector('[igual]')
const deletarBotao = document.querySelector('[delete]')
const limparBotao = document.querySelector('[limpar]')
const previsaoOperandoTextoElementos = document.querySelector('[previsao-operando]')
const proximoOperandoTextoElementos = document.querySelector('[proximo-operando]')

const calculadora = new Calculadora(previsaoOperandoTextoElementos,proximoOperandoTextoElementos)

numerosBotao.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.adicionarNumero(button.innerText)
        calculadora.atualizarDisplay()
    })
})

operacaoBotao.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.fecharOperacao(button.innerText)
        calculadora.atualizarDisplay()
    })
})

igualBotao.addEventListener('click', button => {
    calculadora.computado()
    calculadora.atualizarDisplay()
})

limparBotao.addEventListener('click', button => {
    calculadora.limpar()
    calculadora.atualizarDisplay()
})

deletarBotao.addEventListener('click', button => {
    calculadora.delete()
    calculadora.atualizarDisplay()
})