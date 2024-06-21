document.addEventListener('DOMContentLoaded', () => {
    generateProducts();
});

let products = [
    { id: 1, name: 'Classic Black Suit', price: 250, image: 'https://via.placeholder.com/200x300' },
    { id: 2, name: 'Navy Blue Suit', price: 300, image: 'https://via.placeholder.com/200x300' },
    { id: 3, name: 'Casual White Suit', price: 200, image: 'https://via.placeholder.com/200x300' },
    { id: 4, name: 'Summer Floral Suit', price: 220, image: 'https://via.placeholder.com/200x300' },
];

let cart = [];

function generateProducts() {
    let productsHTML = products.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Buy</button>
        </div>
    `).join('');
    document.getElementById('products').innerHTML = productsHTML;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    updateCartModal();
    showNotification(`${product.name} has been added to your cart!`);
}

function updateCartModal() {
    const cartHTML = cart.map(item => `
        <div class="cart-item">
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
    document.getElementById('cartItems').innerHTML = cartHTML;
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById('totalPrice').innerText = total;
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    updateCartModal();
}

function showCart() {
    document.getElementById('cartModal').style.display = 'block';
    updateCartModal();
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function checkout() {
    alert('Thanks for your purchase!');
    cart = []; // Clear the cart
    closeCart();
    updateCartModal();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'notification';
    document.body.appendChild(notification);
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000); // Notification disappears after 3000 ms (3 seconds)
}
