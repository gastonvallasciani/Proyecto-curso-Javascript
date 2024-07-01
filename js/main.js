//-------------------------------------------------------------------------------
// E-commerce
// Clases
class Product{
    static id = 0;
    constructor(name, price){
        this.name = name;
        this.price = price;
        this.id = Product.id++;
    }
}

class Login{
    static id = 0;
    constructor(user, password){
        this.user = user;
        this.password = password;
        this.id = Login.id++;
    }
}
//-------------------------------------------------------------------------------
class Cart{
    constructor(){
        this.items = this.getCartFromLocalStorage();
        this.totalCost = this.calculateCartTotalCost();
        this.updateCartUI();
    }

    // Metodos para gestion en localstorage
    // Metodo para guardar el carrito en localStorage
    saveCartInLocalStorage(){
        let cartJSON = JSON.stringify(this.items);
        localStorage.setItem('cart', cartJSON);
    };

    // Metodo para recuperar el carrito de localStorage
    getCartFromLocalStorage(){
        let cartJSON = localStorage.getItem('cart');
        return cartJSON ? JSON.parse(cartJSON) : [];
    };

    // Metodo para borrar el carrito
    clearCartInLocalStorage(){
        localStorage.removeItem('cart');
        this.items = [];
        this.totalCost = 0;
    };

    calculateCartTotalCost(){
        return this.items.reduce((total, product) => total + product.price, 0);
    }
    calculateCartTotalItems(){
        document.getElementById('cart-count').innerText = this.items.length; 
    }

    updateCartUI(){
        let cartContainer = document.getElementById("cartHTML");
        cartContainer.innerHTML = "";
        this.items.forEach((product, index) => {
            let productElement = document.createElement("div");
            productElement.className = "cart-product";
            productElement.innerHTML = `<h3>${product.name}</h3>
                                        <h4>${product.price} ARS</h4>
                                        <button onclick="cart.removeProductFromCart('${product.id}')">Remove</button>`;
            cartContainer.appendChild(productElement);
        });

           // Update total cost in the UI
           let totalCostHTML = document.getElementById("totalCostHTML");
           if (totalCostHTML) {
               totalCostHTML.innerHTML = `<span>Costo total: ${this.calculateCartTotalCost()} ARS</span>`;
           }
           else{ alert("csto total no existe");}

           // update items count
           this.calculateCartTotalItems();
    }

    // Metodos para manejo de carrito
    showCart(){
        console.log("Carrito de compras:");
        console.table(this.items);
        console.log("El costo total del carrito de compras es: " + this.totalCost + " " + "ARS");
        this.updateCartUI();
    }

    addProductToCart(productName){
        const product = products.find(p => p.name === productName);
        if (product) {
            this.items.push(product);
            this.totalCost = this.calculateCartTotalCost();
            this.saveCartInLocalStorage(); // Guardo el carrito en localStorage
        } else {
            alert("El producto ingresado no existe en la base de datos de productos.");
        }
        this.showCart();
    }

    removeProductFromCart(productId){
        const index = this.items.findIndex(p =>p.id == productId);
        if (index !== -1){
            this.items.splice(index, 1);
            this.totalCost = this.calculateCartTotalCost();
            this.saveCartInLocalStorage(); // Actualizo el carrito en localStorage
        }
        else{
            alert("El producto no se encontraba en la base de datos");
        }
        this.showCart();
    } 
    
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Variables
// Productos disponibles para comprar - Vector dummy para hacer pruebas
const product1 = new Product("Producto 1", 10.00);
const product2 = new Product("Producto 2", 20.00);
const product3 = new Product("Producto 3", 30.00);
const product4 = new Product("Producto 4", 30.00);

const products = [product1, product2, product3, product4];  

// Carrito de compras
let cart = new Cart(); // Inicializo el carrito desde localStorage
//-------------------------------------------------------------------------------
// Generacion dinamica de muestra de productos en el html
let prod = document.getElementById("productsHTML");
products.forEach(products => {
    let contenedor = document.createElement("div");
    contenedor.className = "card";
    contenedor.innerHTML = `<h3>${products.name}</h3>
                            <h4>Precio: ${products.price} </h4>
                            <button id="add-to-cart-button-${products.id}"> Agregar al carrito </button>`
                            prod.appendChild(contenedor);
})
//-------------------------------------------------------------------------------
// Eventos
// Funcion para manejar los eventos de click para los botones que se generaron de forma dinamica
products.forEach(products => {
    let button = document.getElementById(`add-to-cart-button-${products.id}`);
    button.onclick = () => {
        cart.addProductToCart(`${products.name}`);
    }
});

let endPurchaseButton = document.getElementById("endPurchase");
endPurchaseButton.onclick = () => {
    cart.clearCartInLocalStorage();
    cart.getCartFromLocalStorage();
    cart.updateCartUI();
}
//-------------------------------------------------------------------------------
// Funciones
// Funciones para manejo de base de datos de productos
const showDatabaseProducts = () => {
    console.log("Base de datos de productos:");
    console.table(products);
}
//-------------------------------------------------------------------------------
const addNewProductToDatabase = () => {
    let name = prompt("Ingresar NOMBRE de producto");
    let price = prompt("Ingresar PRECIO de producto");
    const product = products.find(p =>p.name === name);
    if(product){
        alert("El producto ya ha sido dado de alta en al base de datos");
    }
    else{
        const newProduct = new Product(name, price);
        products.push(newProduct);
        alert("El producto ha sido dado de alta correctamente");
    }
    showDatabaseProducts();
}
//-------------------------------------------------------------------------------
const removeProductFromDatabase = () => {
    let name = prompt("Ingresar NOMBRE de producto que desea borrar");
    const index = products.findIndex(p =>p.name == name);
    if (index !== -1){
        products.splice(index, 1);
        alert("El producto ha sido borrado correctamente");
    }
    else{
        alert("El producto no se encontraba en la base de datos");
    }
    showDatabaseProducts();
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------