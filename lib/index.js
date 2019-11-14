const Options = {
    'interval': [0, 5], // Intervalo
    'interactions': 0, // Interações realizadas
    'exactDecimal': 3, // Casas decimais corretas da operação
    'verifyDecimal': 0, // Quantidade de casas decimais verificadas, OBS.: verify precisa ser igual a exactDecimal no final do processo para o método ter funcionado corretamente
}
let valueOld = [] // Array com o valor da interação antiga
let value = (Options.interval[0] + Options.interval[1]) / 2 // Ponto médio do intervalo
let [verify, position] = [[], 0]

// Função da equação do método
const equation = point => {
    return eval(`${point} - (((${point}/2)**2 - Math.sin(${point})) / ((${point}/2) - Math.cos(${point})))`)
}

const calculate = () => {
    while(Options.exactDecimal != Options.verifyDecimal) {
        Options.verifyDecimal = 0
        value = (equation(value)).toFixed(Options.exactDecimal)
        verify = value.toString().split('') // Transformando VALUE em um array
        position = verify.indexOf('.') // Verificando a posição do '.' em relção ao array

        // Verificando se as casas decimais do valor são iguais com as casas decimais do valor antigo
        for (let i = 0; i < Options.exactDecimal; i++) {
            if(valueOld[position+i] != undefined){
                if (verify[position+i] === valueOld[position+i] && Options.verifyDecimal < Options.exactDecimal) {
                    Options.verifyDecimal += 1
                }
            }
        }

        Options.interactions += 1 // Adicionando +1 em interações
        valueOld = (equation(value)).toString().split('') // Colocando o valor desta operação como o valor antigo
    }

    return [value, Options.interactions, Options.verifyDecimal] // Retornando as propriedades do método
}
console.log(calculate())