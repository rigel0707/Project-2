// const apiKey = 'pub_189908b66f2dcc723713be44652e48a145c2e'



// fetch(`https://newsdata.io/api/1/crypto?apikey=${apiKey}&language=en`)
// .then(resp => resp.json())
//     .then((data) => {
//         console.log(data)
//     })

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '29711ccafbmsha3222b5c17c5f46p1812f9jsn20ecb0baa7f4',
		'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
	}
};

fetch('https://cryptocurrency-news2.p.rapidapi.com/v1/cointelegraph', options)
    .then(response => response.json())
    .then(response => {
        const data = response.data;
        const carouselItems = document.querySelector('.carousel-inner');
        let carouselIndicators = document.querySelector('.carousel-indicators');

        data.slice(0, 10).forEach((item, index) => {
            const activeClass = index === 0 ? 'active' : '';
            const carouselItem = `
                <div class="carousel-item ${activeClass}">
                    <img src="${item.thumbnail}" class="d-block h-50 w-100" alt="${item.title}">
                    <div class="carousel-caption" d-none d-md-block">
                        <h5><a href="${item.url}" target="_blank">${item.title}</a></h5>
                    </div>
                </div>
            `;
            carouselItems.innerHTML += carouselItem;

            const carouselIndicator = `
                <button type="button" data-bs-target="#newsCarousel" data-bs-slide-to="${index}" class="${activeClass}"></button>
            `;
            carouselIndicators.innerHTML += carouselIndicator;
        });
    })
    .catch(err => console.error(err));



// fetch('https://cryptocurrency-news2.p.rapidapi.com/v1/cointelegraph', options)
//     .then(response => response.json())
//     .then(response => {
//         const data = response.data;
//         for (let i = 0; i < 10; i++){
//         console.log(data[i].url)
//         console.log(data[i].title)
//         console.log(data[i].thumbnail)
//         }
//         // carouselItem(data);
//     })
//     .catch(err => console.error(err));

// function carouselItem(data){
//     const carousel = document.querySelector('#newsCarousel .carousel-inner');
//     // carousel.innerHTML = ''; // Clear any existing items

//     data.forEach((item) => {
//         // create new carousel item
//         const newItem = document.createElement('div');
//         newItem.classList.add('carousel-item');

//         // create new image element
//         const newImg = document.createElement('img');
//         newImg.classList.add('d-block', 'w-100');
//         newImg.src = item.thumbnail;
//         newImg.alt = item.title;

//         // create new caption element
//         const newCaption = document.createElement('div');
//         newCaption.classList.add('carousel-caption', 'd-none', 'd-md-block');

//         // create new heading element
//         const newHeading = document.createElement('h5');
//         newHeading.textContent = item.title;
//         newHeading.setAttribute('href', item.url);

//         // create new paragraph element
//         const newPara = document.createElement('p');
//         newPara.textContent = item.description;

//         // append the heading and paragraph to the caption element
//         newCaption.appendChild(newHeading);
//         newCaption.appendChild(newPara);

//         // append the image and caption to the new carousel item
//         newItem.appendChild(newImg);
//         newItem.appendChild(newCaption);

//         // append the new carousel item to the carousel element
//         carousel.appendChild(newItem);
//     });
// }
