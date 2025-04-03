// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
let products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
let cart = [];

let total = 0;

// Exercise 1
function buy(id) {
    const cartProduct = cart.find(p => p.id === id);
    if (cartProduct) {
        cartProduct.quantity++;
    } else {
        const product = products.find(p => p.id === id);
        if (product) {
            cart.push({ ...product, quantity: 1 });
        }
    }
    document.getElementById("count_product").textContent = cart.length;
    console.log(cart);
}


// Exercise 2
function cleanCart() {
    document.getElementById("cart_list").innerHTML = ""; 
    cart = []; 
    calculateTotal(); 
    document.getElementById("count_product").textContent = 0;
}
  
// Exercise 3
function calculateTotal() {
    let totalPrice = cart.reduce((acc, product) => {
        let productTotal = product.price * product.quantity;
        if (product.offer && product.quantity >= product.offer.number) {
            productTotal *= (1 - product.offer.percent / 100);
        }
        return acc + productTotal;
    }, 0);

    document.getElementById("total_price").textContent = totalPrice.toFixed(2);
}



// Exercise 4
function applyPromotionsCart() {
    cart.forEach(product => {
        if (product.offer && product.quantity >= product.offer.number) {
            product.subtotalWithDiscount = product.price * product.quantity * (1 - product.offer.percent / 100);
        } else {
            product.subtotalWithDiscount = product.price * product.quantity;
        }
    });
}
// Exercise 5
function printCart() {
    const cartList = document.getElementById("cart_list");
    cartList.innerHTML = ""; 
    cart.forEach(product => {
        const row = document.createElement("tr"); 
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${(product.subtotalWithDiscount ?? product.price * product.quantity).toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td><button onclick="removeFromCart(${product.id})">❌</button></td>
        `;

        cartList.appendChild(row); 
    });
    document.getElementById("total_price").textContent = calculateTotal().toFixed(2);
}


// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
    const productIndex = cart.findIndex(p => p.id === id);

    if (productIndex !== -1) {
        const product = cart[productIndex];

        if (product.quantity > 1) {
            product.quantity--;
        } else {
            cart.splice(productIndex, 1);
        }
        console.log(`Removed one unit of ${product.name} from cart.`);
    } else {
        console.log("Product not found in cart.");
    }

    printCart(); 
    applyPromotionsCart(); 
    document.getElementById("count_product").textContent = cart.reduce((acc, p) => acc + p.quantity, 0); 
}


function open_modal() {
    printCart();
}