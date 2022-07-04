alert ("Bienvenido a Watch Argentina");
// Establecimiento de la función "datosUsuario" utilizando datos desestructurados para saber los datos del comprador y de entrega
const {nombre, apellido, celular, direccion, localidad, codigoPostal} = datosUsuario;

//Creo una función para validar formulario, reemplazando la forma anterior
//en el HTML creé formularios en los que se ingresan los datos en lugar del Prompt que tenía antes
//ver líneas 43 a 67 de ingresar.html
function validarFormulario() {
    let nombre = document.forms["formuNombre"]["nombre"].value;
        nombre == "" && alert("Ingrese un nombre válido")
    
    let apellido = document.forms["formuApellido"]["apellido"].value;
        apellido == "" && alert("Ingrese un apellido válido")
    
    let celular = document.formt ["formuCelular"] ["celular"].value;
        celular == ""&& alert ("ongrese un teléfono móvil válido");
    
    let direccion = document.forms["formuDireccion"]["direccion"].value;
        direccion == "" && alert("Ingrese una dirección válida");
    
    let localidad = document.forms["formuLocalidad"]["localidad"].value;
        localidad == "" && alert("Ingrese una localidad válida");
    
    let codigoPostal = document.forms["formuCodigo"]["suCodigo"].value;
    codigoPostal == "" && alert("Ingrese un código postal válido");
}

//Utilizo Spread para mostrar al usuario los datos ingresados
alert("Los datos de usuario ingresados son"); alert(...datosUsuario);

//Cambio el texto del HTML "Nuestros modelos" utilizando DOM
let tituloIndex = document.getElementsByClassName ("textoPrincipal");
console.log (tituloIndex);
tituloIndex.innerText = "Los mejores modelos para que elijas";
console.log (tituloIndex);

//contador del carrito de compras
const contadorCarrito = document.querySelector('#contadorCarrito');
const renderizarCantidad = () => {
    contadorCarrito.innerText = carrito.length
}

//utilización del operador lógico  OR
//recuperación del carrito de compras almacenado en Local Storage
const carritoLocal = JSON.parse(localStorage.getItem ('carrito')) || [];

//carrito de compras
const carrito = [];

let total = 0;


function renderizarCarrito() {
    let tienda = document.getElementById('tienda');
    let filtro = document.getElementById('filtrarProductos');
    filtro.innerHTML = `
    <div class = container row col-12>
        <button class="filterbutton" onclick="filtroPrecio()">Filtrar menor a $11.000</button> 
    </div>
    `
    baseDeDatos.forEach ((e) => {
        
        let productoHTML = `
    
    <div class="card col-xl-4 col-lg-4 col-md-6 col-sm-12" style="width: 18rem;">
        <img src="${e.imagen}" class="card-img-top" alt="Card image cap">
        <div data-aos="flip-left"></div> 
        <div class="card-body">
            <h5 class="card-title">${e.descripcion}</h5>
            <p class="card-text">${e.cardText}</p>
            <p>$ ${e.precio}</p>
            <a href="#" class="btnCard"  onClick="agregarProductos(${e.id})">¡Lo merezco!</a>
        </div>
    </div>
`
tienda.innerHTML += productoHTML
        });
}

renderizarCarrito ();

function agregarProductos (id) {

    let producto = baseDeDatos.find(producto => producto.id == id);
    
    let productoEnCarrito = carrito.find(producto => producto.id == id);

    if(productoEnCarrito){
        productoEnCarrito.cantidad ++;
    }else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
    renderizarCantidad ();
    calcularTotal ();
}

function actualizarCarrito () {

    let carritoHTML = document.getElementById('carrito');

    html = '';

    carrito.forEach((producto, id)=>{
        
        html += `
        <div class="card col-xl-4 col-lg-4 col-md-6 col-sm-12" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="Card image cap">
        <div data-aos="flip-left"></div> 
        <div class="card-body">
            <h5 class="card-title">${producto.descripcion}</h5>
            <p>$ ${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <button class="btn btn-danger" onClick="eliminarProducto(${id})">Eliminar</button>
        </div>
    </div>
        `
    })

    carritoHTML.innerHTML = html;

    calcularTotal();

}
/* animación y mensaje al agregar un producto al carrito
Swal.fire({
    title: 'Custom width, padding, color, background.',
    width: 600,
    padding: '3em',
    color: '#716add',
    background: '#fff url(/images/trees.png)',
    backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
    `
})
let timerInterval
Swal.fire({
    html: 'Su producto fue agregado exitosamente',
    timer: 2000,
    timerProgressBar: false,
    didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
    }, 100)
    },
    willClose: () => {
    clearInterval(timerInterval)
    }
*/

//Muestro un mensaje aleatorio introduciendo
// un NODO (un párrafo "p" o un alert según si el cliente compró o no)
// mediante DOM y un array de mensajes
const mensajeDespedida = [
    "Nos vemos en tu próxima compra",
    "Hasta la vista!",
    "Te esperamos por nuestra web cuando quieras!",
    "Gracias por elejirnos",
]

