let allProducts = [];
let cart = [];

const loadProducts = async () => {
  const url = 'https://fakestoreapi.com/products';
  const res = await fetch(url);
  const products = await res.json();
  allProducts = products;
  displayProducts(allProducts);
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
    const isInCart = cart.some(item => item.id === p.id);
    console.log(isInCart);

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
                  <button
              onClick="addToCart(${p.id})"
              class="btn ${isInCart ? 'btn-success text-black' : 'btn-primary'}">
              <i class="fa-solid fa-cart-shopping"></i>
              ${isInCart ? 'Added' : 'Add'}
            </button>
                </div>
              </div>
    `;
    productsContainer.appendChild(productDiv);
  });
};
loadProducts();

// cart modal

function openCart() {
  renderCart();
  document.getElementById('cartModal').showModal();
}

const addToCart = async productId => {
  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
  const product = await res.json();

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
  displayProducts(allProducts);
};

function renderCart() {
  const cartDiv = document.getElementById('cart-items');
  cartDiv.innerHTML = '';
  if (cart.length === 0) {
    cartDiv.innerHTML = `
      <div class="text-center py-5">
        <p class="text-lg font-semibold text-gray-500">
          🛒 Cart is Empty
        </p>
      </div>
    `;
    return;
  }
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement('div');
    div.className = 'flex justify-between items-center border-b pb-2';
    div.innerHTML = `
      <div>
        <p class="font-semibold">${item.title}</p>
        <p class="flex justify-between items-center font-semibold"><span>$${item.price}</span> <span>Quantity: ${item.quantity}</span></p>
      </div>
      <div class="flex gap-2 items-center">
        <button class="btn btn-xs" onclick="decreaseQty(${index})">-</button>
        <button class="btn btn-xs" onclick="increaseQty(${index})">+</button>
        <button class="btn btn-error btn-xs" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
    cartDiv.appendChild(div);
  });

  cartDiv.innerHTML += `
    <h3 class="text-lg font-bold mt-4">
      Total: $<span id="total-price">${total.toFixed(2)}</span>
    </h3>
  `;
}

function increaseQty(index) {
  cart[index].quantity += 1;
  renderCart();
  updateCartCount();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  renderCart();
  updateCartCount();
}

function removeItem(index) {
  const result = cart.splice(index, 1);
  console.log(result);

  renderCart();
  updateCartCount();
}

function updateCartCount() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById('cart-count').innerText = totalItems;
}
