
const cartBtn = document.getElementById('cart');
const cartContainer = document.querySelector('.cart-container');
const rentButtons = document.querySelectorAll('.card button'); 
const bookTitles = document.querySelectorAll('.card h3');
const bookPrices = document.querySelectorAll('.card p:nth-of-type(2)');

let cartItems = []; 

cartBtn.addEventListener('click', () => {
    cartContainer.classList.toggle('look');
});


rentButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
     
        const title = bookTitles[index].textContent;
        const price = bookPrices[index].textContent;
        
        const existingItem = cartItems.find(item => item.title === title);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                title: title,
                price: price,
                quantity: 1
            });
        }
        
        updateCart();
    });
});

function updateCart() {
    cartContainer.innerHTML = '<h2>Your Cart</h2>';
    
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.price} × ${item.quantity}</p>
        `;
        cartContainer.appendChild(itemElement);
    });
    
    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `<strong>Total: $${calculateTotal()}</strong>`;
    cartContainer.appendChild(totalElement);
}

function calculateTotal() {
    return cartItems.reduce((total, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return total + (price * item.quantity);
    }, 0).toFixed(2);
}