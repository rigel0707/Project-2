const convertBCG = document.getElementById('cryptoconvert')
convertBCG.addEventListener('click', function(event) {
    event.preventDefault()
    cryptoGraph()
})
let myChart


function cryptoGraph(){
const from = document.getElementById('from-cryptocurrency-select').value
const to = document.getElementById('to-cryptocurrency-select').value
const unitTo = to.substring(0, to.indexOf('-')).toUpperCase()
const unitFrom = from.substring(0, from.indexOf('-')).toUpperCase()

fetch(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${unitFrom}&tsym=${unitTo}&limit=30`)
        .then(resp => resp.json())
        .then((data) => {
            const dates = []
            const prices = []
            // Loop through each data point and extract the date and price values
            for(let i = 0; i < 31; i++) {
                const unixTimestamp = data.Data.Data[i].time
                const dateObj = new Date(unixTimestamp * 1000)
                const month = dateObj.getMonth() + 1
                const day = dateObj.getDate()
                const year = dateObj.getFullYear()
                const formattedDate = `${month}/${day}/${year}`
                dates.push(formattedDate)
                prices.push(data.Data.Data[i].close)
            }
            
            // Create a new Chart.js line chart
            const ctx = document.getElementById('myCryptoChart').getContext('2d')
            if (myChart !== undefined) {
                myChart.destroy();
            }
            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: `${unitFrom} to ${unitTo} Exchange Rate`,
                        data: prices,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderWidth: 1
                    }]
                },
                options: {}
            })
            showChart()
        })
}

function showChart() {
    document.getElementById("myCryptoChart").style.display = "block"
}

document.addEventListener('DOMContentLoaded', function() {
    cryptoGraph();
})

