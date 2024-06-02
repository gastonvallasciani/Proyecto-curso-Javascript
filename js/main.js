// E-commerce

// Variables
// Productos disponibles para comprar - Vector dummy para hacer pruebas
const products = [
    {id: 1, name: "Producto 1", price: 10.00},
    {id: 2, name: "Producto 2", price: 20.00},
    {id: 3, name: "Producto 3", price: 30.00},
];    
//let products = [];    

// Carrito de compras
let cart = [];
let costoTotalCarrito = 0;

// Usarios y contrasenias
// El usuario administrador permite modificar la base de datos de productos
let userAdmin = "admin";
let passwordAdmin = "1234";
// El usuario cliente permite acceder a la compra
let userClient = "client";
let passwordClient = "1234";

// Funciones
// Funciones para manejo de base de datos de productos
const showDatabaseProducts = () => {
    console.log("Base de datos de productos:")
    console.table(products);
}

const addNewProductToDatabase = (id, name, price) => {
    const product = products.find(p =>p.id === id);
    if(product){
        alert("El producto ya ha sido dado de alta en al base de datos")
    }
    else{
        products.push({ id: parseInt(id, 10), name: name, price: parseInt(price, 10) });
        alert("El producto ha sido dado de alta correctamente");
    }
    showDatabaseProducts();
}

const removeProductFromDatabase = (name) => {
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

// Funciones para manejo de carrito
const showCart = () => {
    console.log("Carrito de compras:")
    console.table(cart);
    console.log("El costo total del carrito de compras es: " + costoTotalCarrito + " " + "ARS");
}

const addProductToCart = (productName) => {
    const product = products.find(p => p.name === productName);
    if (product) {
        cart.push(product);
        costoTotalCarrito = calculateCartTotalCost();
    } else {
        alert("El producto ingresado no existe en la base de datos de productos.");
    }
    showCart();
}

const removeProductFromCart = (productName) => {
    const index = cart.findIndex(p =>p.name == productName);
    if (index !== -1){
        cart.splice(index, 1);
        alert("El producto ha sido borrado correctamente");
        costoTotalCarrito = calculateCartTotalCost();
    }
    else{
        alert("El producto no se encontraba en la base de datos");
    }
    showCart();
}

// Funciones de calculo
const calculateCartTotalCost = () => {
    return cart.reduce((total, product) => total + product.price, 0);
}

// Simulador: gestión de base de datos de productos + gestión de compra 
do{
    console.log("Menu");
    console.log("1- Loguearse con usuario y contraseña");
    console.log("2- Salir");
    accion = prompt("Ingrese el número de la acción que desea llevar a cabo");

    if(accion == 1){
        let user = prompt("Ingrese el usuario:");
        let password = prompt("Ingrese la contraseña de 4 caracteres:");

        if((user === userAdmin) && (password === passwordAdmin)){
            console.log("ingreso de usuario nivel ADMINISTRADOR aceptado");
            do{
                console.log("Menu");
                console.log("1- Ingresar Producto");
                console.log("2- Borrar Producto");
                console.log("3- Mostrar lista de produtos");
                console.log("4- Finalizar");
                accion = prompt("Ingrese el número de la acción que desea llevar a cabo");

                if(accion == 1){
                    id = prompt("Ingresar ID de producto");
                    nombre = prompt("Ingresar NOMBRE de producto");
                    precio = prompt("Ingresar PRECIO de producto");
                    addNewProductToDatabase(id, nombre, precio);
                }
                else if(accion == 2){
                    nombre = prompt("Ingresar NOMBRE de producto que desea borrar");
                    removeProductFromDatabase(nombre);
                }
                else if(accion == 3){
                    showDatabaseProducts();
                }
            }while(accion != 4);
        }
        else if((user === userClient) && (password === passwordClient))
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
                
                if(accion == 1){
                    showDatabaseProducts();
                }
                if(accion == 2){
                    nombre = prompt("Ingresar el NOMBRE del producto que desea agregar al carrito de compras");
                    addProductToCart(nombre);
                }
                else if(accion == 3){
                    nombre = prompt("Ingresar NOMBRE de producto que desea borrar");
                    removeProductFromCart(nombre);
                }
                else if(accion == 4){
                    showCart();
                }
                else if(accion == 5){
                    console.log("Gracias por su compra!");
                    showCart();
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

