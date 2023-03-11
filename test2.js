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
      const rate = data.rates[to]
      console.log(`${amount} ${from} = ${rate} ${to}`)
      document.getElementById('result').value = rate.toFixed(2)
    })

    fetch(`https://${host}/latest?amount=1&from=${from}&to=${to}`)
    .then(resp => resp.json())
    .then((data) => {
      const rate = data.rates[to]
      console.log(`${amount} ${from} = ${rate} ${to}`)
      document.getElementById('rate').innerText = `${amount} ${from} = ${rate} ${to}`
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

  // function drawGraph() {
  //   const currency = document.getElementById('from-currency-select').value;
  //   const url = `https://${host}/2022-02-08..latest?from=${currency}`;
  //   fetch(url)
  //     .then(resp => resp.json())
  //     .then(data => {
  //       // Transform the data to an array of objects with date and rate properties
  //       const rates = Object.entries(data.rates)
  //         .map(([date, rate]) => ({ date: new Date(date), rate }));
  
  //       // Set up the D3 scales and axis
  //       const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  //       const width = 600 - margin.left - margin.right;
  //       const height = 400 - margin.top - margin.bottom;
  //       const x = d3.scaleTime()
  //         .domain(d3.extent(rates, d => d.date))
  //         .range([0, width]);
  //       const y = d3.scaleLinear()
  //         .domain([d3.min(rates, d => d.rate), d3.max(rates, d => d.rate)])
  //         .range([height, 0]);
  //       const xAxis = d3.axisBottom(x);
  //       const yAxis = d3.axisLeft(y);
  
  //       // Set up the D3 line generator
  //       const line = d3.line()
  //         .x(d => x(d.date))
  //         .y(d => y(d.rate));
  
  //       // Create the SVG group and add the line and axis elements
  //       const svg = d3.select("#graph");
  //       svg.selectAll("*").remove();
  //       const g = svg.append("g")
  //         .attr("transform", `translate(${margin.left},${margin.top})`);
  //       g.append("path")
  //         .datum(rates)
  //         .attr("fill", "none")
  //         .attr("stroke", "steelblue")
  //         .attr("stroke-width", 1.5)
  //         .attr("d", line);
  //       g.append("g")
  //         .attr("transform", `translate(0,${height})`)
  //         .call(xAxis);
  //       g.append("g")
  //         .call(yAxis);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }
  
  // // Call the drawGraph function when the Convert button is clicked
  // convertB.addEventListener('click', drawGraph);
  

// Fetch currency names and populate select options
// const fromCurrencySelect = document.getElementById('from-currency-select')
// const toCurrencySelect = document.getElementById('to-currency-select')
// fetch(`https://${host}/currencies`)
//   .then(resp => resp.json())
//   .then((data) => {
//     const currencyNames = data
//     const options = Object.entries(currencyNames).map(([code, name]) => {
//       const option = document.createElement('option')
//       option.text = name
//       option.value = code
//       console.log(code)
//       return option
//     })
//     fromCurrencySelect.append(...options)
//     toCurrencySelect.append(...options)
//   })







