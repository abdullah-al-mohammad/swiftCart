// const links = document.querySelectorAll('.menu a');

// links.forEach(link => {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();

//     links.forEach(item => item.classList.remove('active'));

//     this.classList.add('active');
//   });
// });
// console.log('index.js connect', links);
const loadTopProduct = () => {
  const url = 'https://fakestoreapi.com/products';
  fetch(url)
    .then(res => res.json())
    .then(data => displayTopProduct(data));
};
const displayTopProduct = products => {
  console.log(products);

  const productContainer = document.getElementById('top_rated');
  productContainer.innerHTML = '';
  productContainer.classList.add('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-5');
  const topProducts = products.filter(p => p.rating.rate >= 4);

  topProducts.forEach(p => {
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
          <figure class='bg-slate-400'>
            <img class="h-80"
              src="${p.image}"
              alt="${p.category}"
            />
          </figure>
          <div class="card-body">
            <div class="flex justify-between items-center">
              <span class="bg-blue-400 rounded-full p-1 px-3 text-white">${p.category}</span>
              <span><i class="fa-solid fa-star text-yellow-500"></i> ${p.rating.rate} (${p.rating.count})</span>
            </div>
            <h2 class="card-title h-10">${p.title}</h2>
            <p>$${p.price}</p>
            <div class="card-actions justify-between">
              <button onClick="productDetails(${p.id})" class="btn btn-outline"><i class="fa-regular fa-eye"></i> Details</button>
              <button class="btn btn-primary">
                <i class="fa-solid fa-cart-shopping"></i> Add
              </button>
            </div>
          </div>
        </div>
  `;
    productContainer.appendChild(cardDiv);
  });
};
loadTopProduct();
