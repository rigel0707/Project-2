
const convertB = document.getElementById('convert')
convertB.addEventListener('click', convert)

const host = 'api.frankfurter.app'

function convert() {
    const amount = document.getElementById('amount').value
    const from = document.getElementById('from-currency-select').value
    const to = document.getElementById('to-currency-select').value
    fetch(`https://${host}/latest?amount=${amount}&from=${from}&to=${to}`)
    .then(resp => resp.json())
    .then((data) => {
        const convertedRate = data.rates[to]
        console.log(`${amount} ${from} = ${convertedRate} ${to}`)
        document.getElementById('result').innerText = convertedRate.toFixed(2)
    })

    fetch(`https://${host}/latest?amount=1&from=${from}&to=${to}`)
    .then(resp => resp.json())
    .then((data) => {
        const rate = data.rates[to]
        console.log(`${amount} ${from} = ${rate} ${to}`)

        document.getElementById('first-rate-unit').innerText = `1 ${from} = ${rate} ${to}`
        document.getElementById('second-rate-unit').innerText = `${to}`
    })
}

const fromCurrencySelect = document.getElementById('from-currency-select')
const toCurrencySelect = document.getElementById('to-currency-select')

fetch(`https://${host}/currencies`)
    .then(resp => resp.json())
    .then((data) => {
    for (const code in data) {
        const option = document.createElement('option')
        option.text = data[code]
        option.value = code
        fromCurrencySelect.appendChild(option.cloneNode(true))
        toCurrencySelect.appendChild(option)
    }
    })
    .catch((error) => {
    console.log(error)
    })
