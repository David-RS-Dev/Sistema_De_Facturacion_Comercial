var supabaseUrl = "https://urfkmvfupwmitfjrrwis.supabase.co";

var supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZmttdmZ1cHdtaXRmanJyd2lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MTA1NTEsImV4cCI6MjA5NjA4NjU1MX0.bG6oAUo8Ykx7VGmRgxyI8LWpUpUjkLerXsnncyGTGrU";

var supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", function () {
    iniciarCalculadoraTema1();
    iniciarCalculadoraTema2();
    iniciarCalculadoraTema3();
    iniciarCalculadoraTema4();
    iniciarCalculadoraTema5();
});

function iniciarCalculadoraTema1() {
    var boton = document.getElementById("btn-calc-tema1");
    if (!boton) return;

    boton.addEventListener("click", function () {
        var precio = parseFloat(document.getElementById("precio-tema1").value);
        var tasa = parseFloat(document.getElementById("tasa-tema1").value);

        if (isNaN(precio) || isNaN(tasa)) {
            alert("Por favor, ingresa valores numéricos válidos.");
            return;
        }

        if (tasa <= 0) {
            alert("La tasa de IVA debe ser mayor a 0%.");
            return;
        }

        var iva = precio * (tasa / 100);
        var total = precio + iva;

        document.getElementById("res-tema1").innerHTML =
            '<table class="resultado-tabla">' +
            '<tbody>' +
            '<tr><td>Base Imponible:</td><td>$' + precio.toFixed(2) + '</td></tr>' +
            '<tr><td>IVA (' + tasa + '%):</td><td>$' + iva.toFixed(2) + '</td></tr>' +
            '<tr><td><strong>Total a pagar:</strong></td><td><strong>$' + total.toFixed(2) + '</strong></td></tr>' +
            '</tbody>' +
            '</table>';
    });
}

function iniciarCalculadoraTema2() {
    var boton = document.getElementById("btn-calc-tema2");
    if (!boton) return;

    boton.addEventListener("click", function () {
        var precio = parseFloat(document.getElementById("precio-tema2").value);

        if (isNaN(precio) || precio < 0) {
            alert("Por favor, ingresa un precio válido mayor o igual a 0.");
            return;
        }

        var iva = 0;
        var total = precio;

        document.getElementById("res-tema2").innerHTML =
            '<table class="resultado-tabla">' +
            '<tbody>' +
            '<tr><td>Subtotal (Tarifa 0%):</td><td>$' + precio.toFixed(2) + '</td></tr>' +
            '<tr><td>IVA (0%):</td><td>$' + iva.toFixed(2) + '</td></tr>' +
            '<tr><td><strong>Total a pagar:</strong></td><td><strong>$' + total.toFixed(2) + '</strong></td></tr>' +
            '</tbody>' +
            '</table>';
    });
}

function iniciarCalculadoraTema3() {
    var boton = document.getElementById("btn-calc-tema3");
    if (!boton) return;

    boton.addEventListener("click", function () {
        var cant1 = parseInt(document.getElementById("cant-t3-p1").value);
        var precio1 = parseFloat(document.getElementById("precio-t3-p1").value);
        var cant2 = parseInt(document.getElementById("cant-t3-p2").value);
        var precio2 = parseFloat(document.getElementById("precio-t3-p2").value);

        if (
            isNaN(cant1) || cant1 < 1 ||
            isNaN(precio1) || precio1 < 0 ||
            isNaN(cant2) || cant2 < 1 ||
            isNaN(precio2) || precio2 < 0
        ) {
            alert("Por favor, ingresa cantidades mayores a 0 y precios válidos.");
            return;
        }

        var subtotalItem1 = cant1 * precio1;
        var subtotalItem2 = cant2 * precio2;
        var subtotalTotal = subtotalItem1 + subtotalItem2;

        document.getElementById("res-tema3").innerHTML =
            '<table class="resultado-tabla">' +
            '<thead>' +
            '<tr>' +
            '<th>Concepto / Item</th>' +
            '<th>Cálculo parcial</th>' +
            '<th>Total</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td>Item 1</td>' +
            '<td>' + cant1 + ' u. × $' + precio1.toFixed(2) + '</td>' +
            '<td>$' + subtotalItem1.toFixed(2) + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td>Item 2</td>' +
            '<td>' + cant2 + ' u. × $' + precio2.toFixed(2) + '</td>' +
            '<td>$' + subtotalItem2.toFixed(2) + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td><strong>Subtotal Neto:</strong></td>' +
            '<td><strong>Suma de items</strong></td>' +
            '<td><strong>$' + subtotalTotal.toFixed(2) + '</strong></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>';
    });
}

