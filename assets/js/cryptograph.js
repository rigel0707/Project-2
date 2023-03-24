const convertBCGG = document.getElementById('convert')
convertBCGG.addEventListener('click', function(event) {
    event.preventDefault()
    currencyGraph()
})
let myCurrencyChart

function currencyGraph(){
    const from = document.getElementById('from-currency-select').value
    const to = document.getElementById('to-currency-select').value
    
    const host = 'api.frankfurter.app'
    const today = new Date()
    const startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
    const startDateString = startDate.toISOString().slice(0, 10) // format as YYYY-MM-DD

    fetch(`https://${host}/${startDateString}..${today.toISOString().slice(0, 10)}?&from=${from}&to=${to}`)
    .then(resp => resp.json())
    .then((data) => {

        const rates = data.rates
        const labels = Object.keys(rates)
        const values = Object.values(rates)
        const priceArray =  values.map(value => value[to])

        const ctx = document.getElementById('myCurrencyChart').getContext('2d')
        if (myCurrencyChart !== undefined) {
            myCurrencyChart.destroy();
        }
        myCurrencyChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `${from} to ${to} Exchange Rate`,
                    data: priceArray,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderWidth: 1
                }]
            },
            options: {}
        })
    })  

    }

function showChart() {
    document.getElementById("myCurrencyChart").style.display = "block"
}

document.addEventListener('DOMContentLoaded', function() {
    currencyGraph();
})