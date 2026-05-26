// 01-facturacion.js
// === ESTADO DE LA APLICACIÓN ===
// Empezamos con el primer producto ya cargado en el arreglo de memoria
let productosParaFacturar = [
    { id: 1, cantidad: 1, descripcion: "", precio: 0.00 }
];

// Usamos este número para que los nuevos productos tengan IDs únicos (2, 3, 4...)
let contadorIds = 1; 

// === GESTIÓN DE LA TABLA (INTERFAZ) ===
function pintarProductos() {
    let cuerpoTabla = document.getElementById("cuerpoTabla");
    if (!cuerpoTabla) return; // Si no está la tabla (ej. en la portada), no hace nada

    cuerpoTabla.innerHTML = ""; // Limpiamos por completo la pantalla para redibujar

    // Recorremos nuestro arreglo global para dibujar fila por fila
    for (let i = 0; i < productosParaFacturar.length; i++) {
        let prod = productosParaFacturar[i];
        let totalFila = prod.cantidad * prod.precio;

        cuerpoTabla.innerHTML += `
            <tr id="fila-${prod.id}">
                <td>
                    <input type="number" id="cantidad-${prod.id}" 
                    value="${prod.cantidad}" 
                    onfocus="this.select()"
                    oninput="actualizarProducto(${prod.id}, 'cantidad', this.value)" 
                    placeholder="0">
                </td>
                <td>
                    <input type="text" 
                    value="${prod.descripcion}"
                    onfocus="this.select()" 
                    oninput="actualizarProducto(${prod.id}, 'descripcion', this.value)" 
                    placeholder="Descripción del producto">
                </td>
                <td>
                    <input type="number" id="precio-${prod.id}" 
                    value="${prod.precio.toFixed(2)}" 
                    onfocus="this.select()"
                    oninput="actualizarProducto(${prod.id}, 'precio', this.value)" 
                    placeholder="0.00">
                </td>
                <td><span id="total-fila-${prod.id}">${totalFila.toFixed(2)}</span></td>
                <td>
                    <button type="button" onclick="eliminarProducto(${prod.id})">ELIMINAR</button>
                </td>
            </tr>
        `;
    }

    // Cada vez que pintamos la tabla, recalculamos los totales generales abajo
    calcularTotal();
}

// === ACCIONES DEL USUARIO ===

function agregarProducto() {
    contadorIds++; // Incrementamos el generador de IDs

    // Creamos el nuevo objeto en blanco
    let nuevoProd = {
        id: contadorIds,
        cantidad: 1,
        descripcion: "",
        precio: 0.00
    };

    // ¡Lo guardamos de forma segura en la memoria RAM!
    productosParaFacturar.push(nuevoProd);

    pintarProductos();
}

function eliminarProducto(idProducto) {
    for (let i = 0; i < productosParaFacturar.length; i++) {
        if (productosParaFacturar[i].id === idProducto) {
            productosParaFacturar.splice(i, 1); 
            break;
        }
    }

    pintarProductos();
}

function actualizarCantidad(idProducto, nuevaCantidad) {
    for (let i = 0; i < productosParaFacturar.length; i++) {
        if (productosParaFacturar[i].id === idProducto) {
            productosParaFacturar[i].cantidad = parseFloat(nuevaCantidad) || 0;
            break;
        }
    }
    calcularTotal()
}

function actualizarDescripcion(idProducto, nuevaDescripcion) {
    for (let i = 0; i < productosParaFacturar.length; i++) {
        if (productosParaFacturar[i].id === idProducto) {
            productosParaFacturar[i].descripcion = nuevaDescripcion;
            break;
        }
    }
    calcularTotal()
}

function actualizarPrecio(idProducto, nuevoPrecio) {
    for (let i = 0; i < productosParaFacturar.length; i++) {
        if (productosParaFacturar[i].id === idProducto) {
            productosParaFacturar[i].precio = parseFloat(nuevoPrecio) || 0;
            break;
        }
    }
    calcularTotal()
}

function actualizarProducto(idProducto, propiedad, valor) {
    if (propiedad === "cantidad") {
        actualizarCantidad(idProducto, valor);
    } else if (propiedad === "descripcion") {
        actualizarDescripcion(idProducto, valor);
    } else if (propiedad === "precio") {
        actualizarPrecio(idProducto, valor);
    }
}

// === LÓGICA DE CÁLCULOS MATEMÁTICOS ===
function calcularTotal() {
    let sumaDeTodosLosSubtotales = 0;

    // Sumamos los totales de cada producto directo desde el arreglo de memoria
    for (let i = 0; i < productosParaFacturar.length; i++) {
        let prod = productosParaFacturar[i];
        let totalDeEstaFila = prod.cantidad * prod.precio;
        
        // Actualizamos el total de la fila en pantalla
        let totalFila = document.getElementById("total-fila-" + prod.id);
        if (totalFila) {
            totalFila.innerHTML = totalDeEstaFila.toFixed(2);
        }

        sumaDeTodosLosSubtotales = sumaDeTodosLosSubtotales + totalDeEstaFila;
    }

    // Cálculos de impuestos locales (IVA 15%)
    let iva = sumaDeTodosLosSubtotales * 0.15;
    let totalFinal = sumaDeTodosLosSubtotales + iva;

    // Pintamos las etiquetas inferiores de la factura
    document.getElementById("subtotal").innerHTML = sumaDeTodosLosSubtotales.toFixed(2);
    document.getElementById("iva").innerHTML = iva.toFixed(2);
    document.getElementById("totalFinal").innerHTML = totalFinal.toFixed(2);
}

// ---- FUNCIÓN PARA IMPRIMIR ----
function imprimirFactura() {
    window.print();
}

// ---- INICIALIZACIÓN ----
// Esto arranca la tabla la primera vez que abres el documento
if (document.getElementById("cuerpoTabla")) {
    pintarProductos();
}