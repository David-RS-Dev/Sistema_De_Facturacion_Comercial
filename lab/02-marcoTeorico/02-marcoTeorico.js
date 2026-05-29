// 02-marcoTeorico.js

// Esperamos a que toda la página HTML haya cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {

    // Seleccionamos el botón que dice "Calcular"
    let boton = document.getElementById('btn-calc-tema1');

    // Le decimos al botón: "Cuando te hagan clic, ejecuta esta función"
    boton.addEventListener('click', function() {

        // Obtenemos el valor que escribió el usuario en el input de precio
        // parseFloat convierte el texto "800" en número 800
        let precio = parseFloat(document.getElementById('precio-tema1').value);

        // Obtenemos el valor de la tasa de IVA (por defecto viene 15)
        let tasa = parseFloat(document.getElementById('tasa-tema1').value);

        // Validación: si el usuario dejó vacío o escribió letras, avisamos y salimos
        if (isNaN(precio) || isNaN(tasa)) {
            alert("Por favor, ingresa valores numéricos válidos.");
            return; // Detiene el código aquí para no calcular errores
        }

        // Hacemos los cálculos matemáticos
        let iva = precio * (tasa / 100);   // Ej: 800 * 0.15 = 120
        let total = precio + iva;          // Ej: 800 + 120 = 920

        // Seleccionamos la caja donde se mostrarán los resultados
        let cajaResultados = document.getElementById('res-tema1');

        // Escribimos el resultado dentro de esa caja usando HTML básico
        cajaResultados.innerHTML = `
            <table class="resultado-tabla">
                <tbody>
                    <tr><td>Base Imponible:</td><td>$${precio.toFixed(2)}</td></tr>
                    <tr><td>IVA (${tasa}%):</td><td>$${iva.toFixed(2)}</td></tr>
                    <tr><td><strong>Total a pagar:</strong></td><td><strong>$${total.toFixed(2)}</strong></td></tr>
                </tbody>
            </table>
    
            <div style="margin-top: 12px; padding-top: 8px; border-top: 1px dashed #dee2e6; 
            color: #0d6efd; font-size: 0.9rem;">
        💡      <strong>Flujo paso a paso:</strong>
                <br>
                Paso 1 (Calcular IVA): 
                $${precio.toFixed(2)} × ${(tasa / 100).toFixed(2)} = $${iva.toFixed(2)}
                <br>
                Paso 2 (Sumar Total): 
                $${precio.toFixed(2)} + $${iva.toFixed(2)} = $${total.toFixed(2)}
            </div>
            `;
    });

    // ====== CÁLCULO TEMA 2: PRODUCTOS TARIFA 0% ======
    let botonTema2 = document.getElementById('btn-calc-tema2');

    botonTema2.addEventListener('click', function() {
        // Obtener el valor del producto con tarifa 0%
        let precio = parseFloat(document.getElementById('precio-tema2').value);

        // Validación de datos
        if (isNaN(precio) || precio < 0) {
            alert("Por favor, ingresa un precio válido mayor o igual a 0.");
            return;
        }

        // Cálculos matemáticos (El IVA es fijado en 0)
        let tasa = parseFloat(document.getElementById('tasa-tema2').value); // Leerá 0 automáticamente;
        let iva = precio * (tasa / 100); // Dará siempre 0
        let total = precio + iva;

        // Seleccionar la caja de resultados del Tema 2
        let cajaResultados2 = document.getElementById('res-tema2');

        // Inyectar la estructura usando la tabla
        cajaResultados2.innerHTML = `
            <table class="resultado-tabla">
                <tbody>
                    <tr><td>Subtotal (Tarifa 0%):</td><td>$${precio.toFixed(2)}</td></tr>
                    <tr><td>IVA (0%):</td><td>$${iva.toFixed(2)}</td></tr>
                    <tr>
                        <td><strong>Total a pagar:</strong></td>
                        <td><strong>$${total.toFixed(2)}</strong></td>
                    </tr>
                </tbody>
            </table>
            
            <div style="margin-top: 12px; padding-top: 8px; 
            border-top: 1px dashed #dee2e6; color: #0d6efd; font-size: 0.9rem;">
                💡 <strong>Flujo paso a paso (Bienes Esenciales):</strong>
                <br>
                Paso 1 (Calcular IVA): $${precio.toFixed(2)} × 0.00 = $${iva.toFixed(2)}
                <br>
                Paso 2 (Sumar Total): $${precio.toFixed(2)} + $${iva.toFixed(2)} = $${total.toFixed(2)}
                <br>
                <small style="color: #6c757d; display: block; margin-top: 4px;">
                    *Nota: 
                    Aunque el impuesto es $0.00, 
                    este valor se debe reportar obligatoriamente al SRI.
                </small>
            </div>
        `;
    });

    // ====== CÁLCULO TEMA 3: SUBTOTAL ======
    let botonTema3 = document.getElementById('btn-calc-tema3');
    
    botonTema3.addEventListener('click', function() {
        // Obtener valores de la interfaz
        let cant1 = parseInt(document.getElementById('cant-t3-p1').value);
        let precio1 = parseFloat(document.getElementById('precio-t3-p1').value);
        let cant2 = parseInt(document.getElementById('cant-t3-p2').value);
        let precio2 = parseFloat(document.getElementById('precio-t3-p2').value);

        // Validación de datos
        if (isNaN(cant1) || cant1 < 1 || isNaN(precio1) || precio1 < 0 ||
            isNaN(cant2) || cant2 < 1 || isNaN(precio2) || precio2 < 0) {
            alert("Por favor, ingresa cantidades mayores a 0 y precios válidos.");
            return;
        }

        // Aplicación de la fórmula matemática
        let subtotalItem1 = cant1 * precio1;
        let subtotalItem2 = cant2 * precio2;
        let subtotalTotal = subtotalItem1 + subtotalItem2;

        let cajaResultados3 = document.getElementById('res-tema3');

        // Renderizado del resultado
        cajaResultados3.innerHTML = `
            <table class="resultado-tabla">
                <thead>
                    <tr>
                        <th>Concepto / Item</th>
                        <th>Cálculo parcial</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Item 1</td>
                        <td>${cant1} u. × $${precio1.toFixed(2)}</td>
                        <td>$${subtotalItem1.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Item 2</td>
                        <td>${cant2} u. × $${precio2.toFixed(2)}</td>
                        <td>$${subtotalItem2.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td><strong>Subtotal Neto:</strong></td>
                        <td><strong>Suma de items</strong></td>
                        <td><strong>$${subtotalTotal.toFixed(2)}</strong></td>
                    </tr>
                </tbody>
            </table>
            
            <div class="flujo-contenedor">
                💡 <strong>Flujo paso a paso del Subtotal:</strong>
                <br><br>
                <strong>¿Por qué usamos estos campos?</strong> 
                <br>
                Multiplicamos la <em>Cantidad</em> por el <em>Precio Unitario</em> de cada ítem de forma independiente para conocer el costo acumulado de cada producto.
                <br><br>
                <strong>Paso 1 (Item 1):</strong> ${cant1} × $${precio1.toFixed(2)} = $${subtotalItem1.toFixed(2)}
                <br>
                <strong>Paso 2 (Item 2):</strong> ${cant2} × $${precio2.toFixed(2)} = $${subtotalItem2.toFixed(2)}
                <br>
                <strong>Paso 3 (Aplicar Fórmula):</strong> Sumamos los totales individuales obtenidos en los pasos anteriores: 
                $${subtotalItem1.toFixed(2)} + $${subtotalItem2.toFixed(2)} = <strong>$${subtotalTotal.toFixed(2)}</strong>
                
                <small class="flujo-nota">
                    *Nota Educativa: El valor total obtenido ($${subtotalTotal.toFixed(2)}) se conoce como la "Base Imponible". Este número limpio de impuestos será obligatorio para calcular el IVA en el siguiente tema.
                </small>
            </div>
        `;
    });
    
});