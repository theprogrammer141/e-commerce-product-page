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
const arrowLeftBtn = document.querySelector('.arrow-left');
const arrowRightBtn = document.querySelector('.arrow-right');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const closeMenuBtn = document.querySelector('.close-menu');
const navBar = document.querySelector('.navbar');
const navOverlay = document.querySelector('.nav-overlay');

let cartItem = {};
let currentIndex = 0;
const thumbnailsArray = Array.from(thumbnails);

const savedItem = localStorage.getItem('cartItem');

const updateBadge = function (cartItem) {
    if (cartItem.quantity > 0) {
        cartIconBadge.textContent = cartItem.quantity;
        cartIconBadge.classList.remove('hidden');
    } else {
        cartIconBadge.classList.add('hidden');
    }
};

//Add to cart functionality
const addToCart = function () {
    if (Number(quantityCount.textContent) === 0) {
    } else {
        cartItem.title = productTitle.textContent;
        cartItem.price = productPrice;
        cartItem.quantity = quantityCount.textContent;
        cartItem.totalPrice =
            '$' +
            Number(productPrice.replace('$', '')) *
                Number(quantityCount.textContent) +
            '.00';

        localStorage.setItem('cartItem', JSON.stringify(cartItem));
        renderCart(cartItem);
        quantityCount.textContent = 0;
        updateBadge(cartItem);
    }
};

const renderCart = function (cartItem) {
    if (!Number(cartItem.quantity)) {
        cartModalDescription.textContent = 'Your cart is empty';
    } else {
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
};

const switchToImage = function (index) {
    thumbnails.forEach((tn) => {
        tn.classList.remove('selected');
    });
    thumbnails[index].classList.add('selected');
    productImage.src = thumbnails[index].src.replace('-thumbnail', '');
    currentIndex = index;
};

if (savedItem) {
    cartItem = JSON.parse(savedItem);
    renderCart(cartItem);
    updateBadge(cartItem);
}

thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', function (e) {
        switchToImage(thumbnailsArray.indexOf(e.currentTarget));
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
        navBar.classList.remove('nav-open');
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

addToCartButton.addEventListener('click', addToCart);

cartModal.addEventListener('click', function (e) {
    if (e.target.closest('.delete-item')) {
        cartModalDescription.textContent = 'Your cart is empty';
        localStorage.removeItem('cartItem');
        cartItem = {};
        updateBadge(cartItem);
    }
});

arrowLeftBtn.addEventListener('click', function () {
    if (currentIndex > 0) {
        switchToImage(currentIndex - 1);
    } else if (currentIndex === 0) {
        currentIndex =
            (currentIndex - 1 + thumbnailsArray.length) %
            thumbnailsArray.length;
        switchToImage(currentIndex);
    }
});

arrowRightBtn.addEventListener('click', function () {
    if (currentIndex < thumbnailsArray.length - 1) {
        switchToImage(currentIndex + 1);
    } else if (currentIndex === thumbnailsArray.length - 1) {
        currentIndex = (currentIndex + 1) % thumbnailsArray.length;
        switchToImage(currentIndex);
    }
});

hamburgerMenu.addEventListener('click', function () {
    navBar.classList.add('nav-open');
    document.body.style.overflow = 'hidden';
});

closeMenuBtn.addEventListener('click', function () {
    navBar.classList.remove('nav-open');
    document.body.style.overflow = '';
});

navOverlay.addEventListener('click', function () {
    navBar.classList.remove('nav-open');
    document.body.style.overflow = '';
});