function iniciarCalculadoraTema4() {
    var boton = document.getElementById("btn-calc-tema4");
    if (!boton) return;

    boton.addEventListener("click", function () {
        var subtotal = parseFloat(document.getElementById("subtotal-tema4").value);
        var tasa = parseFloat(document.getElementById("iva-tema4").value);

        if (isNaN(subtotal) || isNaN(tasa) || subtotal < 0 || tasa < 0) {
            alert("Valores inválidos.");
            return;
        }

        var iva = subtotal * (tasa / 100);

        document.getElementById("res-tema4").innerHTML =
            '<table class="resultado-tabla">' +
            '<tbody>' +
            '<tr><td>Subtotal</td><td>$' + subtotal.toFixed(2) + '</td></tr>' +
            '<tr><td>IVA</td><td>$' + iva.toFixed(2) + '</td></tr>' +
            '</tbody>' +
            '</table>';
    });
}

function iniciarCalculadoraTema5() {
    var boton = document.getElementById("btn-calc-tema5");
    if (!boton) return;

    boton.addEventListener("click", function () {
        var subtotal = parseFloat(document.getElementById("subtotal-t5").value);
        var iva = parseFloat(document.getElementById("iva-t5").value);
        var desc = parseFloat(document.getElementById("desc-t5").value);

        if (isNaN(subtotal) || isNaN(iva) || isNaN(desc)) {
            alert("Valores inválidos.");
            return;
        }

        var total = subtotal + iva - desc;

        document.getElementById("res-tema5").innerHTML =
            '<table class="resultado-tabla">' +
            '<tbody>' +
            '<tr><td>Subtotal</td><td>$' + subtotal.toFixed(2) + '</td></tr>' +
            '<tr><td>IVA</td><td>$' + iva.toFixed(2) + '</td></tr>' +
            '<tr><td>Descuento</td><td>$' + desc.toFixed(2) + '</td></tr>' +
            '<tr><td><strong>Total</strong></td><td><strong>$' + total.toFixed(2) + '</strong></td></tr>' +
            '</tbody>' +
            '</table>';
    });
}

async function ejecutarValidacionFiscal(event) {
    event.preventDefault();

    var nombre = document.getElementById("nombreEncuesta").value.trim();
    var correo = document.getElementById("correoEncuesta").value.trim();

    var respuesta1 = document.querySelector('input[name="p1"]:checked');
    var respuesta2 = document.querySelector('input[name="p2"]:checked');
    var respuesta3 = document.querySelector('input[name="p3"]:checked');
    var respuesta4 = document.querySelector('input[name="p4"]:checked');
    var respuesta5 = document.querySelector('input[name="p5"]:checked');
    var respuesta6 = document.getElementById("opinionEscala").value;

    if (!nombre || !correo) {
        alert("Ingresa nombre y correo.");
        return;
    }

    if (!respuesta1 || !respuesta2 || !respuesta3 || !respuesta4 || !respuesta5 || !respuesta6) {
        alert("Responde todas las preguntas.");
        return;
    }

    var p1 = respuesta1.value;
    var p2 = respuesta2.value;
    var p3 = respuesta3.value;
    var p4 = respuesta4.value;
    var p5 = respuesta5.value;
    var p6 = respuesta6;

    var puntaje = 0;

    if (p1 === "C") puntaje++;
    if (p2 === "B") puntaje++;
    if (p3 === "A") puntaje++;
    if (p4 === "C") puntaje++;
    if (p5 === "D") puntaje++;

    var resultado = await supabaseClient
        .from("respuestas_encuesta")
        .insert([
            {
                nombre: nombre,
                correo: correo,
                pregunta_1: p1,
                pregunta_2: p2,
                pregunta_3: p3,
                pregunta_4: p4,
                pregunta_5: p5,
                pregunta_6: p6
            }
        ]);

    if (resultado.error) {
        console.error(resultado.error);
        alert("Error al guardar las respuestas en Supabase.");
        return;
    }

    document.getElementById("resultadoGlobalTest").innerHTML =
        '<div style="margin-top:16px; padding:16px; border-radius:8px; background:#ecfdf5; border:1px solid #22c55e; color:#14532d;">' +
        '<strong>Respuestas enviadas correctamente.</strong><br>' +
        'Calificación: ' + puntaje + '/5' +
        '</div>';

    alert("Respuestas enviadas correctamente.");
}

window.ejecutarValidacionFiscal = ejecutarValidacionFiscal;