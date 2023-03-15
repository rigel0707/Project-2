const convertBC = document.getElementById('cryptoconvert')
convertBC.addEventListener('click', cryptoconvert)

const hostCrypto = 'api.coinpaprika.com'

function cryptoconvert() {
    const amount = document.getElementById('crypto-amount').value
    const from = document.getElementById('from-cryptocurrency-select').value
    const to = document.getElementById('to-cryptocurrency-select').value

    fetch(`https://${hostCrypto}/v1/tickers/${from}`)
        .then(resp => resp.json())
        .then((data) => {
            console.log(data.quotes.USD.price)
            const usdConvert = data.quotes.USD.price * amount
            const usdConvert1 = data.quotes.USD.price * 1
            console.log(usdConvert + ' ' + 'USD') //converted "from" currency to usd

        fetch(`https://${hostCrypto}/v1/tickers/${to}`)
            .then(respTo => respTo.json())
            .then((dataTo) => {
                const rate = dataTo.quotes.USD.price
                result = usdConvert / rate
                actualRate = usdConvert1 / rate //rate of "from' and "to" ex. 1 BTC = 14.58 ETH
                unit = to.substring(0, 3).toUpperCase()
                document.getElementById('cryptoresult').innerText = result
                document.getElementById('cryptoresultunit').innerText = unit
                document.getElementById('crypto-rate').innerText = `1 ${from}` + " = " + actualRate + " " + unit
            })

        })
}




