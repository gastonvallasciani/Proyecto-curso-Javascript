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
    };

    calculateCartTotalCost(){
        return this.items.reduce((total, product) => total + product.price, 0);
    }

    // Metodos para manejo de carrito
    showCart(){
        console.log("Carrito de compras:");
        console.table(this.items);
        console.log("El costo total del carrito de compras es: " + this.totalCost + " " + "ARS");
    }

    addProductToCart(){
        let productName = prompt("Ingresar el NOMBRE del producto que desea agregar al carrito de compras");
        const product = products.find(p => p.name === productName);
        if (product) {
            this.items.push(product);
            this.totalCost = this.calculateCartTotalCost();
            this.saveCartInLocalStorage(this.items); // Guardo el carrito en localStorage
        } else {
            alert("El producto ingresado no existe en la base de datos de productos.");
        }
        this.showCart();
    }
    
    removeProductFromCart(){
        let productName = prompt("Ingresar NOMBRE de producto que desea borrar");
        const index = this.items.findIndex(p =>p.name == productName);
        if (index !== -1){
            this.items.splice(index, 1);
            alert("El producto ha sido borrado correctamente");
            this.totalCost = calculateCartTotalCost();
            saveCartInLocalStorage(this.items); // Actualizo el carrito en localStorage
        }
        else{
            alert("El producto no se encontraba en la base de datos");
        }
        showCart();
    }
}

//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Variables
// Productos disponibles para comprar - Vector dummy para hacer pruebas
const product1 = new Product("Producto 1", 10.00);
const product2 = new Product("Producto 2", 20.00);
const product3 = new Product("Producto 3", 30.00);

const products = [product1, product2, product3];  

// Usarios y contrasenias
// El usuario administrador permite modificar la base de datos de productos
const adminLogin = new Login("admin", "1234");
// El usuario cliente permite acceder a la compra
const clientLogin = new Login("client", "1234");
// Carrito de compras
let cart = new Cart(); // Inicializo el carrito desde localStorage
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Funciones
//-------------------------------------------------------------------------------
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
// Simulador: gestión de base de datos de productos + gestión de compra 
do{
    console.log("Menu");
    console.log("1- Loguearse con usuario y contraseña");
    console.log("2- Salir");
    accion = prompt("Ingrese el número de la acción que desea llevar a cabo");

    if(accion == 1){
        let user = prompt("Ingrese el usuario:");
        let password = prompt("Ingrese la contraseña de 4 caracteres:");

        if((user === adminLogin.user) && (password === adminLogin.password)){
            console.log("ingreso de usuario nivel ADMINISTRADOR aceptado");
            do{
                console.log("Menu");
                console.log("1- Ingresar Producto");
                console.log("2- Borrar Producto");
                console.log("3- Mostrar lista de produtos");
                console.log("4- Finalizar");
                accion = prompt("Ingrese el número de la acción que desea llevar a cabo");
                switch(parseInt(accion))
                {
                    case 1:
                        addNewProductToDatabase();
                        break;
                    case 2:
                        removeProductFromDatabase();
                        break;
                    case 3:
                        showDatabaseProducts();
                        break;
                    default:
                        break;
                }
                
            }while(accion != 4);
        }
        else if((user === clientLogin.user) && (password === clientLogin.password))
        {
            console.log("ingreso de usuario nivel CLIENTE aceptado");
            do{
                console.log("Menu");
                console.log("1- Mostrar lista de productos");
                console.log("2- Agregar producto a carrito");
                console.log("3- Borrar producto de carrito");
                console.log("4- Mostrar lista de productos presentes en el carrito");
                console.log("5- Finalizar compra");
                accion = prompt("Ingrese el número de la acción que desea llevar a cabo");
                
                switch(parseInt(accion))
                {
                    case 1:
                        showDatabaseProducts();
                        break;
                    case 2:
                        cart.addProductToCart();
                        break;
                    case 3:
                        cart.removeProductFromCart();
                        break;
                    case 4:
                        cart.showCart();
                        break;
                    case 5:
                        console.log("Gracias por su compra!");
                        cart.showCart();
                        cart.clearCartInLocalStorage();
                        cart.items = []; // Reinicio el carrito en memoria
                        cart.totalCost = 0; // Reinicio el costo del carrito en memoria
                        break;
                }
            }while(accion != 5);
        }
        else
        {
            alert("El usuario o el password ingresado es incorrecto");
        }
    }
    else if(accion == 2){
        alert("Usted ha salido correctamente");
    }
}while(accion != 2); 
//-------------------------------------------------------------------------------