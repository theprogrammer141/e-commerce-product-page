'use strict';

const thumbnails = document.querySelectorAll('.thumbnails img');
const productImage = document.querySelector('.product-image');
const navLinks = document.querySelectorAll('.nav-link');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.querySelector('#cart-modal');
const quantityCount = document.querySelector('.quantity-count');
const reduceQuantityButton = document.querySelector('.quantity-minus');
const addQuantityButton = document.querySelector('.quantity-plus');
const addToCartButton = document.querySelector('.add-to-cart');
const cartModalDescription = document.querySelector('#cart-modal-description');
const productTitle = document.querySelector('.product-title');
const productPrice =
    document.querySelector('.product-price').firstChild.textContent;
const cartIconBadge = document.querySelector('.cart-icon-badge');

let cartItem = {};
const savedItem = localStorage.getItem('cartItem');

thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', function (e) {
        thumbnails.forEach((tn) => {
            tn.classList.remove('selected');
        });
        e.currentTarget.classList.add('selected');

        const src = e.currentTarget.src;

        // const imageSource = src.slice(0, src.lastIndexOf('-')) + ".jpg"; //!Not suitable if you are reading it for the first time

        const imageSource = src.replace('-thumbnail', ''); //?Easily readable

        productImage.src = imageSource;
    });
});

navLinks.forEach((navLink) => {
    navLink.addEventListener('click', function (e) {
        navLinks.forEach((navLink) => {
            navLink.classList.remove('selected-link');
        });
        e.target.classList.add('selected-link');
    });
});

cartIcon.addEventListener('click', function (e) {
    cartModal.classList.toggle('hidden');
    e.stopPropagation();
});

cartModal.addEventListener('click', function (e) {
    e.stopPropagation();
});

document.addEventListener('click', function () {
    cartModal.classList.add('hidden');
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        cartModal.classList.add('hidden');
    }
});

reduceQuantityButton.addEventListener('click', function () {
    let quantity = Number(quantityCount.textContent);
    if (quantity > 0) {
        quantity -= 1;
    }
    quantityCount.textContent = quantity.toString();
});

addQuantityButton.addEventListener('click', function () {
    let quantity = Number(quantityCount.textContent);
    quantity += 1;
    quantityCount.textContent = quantity.toString();
});

//Add to cart functionality

const addToCart = function(){
    if(Number(quantityCount.textContent) === 0){}
    else{
        cartItem.title = productTitle.textContent;
        cartItem.price = productPrice;
        cartItem.quantity = quantityCount.textContent;
        cartItem.totalPrice = "$" + Number(productPrice.replace('$', '')) * Number(quantityCount.textContent) + ".00";

        localStorage.setItem('cartItem', JSON.stringify(cartItem));
        renderCart(cartItem);
        quantityCount.textContent = 0;
        updateBadge(cartItem);
    }
}

const renderCart = function(cartItem){
    if(!Number(cartItem.quantity)){
        cartModalDescription.textContent = 'Your cart is empty';
    }else{
        const html = `<div class="cart-item">
            <img src="${productImage.src.replace('.jpg', '-thumbnail.jpg')}" alt="Product" class="cart-item-image">
            <div class="cart-item-details">
            <p class="cart-item-title">${cartItem.title}</p>
            <div class="cart-item-pricing">
            <p class="cart-item-price-quantity">${cartItem.price} x ${cartItem.quantity}</p>
            <p class="cart-item-total-price">${cartItem.totalPrice}</p>
            </div>
            </div>
            <button class="delete-item"><img src="/images/icon-delete.svg" alt="DeleteIcon"/></button>
            </div>
            <button class="checkout-btn">Checkout</button>
            `;
            cartModalDescription.innerHTML = html;
    }   
}

const updateBadge = function (cartItem) {
    if (cartItem.quantity > 0) {
        cartIconBadge.textContent = cartItem.quantity;
        cartIconBadge.classList.remove('hidden');
    } else {
        cartIconBadge.classList.add('hidden');
    }
};

if (savedItem) {
    cartItem = JSON.parse(savedItem);
    renderCart(cartItem);
    updateBadge();
}

addToCartButton.addEventListener('click', addToCart);

cartModal.addEventListener("click", function(e){
    if(e.target.closest('.delete-item')){
        cartModalDescription.textContent = 'Your cart is empty';
        localStorage.removeItem('cartItem');
        cartItem = {};
        updateBadge(cartItem);
    }
});


