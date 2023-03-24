// fetch('https://cryptocurrency-news2.p.rapidapi.com/v1/cointelegraph', options)
//     .then(response => response.json())
//     .then(response => {
//         const data = response.data;
//         const carouselItems = document.querySelector('.carousel-inner');
//         let carouselIndicators = document.querySelector('.carousel-indicators');

//         data.slice(0, 10).forEach((item, index) => {
//             const activeClass = index === 0 ? 'active' : '';
//             const carouselItem = `
//                 <div class="carousel-item ${activeClass}">
//                     <img src="${item.thumbnail}" class="d-block h-50 w-100" alt="${item.title}">
//                     <div class="carousel-caption" d-none d-md-block">
//                         <h5><a href="${item.url}" target="_blank">${item.title}</a></h5>
//                     </div>
//                 </div>
//             `;
//             carouselItems.innerHTML += carouselItem;

//             const carouselIndicator = `
//                 <button type="button" data-bs-target="#newsCarousel" data-bs-slide-to="${index}" class="${activeClass}"></button>
//             `;
//             carouselIndicators.innerHTML += carouselIndicator;
//         });
//     })
//     .catch(err => console.error(err));

fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN')
    .then(response => response.json())
    .then(response => {
        const data = response.Data;
        const carouselItems = document.querySelector('.carousel-inner');
        let carouselIndicators = document.querySelector('.carousel-indicators');

        data.slice(0, 10).forEach((item, index) => {
            const activeClass = index === 0 ? 'active' : '';
            const carouselItem = `
                <div class="carousel-item ${activeClass}">
                    <div class="container text-center justify-content-center align-items-center">
                    <img src="${item.imageurl}" style="max-height: 320px; max-width: 320px" alt="${item.title}">
                    </div>
                    <div class="carousel-caption d-md-block">
                        <h5><a href="${item.guid}" target="_blank">${item.title}</a></h5>
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