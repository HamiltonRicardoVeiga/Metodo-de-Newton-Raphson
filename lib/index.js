const interval = [0, 5]
let interactions = 0
const options = {
    'interactions': 13,
    'exactDecimal': 3,
    'verifyDecimal': 0,
}
var old = []

let value = (interval[0] + interval[1]) / 2

const equation = point => {
    return eval(`${point} - (((${point}/2)**2 - Math.sin(${point})) / ((${point}/2) - Math.cos(${point})))`)
}

const calculate = () => {
    while(options.exactDecimal != options.verifyDecimal && interactions < options.interactions) {
        value = (equation(value)).toFixed(options.exactDecimal)
        var verify = (equation(value)).toString().split('')
        var position = verify.indexOf('.')
        for (let i = 0; i < options.exactDecimal; i++) {
            if(old[position+i] != undefined){
                if (verify[position+i] === old[position+i] && options.verifyDecimal < options.exactDecimal) {
                    options.verifyDecimal = options.verifyDecimal + 1
                }
            }
        }
        interactions++
        old = (equation(value)).toString().split('')
    }
    return [value, interactions, options.verifyDecimal]
}
console.log(calculate())