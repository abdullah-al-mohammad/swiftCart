const loadProducts = async () => {
  const url = 'https://fakestoreapi.com/products';
  const res = await fetch(url);
  const products = await res.json();
  displayProducts(products);
};

const productDetails = id => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayDetail(data));
};

const loadCategories = async () => {
  const url = 'https://fakestoreapi.com/products/categories';
  const res = await fetch(url);
  const catigories = await res.json();
  displayCategories(catigories);
};

const removeActive = () => {
  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach(btn => btn.classList.remove('active'));
};

const loadCategory = async category => {
  const url = `https://fakestoreapi.com/products/category/${category}`;
  const res = await fetch(url);
  const categoryProducts = await res.json();
  removeActive();
  const clickBtn = document.getElementById(`category-btn-${category}`);
  clickBtn.classList.add('active');
  displayProducts(categoryProducts);
};
loadCategory();

const displayDetail = product => {
  const detailsBox = document.getElementById('detail-container');
  detailsBox.innerHTML = `
  <div>
    <h2 class="text-xl font-bold">
      <span class="text-blue-600">Title:</span> ${product.title}
    </h2>
  </div>
  <div>
    <h2 class="text-lg font-bold">Description</h2>
    <p>${product.description}</p>
  </div>
  <div>
    <p><span>rating:</span> <span class="text-yellow-500">${product.rating.rate}</span> (${product.rating.count})</p>
  </div>
  <div>
    <p><span>price:</span> $${product.price}</p>
  </div>
  <div>
    <button class="btn btn-primary" type="button">Buy Now</button>
  </div>
  `;
  document.getElementById('detail_modal').showModal();
};

const displayCategories = categories => {
  const categoriesContainer = document.getElementById('product-category');
  categoriesContainer.classList.add(
    'flex',
    'flex-wrap',
    'justify-center',
    'items-center',
    'gap-2',
    'mx-auto',
    'mb-10'
  );

  const allButton = document.createElement('button');
  allButton.innerText = 'All';
  removeActive();
  allButton.classList.add('btn', 'btn-outline', 'rounded-full', 'category-btn', 'active');
  allButton.addEventListener('click', () => {
    removeActive();
    allButton.classList.add('active');
    loadProducts();
  });
  categoriesContainer.appendChild(allButton);

  for (let category of categories) {
    const button = document.createElement('button');
    button.innerText = category;
    button.id = `category-btn-${category}`;
    button.classList.add('btn', 'btn-outline', 'rounded-full', 'category-btn');
    button.addEventListener('click', () => {
      loadCategory(category);
    });
    categoriesContainer.appendChild(button);
  }
};
loadCategories();

const displayProducts = products => {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = '';
  productsContainer.classList.add('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-5');
  products.forEach(p => {
    const productDiv = document.createElement('div');
    productDiv.innerHTML = `
<div class="card bg-base-100 shadow-sm">
    <figure class="bg-slate-400">
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
      <h2 class="card-title h-20">${p.title}</h2>
      <p class="font-bold">$${p.price}</p>
      <div class="card-actions justify-between">
        <button onClick="productDetails(${p.id})" class="btn btn-outline"><i class="fa-regular fa-eye"></i> Details</button>
        <button class="btn btn-primary">
          <i class="fa-solid fa-cart-shopping"></i> Add
        </button>
      </div>
    </div>
  </div>
    `;
    productsContainer.appendChild(productDiv);
  });
};
loadProducts();