//función para calcular el total a pagar y agregado de texto "p" en el div "total" en HTML si el cliente compró
function calcularTotal(){
    let total = 0;
    carrito.forEach((producto) => {
        
        total += producto.precio * producto.cantidad;
    });
    alert("El total a pagar es de $" + total);
    return total;
}
    if (total > 0) {
    let mensajeAleatorio = mensajeDespedida[Math.floor(Math.random()*mensajeDespedida.length)];
    let mensaje = document.createElement ("div");
    mensaje.innerHTML = `<p> ${mensajeAleatorio} </p>`;
    document.main.appendChild (mensaje);
    } else {
        alert ("No te vayas sin tu compra online");
    }

//función para eliminar un producto del carrito
const eliminarProducto = (id)=> {

    carrito[id].cantidad--;
    carrito[id].cantidad == 0 &&  carrito.splice(id, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// función para filtrar por precio  y mostrarlo por CONSOLE.LOG
function filtroPrecio(){

    let bd = baseDeDatos.filter(producto => producto.precio < 11000);
    console.log(bd);
}

// vaciado total del carrito de compras
const vaciarCarrito = () => {
    carrito.length = 0

    localStorage.setItem('carrito', JSON.stringify(carrito));

    actualizarCarrito();
    renderizarCantidad();
    calcularTotal();
}

const btnVaciar = document.getElementById('vaciarCarrito');
btnVaciar.addEventListener('click', vaciarCarrito); 


//función para un pedido
function pedido() {
    this.cliente = undefined;
    this.items = [];
    this.total = 0;
    let fecha = new Date();
    fecha = fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear();
    this.fecha = fecha;
}

//Event listener - incorporo el llamado tema oscuro mediante event listener
//1. Antes de hacer algo con el DOM me aseguro de que la página haya cargado, para lo cual
//incluyo estas líneas de código. 

//añadí en HTML el botón

// establezco la función themeSelector que asigna emojis según el tema de pantalla y utilizo querySelector y 
// añado al DOM como aprendimos, mostrando uno u otro según selección del usuario

window.addEventListener('load', () => {
    //aqui corroboro que no exista el tema oscuro en el disco local
    // y si existe, que esté en modo light
    !localStorage.getItem('theme') && localStorage.setItem('theme', 'light');
    
    //selecciono los emojis con querySelector
    const themeSelector = document.querySelector('#themeSelector');
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        themeSelector.textContent = '☀️';
    } else {
        themeSelector.textContent = '🌙️';
    }
    //utilizo event listener para el evento de click sobre el botón
    //Si el modo oscuro está activado la etiqueta body tendrá el tema oscuro
    //Utilizo esta clase para apuntar a los elementos en CSS y aplicarles el tema oscuro
    themeSelector.addEventListener('click', () => {
        if (localStorage.getItem('theme') === 'light') {
            localStorage.setItem('theme', 'dark');
            themeSelector.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeSelector.textContent = '🌙️';
        }
        //cambio la pantalla a dark
        document.body.classList.toggle('dark');
    });
});
//Buscador de productos en la página index
const buscador = document.querySelector("#buscador");
const btnBuscar = document.querySelector("#btnBuscar");
const resultadoBusqueda = document.querySelector("#resultadoBusqueda");

const buscarProducto = () => {
    resultadoBusqueda.innerHTML = '';
    const textoBusqueda = buscador.value.toloWerCase();
    for (let productoBuscado of baseDeDatos) {
        let descripcion = productoBuscado.descripcion.toloWerCase();
        if (descripcion.indexOf (textoBusqueda) !== -1) {
            resultadoBusqueda.innerHTML += `
            <div class="card col-xl-4 col-lg-4 col-md-6 col-sm-12" style="width: 18rem;">
            <img src="${productoBuscado.imagen}" class="card-img-top" alt="Card image cap">
            <div data-aos="flip-left"></div> 
                <div class="card-body">
                    <h5 class="card-title">${productoBuscado.descripcion}</h5>
                    <p class="card-text">${productoBuscado.cardText}</p>
                    <p>$ ${productoBuscado.precio}</p>
                </div>
            </div>
            `
        }    
    }
    if(resultadoBusqueda.innerHTML === '') {
        resultadoBusqueda.innerHTML `
        <h3>Producto no encontrado...</h3>
        `
    } 
}

btnBuscar.addEventListener('click', buscarProducto); 

//limpiar formulario de envío de datos del loguin de usuario
function limpiarFormulario() {
    let nombre = document.getElementsByClassName("formuNombre"); nombre.innerText = "";
    let apellido = document.getElementsByClassName("formuApellido"); apellido.innerText = "";
    let celular = document.getElementsByClassName("formuCelular"); celular.innerText = "";
    let direccion = document.getElementsByClassName("formuDireccion"); direccion.innerText = "";
    let codigoPostal = document.getElementsByClassName("formuCodigo"); codigoPostal.innerText = "";
    let localidad = document.getElementsByClassName("formuLocalidad"); localidad.innerText = "";
}
//enviar datos del formulario de loguin
$(document).ready(function(){
    $('botonEnviar').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        validarFormulario;

        return false;
    });
});
