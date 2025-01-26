// Initialize cart from localStorage or create a new one
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h2>${item.name}</h2>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="item-quantity"></p>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);

        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);

    // Add event listeners for quantity changes and item removal
    document.querySelectorAll('.item-quantity').forEach(input => {
        input.addEventListener('change', updateItemQuantity);
    });
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItemFromCart);
    });
}

// Function to add an item to the cart
function addItemToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Function to update item quantity
function updateItemQuantity(event) {
    const itemId = event.target.dataset.id;
    const newQuantity = parseInt(event.target.value);
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

// Function to remove an item from the cart
function removeItemFromCart(event) {
    const itemId = event.target.dataset.id;
    cart = cart.filter(cartItem => cartItem.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', updateCartDisplay);

// Handle "Proceed to Checkout" button click
document.querySelector('.checkout-button').addEventListener('click', () => {
    const totalAmount = document.getElementById('total-price').textContent;
    localStorage.setItem('totalAmount', totalAmount);
    window.location.href = 'checkout.html';
});

// Function to add an item to the cart
function addItemToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart!');
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const item = {
            id: button.dataset.id,
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
            image: button.dataset.image,
            quantity: 1
        };
        addItemToCart(item);
    });
});