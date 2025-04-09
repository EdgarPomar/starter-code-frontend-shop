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
];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
let cart = [];

let total = 0;

// Exercise 1: Function to add products to the cart
function buy(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        const existingProduct = cart.find(p => p.id === id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
    }
    console.log(cart);
    // After adding product, recalculate total and apply promotions
    applyPromotionsCart(cart);  // Apply promotions after adding the product
    calculateTotal();           // Recalculate total price after applying promotions
}

// Exercise 2: Function to clear the cart
function cleanCart() {
    cart = [];
    console.log(cart);
    total = 0;  // Reset total
}

// Exercise 3: Function to calculate the total of the cart
function calculateTotal() {
    total = 0;  // Reset total before recalculating
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].subtotalWithDiscount || (cart[i].price * cart[i].quantity); // If there's a discount, use it; otherwise, calculate with original price
    }
    console.log("Total:", total);
    return total;
}

// Exercise 4: Function to apply promotions to products in the cart
function applyPromotionsCart(cart) {
    for (let i = 0; i < cart.length; i++) {
        let product = cart[i];
        
        // Check if the product has an offer
        if (product.offer) {
            // Apply discount if quantity is enough
            if (product.type === 'grocery' && product.name.toLowerCase().includes('oil') && product.quantity >= product.offer.number) {
                // Discount for cooking oil
                product.subtotalWithDiscount = product.price * product.quantity * (1 - product.offer.percent / 100);
            } else if (product.type === 'grocery' && product.name.toLowerCase().includes('cupcake') && product.quantity >= product.offer.number) {
                // Discount for cupcake mixture
                product.subtotalWithDiscount = product.price * product.quantity * (1 - product.offer.percent / 100);
            }
        }
        
        // If no discount, keep the normal price
        if (!product.subtotalWithDiscount) {
            product.subtotalWithDiscount = product.price * product.quantity;
        }
    }
}

// Exercise 5: Function to print the cart (e.g., to show the cart in a modal)
function printCart() {
    // You could use DOM manipulation to show the cart in the UI, for now we log it
    console.log("Cart contents:");
    cart.forEach(product => {
        console.log(`Product: ${product.name}, Quantity: ${product.quantity}, Subtotal: ${product.subtotalWithDiscount}`);
    });
}

// ** Nivell II **

// Exercise 7: Function to remove a product from the cart
function removeFromCart(id) {
    const productIndex = cart.findIndex(p => p.id === id);
    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        console.log("Product removed from cart");
    } else {
        console.log("Product not found in cart");
    }
    // After removing the product, recalculate total and apply promotions
    applyPromotionsCart(cart);
    calculateTotal();
}

// Open modal to view cart
function open_modal() {
    printCart();
}

// Example usage:

// Adding products to the cart
buy(1); // Adds "cooking oil" to the cart
buy(3); // Adds "Instant cupcake mixture" to the cart

// Viewing the cart
open_modal();

// Calculating total after promotions
calculateTotal();

// Removing a product
removeFromCart(1); // Removes "cooking oil" from the cart

// Clean the cart
cleanCart();
