// Base de datos de productos según especificaciones SRI de Ecuador
const baseDatosProductos = [
    { id: "P001", descripcion: "Hospedaje Familiar (Noche) - Actividad Turística", precio: 45.00, aplicaIvaReducido: true },
    { id: "P002", descripcion: "Almuerzo Turístico / Gastronomía Autorizada", precio: 12.50, aplicaIvaReducido: true },
    { id: "P003", descripcion: "Tour Operado Centro Histórico Quito", precio: 25.00, aplicaIvaReducido: true },
    { id: "P004", descripcion: "Bebida Energizante Importada", precio: 3.50, aplicaIvaReducido: false },
    { id: "P005", descripcion: "Souvenir / Artesanía Local", precio: 15.00, aplicaIvaReducido: false }
];

// Matriz de Feriados Nacionales en formato ISO
const feriadosActivos = [
    "2026-05-24", // Batalla de Pichincha
    "2026-08-10", // Primer Grito de Independencia
    "2026-11-02", // Día de los Difuntos
    "2026-11-03"  // Independencia de Cuenca
];

let esFeriadoVigente = false;

// Configuración inicial de la interfaz
document.addEventListener("DOMContentLoaded", () => {
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById("fechaFactura").value = hoy;
    
    renderizarFeriadosAuxiliares();
    evaluarEstadoFiscal();
});

function renderizarFeriadosAuxiliares() {
    const contenedor = document.getElementById("listaFeriadosVisual");
    contenedor.innerHTML = "";
    feriadosActivos.forEach(fecha => {
        const span = document.createElement("span");
        span.className = "tag-fecha";
        span.textContent = fecha;
        contenedor.appendChild(span);
    });
}

function evaluarEstadoFiscal() {
    const fechaSeleccionada = document.getElementById("fechaFactura").value;
    const badge = document.getElementById("badgeFeriado");
    
    if (feriadosActivos.includes(fechaSeleccionada)) {
        esFeriadoVigente = true;
        badge.textContent = "Feriado Activo (Aplica IVA 8% Turístico)";
        badge.className = "badge badge-feriado";
    } else {
        esFeriadoVigente = false;
        badge.textContent = "Día Ordinario (IVA 15% General)";
        badge.className = "badge badge-ordinario";
    }
    calcularTotalesFactura();
}

function agregarProducto() {
    const cuerpoTabla = document.getElementById("cuerpoTabla");
    const uniqueId = Date.now();
    const fila = document.createElement("tr");
    fila.id = `fila-${uniqueId}`;

    let opcionesSelect = `<option value="" data-precio="0" data-turismo="false">-- Seleccione --</option>`;
    baseDatosProductos.forEach(prod => {
        opcionesSelect += `<option value="${prod.id}" data-precio="${prod.precio}" data-turismo="${prod.aplicaIvaReducido}">${prod.descripcion}</option>`;
    });

    fila.innerHTML = `
        <td>
            <input type="number" class="input-cantidad" value="1" min="1" onchange="actualizarLineaFactura('${uniqueId}')">
        </td>
        <td>
            <select class="select-producto" onchange="seleccionarProductoDesdeDb('${uniqueId}')">
                ${opcionesSelect}
            </select>
        </td>
        <td>
            $<span class="precio-unitario">0.00</span>
        </td>
        <td>
            $<span class="total-linea">0.00</span>
        </td>
        <td>
            <button type="button" class="btn-eliminar" onclick="eliminarFila('${uniqueId}')">✕</button>
        </td>
    `;
    cuerpoTabla.appendChild(fila);
}

function seleccionarProductoDesdeDb(idFila) {
    const fila = document.getElementById(`fila-${idFila}`);
    const select = fila.querySelector(".select-producto");
    const opcionSeleccionada = select.options[select.selectedIndex];
    const precio = parseFloat(opcionSeleccionada.getAttribute("data-precio"));
    
    fila.querySelector(".precio-unitario").textContent = precio.toFixed(2);
    actualizarLineaFactura(idFila);
}

function actualizarLineaFactura(idFila) {
    const fila = document.getElementById(`fila-${idFila}`);
    const cantidad = parseInt(fila.querySelector(".input-cantidad").value) || 0;
    const select = fila.querySelector(".select-producto");
    const opcionSeleccionada = select.options[select.selectedIndex];
    const precio = parseFloat(opcionSeleccionada.getAttribute("data-precio")) || 0;
    
    const totalLinea = cantidad * precio;
    fila.querySelector(".total-linea").textContent = totalLinea.toFixed(2);
    
    calcularTotalesFactura();
}

function eliminarFila(idFila) {
    const fila = document.getElementById(`fila-${idFila}`);
    if (fila) fila.remove();
    calcularTotalesFactura();
}

function calcularTotalesFactura() {
    let subtotalGeneral = 0;
    let baseIva15 = 0;
    let baseIva8 = 0;

    const filas = document.querySelectorAll("#cuerpoTabla tr");
    
    filas.forEach(fila => {
        const select = fila.querySelector(".select-producto");
        if (!select) return;
        
        const opcionSeleccionada = select.options[select.selectedIndex];
        
        // Si el usuario no ha seleccionado un producto, saltar esta fila
        if (!opcionSeleccionada || opcionSeleccionada.value === "") return;

        const cantidad = parseInt(fila.querySelector(".input-cantidad").value) || 0;
        const precio = parseFloat(opcionSeleccionada.getAttribute("data-precio")) || 0;
        
        // CORRECCIÓN RADICAL: Forzar la conversión de texto a booleano de forma estricta
        const aplicaIvaReducido = (opcionSeleccionada.getAttribute("data-turismo") === "true");
        
        const totalLinea = cantidad * precio;
        subtotalGeneral += totalLinea;

        // EVALUACIÓN UNITARIA POR PRODUCTO:
        if (aplicaIvaReducido && esFeriadoVigente) {
            // SÓLO si el producto califica para la reducción Y estamos en feriado, va al 8%
            baseIva8 += totalLinea;
        } else {
            // SI EL PRODUCTO NO APLICA (data-turismo="false"), VA DIRECTO AL 15% SIEMPRE.
            // Si el producto aplica pero NO es feriado, también va directo al 15%.
            baseIva15 += totalLinea;
        }
    });

    // Operaciones matemáticas de impuestos
    const valorIva15 = baseIva15 * 0.15;
    const valorIva8 = baseIva8 * 0.08;
    const totalFinal = subtotalGeneral + valorIva15 + valorIva8;

    // Inyección limpia y directa en tus etiquetas HTML
    document.getElementById("subtotal").textContent = subtotalGeneral.toFixed(2);
    document.getElementById("base15").textContent = baseIva15.toFixed(2);
    document.getElementById("iva").textContent = valorIva15.toFixed(2); 
    document.getElementById("base8").textContent = baseIva8.toFixed(2);
    document.getElementById("iva8").textContent = valorIva8.toFixed(2);
    document.getElementById("totalFinal").textContent = totalFinal.toFixed(2);
}





function imprimirFactura() {
    window.print();
}
