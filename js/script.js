'use strict';

const thumbnails = document.querySelectorAll('.thumbnails img');
const productImage = document.querySelector('.product-image');
const navLinks = document.querySelectorAll('.nav-link');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.querySelector('#cart-modal');
const quantityCount = document.querySelector('.quantity-count');
const reduceQuantityButton = document.querySelector('.quantity-minus');
const addQuantityButton = document.querySelector('.quantity-plus');

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