const loadProducts = async () => {
  const url = 'https://fakestoreapi.com/products';
  const res = await fetch(url);
  const products = await res.json();
  displayProducts(products);
};

const loadCategories = async () => {
  const url = 'https://fakestoreapi.com/products/categories';
  const res = await fetch(url);
  const catigories = await res.json();
  displayCategories(catigories);
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll('.category-btn');
  lessonButtons.forEach(btn => btn.classList.remove('active'));
  console.log(lessonButtons);
};

const loadCategory = async category => {
  const url = `https://fakestoreapi.com/products/category/${category}`;
  const res = await fetch(url);
  const categoryProducts = await res.json();
  removeActive();
  const clickBtn = document.getElementById(`category-btn-${category}`);
  clickBtn.classList.add('active');
  displayProducts(categoryProducts);
  console.log(categoryProducts, 'category');
};
loadCategory();

const displayCategories = categories => {
  const categoriesContainer = document.getElementById('product-category');
  categoriesContainer.classList.add(
    'flex',
    'justify-center',
    'items-center',
    'gap-2',
    'w-6/12',
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
// {
//   "id": 1,
//   "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   "price": 109.95,
//   "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   "category": "men's clothing",
//   "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
//   "rating": {
//     "rate": 3.9,
//     "count": 120
//   }
// }

const displayProducts = products => {
  console.log(products);

  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = '';
  productsContainer.classList.add('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-5');
  products.forEach(p => {
    const productDiv = document.createElement('div');
    productDiv.innerHTML = `
<div class="card bg-base-100 shadow-sm">
    <figure>
      <img class="h-40"
        src="${p.image}"
        alt="${p.category}"
      />
    </figure>
    <div class="card-body">
      <div class="flex justify-between items-center">
        <span>${p.category}</span>
        <span><i class="fa-solid fa-star text-yellow-500"></i> ${p.rating.rate} (${p.rating.count})</span>
      </div>
      <h2 class="card-title">${p.title}</h2>
      <p>$${p.price}</p>
      <div class="card-actions justify-between">
        <button class="btn btn-outline"><i class="fa-regular fa-eye"></i> Details</button>
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
