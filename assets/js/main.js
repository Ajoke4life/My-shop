function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {

    let cart = getCart();

    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart(cart);

    updateCartCount();

    alert(name + " added to cart!");
}

function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (total, product) =>
        total + product.quantity, 0
    );

    const counter =
        document.getElementById("cartCount");

    if (counter) {
        counter.textContent = count;
    }
}

function formatCurrency(amount) {

    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN"
    }).format(amount);
}

function displayCart() {

    const cart = getCart();

    const container =
        document.getElementById("cartItems");

    const totalElement =
        document.getElementById("cartTotal");

    if (!container) return;

    if (cart.length === 0) {

        container.innerHTML =
            "<p>Your cart is empty.</p>";

        totalElement.textContent =
            formatCurrency(0);

        return;
    }

    let total = 0;

    container.innerHTML = cart.map(
        (product, index) => {

            const subtotal =
                product.price * product.quantity;

            total += subtotal;

            return `
                <div class="cart-item">
                    <h3>${product.name}</h3>

                    <p>
                        ${formatCurrency(product.price)}
                        × ${product.quantity}
                    </p>

                    <p>
                        Subtotal:
                        ${formatCurrency(subtotal)}
                    </p>

                    <button
                        class="btn"
                        onclick="removeFromCart(${index})">
                        Remove
                    </button>
                </div>
            `;
        }
    ).join("");

    totalElement.textContent =
        formatCurrency(total);
}

function removeFromCart(index) {

    let cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);

    displayCart();

    updateCartCount();
}

function displayCheckout() {

    const cart = getCart();

    const container =
        document.getElementById("checkoutItems");

    const totalElement =
        document.getElementById("checkoutTotal");

    if (!container) return;

    let total = 0;

    container.innerHTML = cart.map(product => {

        const subtotal =
            product.price * product.quantity;

        total += subtotal;

        return `
            <p>
                ${product.name}
                × ${product.quantity}
                <strong>
                    ${formatCurrency(subtotal)}
                </strong>
            </p>
        `;

    }).join("");

    totalElement.textContent =
        formatCurrency(total);
}

function toggleMenu() {

    const menu =
        document.getElementById("navLinks");

    if (menu) {
        menu.classList.toggle("active");
    }
}

document.addEventListener(
    "DOMContentLoaded",
    updateCartCount
);
