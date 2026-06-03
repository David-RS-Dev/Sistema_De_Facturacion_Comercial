// 02-evaluacion.js - Motor de Evaluación Corporativo y Persistencia en Supabase
(function() {
    "use strict";

    const inicializarTest = () => {
        const btnCalificar = document.getElementById('btnCalificarTest');
        if (!btnCalificar) return;

        // Escuchador de eventos asíncrono para manejar Supabase legalmente
        btnCalificar.addEventListener('click', async function(evento) {
            evento.preventDefault();

            // Matriz analítica de respuestas (SRI Ecuador)
            const soluciones = {
                p1: { respuesta: 'C', texto: 'El Servicio de Rentas Internas (SRI) es la entidad encargada de recaudar y administrar tributos.' },
                p2: { respuesta: 'B', texto: 'La tarifa 0% aplica estrictamente a bienes esenciales de primera necesidad o estratégicos.' },
                p3: { respuesta: 'A', texto: 'El subtotal equivale de forma pura al costo base de la compra antes de impuestos.' },
                p4: { respuesta: 'C', texto: 'El comercio es agente de percepción: cobra el tributo al cliente y tiene la obligación de declararlo al SRI.' },
                p5: { respuesta: 'D', texto: 'El total de la factura consolida la operación aritmética final neta de la transacción.' }
            };

            let aciertos = 0;
            const totalPreguntas = Object.keys(soluciones).length;

            // Captura de datos del DOM en el instante del clic
            const r1 = document.querySelector('input[name="p1"]:checked');
            const r2 = document.querySelector('input[name="p2"]:checked');
            const r3 = document.querySelector('input[name="p3"]:checked');
            const r4 = document.querySelector('input[name="p4"]:checked');
            const r5 = document.querySelector('input[name="p5"]:checked');
            
            const opinionEscalaSel = document.getElementById('opinionEscala');
            const opinionComentariosSel = document.getElementById('opinionComentarios');
            
            const valorEscala = opinionEscalaSel ? opinionEscalaSel.value : '';
            const comentarioTexto = opinionComentariosSel ? opinionComentariosSel.value : '';

            // Procesamiento local de las tarjetas evaluativas (1 a 5) utilizando clases CSS
            for (let clave in soluciones) {
                const preguntaBloque = document.getElementById(`bloque-${clave}`);
                const retroalimentacion = document.getElementById(`retro-${clave}`);
                const seleccion = document.querySelector(`input[name="${clave}"]:checked`);

                if (!preguntaBloque || !retroalimentacion) continue;

                preguntaBloque.className = "pregunta-tarjeta";
                retroalimentacion.className = "retro-bloque";

                if (!seleccion) {
                    preguntaBloque.classList.add('tarjeta-advertencia');
                    retroalimentacion.classList.add('retro-advertencia');
                    retroalimentacion.innerHTML = `Sin responder. La opción correcta es la ${soluciones[clave].respuesta}. ${soluciones[clave].texto}`;
                } else if (seleccion.value === soluciones[clave].respuesta) {
                    aciertos++;
                    preguntaBloque.classList.add('tarjeta-correcto');
                    retroalimentacion.classList.add('retro-correcto');
                    retroalimentacion.innerHTML = `Correcto. ${soluciones[clave].texto}`;
                } else {
                    preguntaBloque.classList.add('tarjeta-incorrecto');
                    retroalimentacion.classList.add('retro-incorrecto');
                    retroalimentacion.innerHTML = `Incorrecto. Seleccionó la ${seleccion.value}. La opción correcta es la ${soluciones[clave].respuesta}. ${soluciones[clave].texto}`;
                }
            }

            // Procesamiento estético de la Pregunta 6 (Opinión - No calificable)
            const bloqueP6 = document.getElementById('bloque-p6');
            const retroP6 = document.getElementById('retro-p6');
            if (bloqueP6 && retroP6) {
                bloqueP6.className = "pregunta-tarjeta tarjeta-opinion";
                retroP6.className = "retro-bloque retro-opinion";
                retroP6.innerHTML = `Procesando envío de datos a la nube...`;
            }

            // Renderizado del Tablero Consolidado de Resultados (KPI Global)
            const panelGlobal = document.getElementById('resultadoGlobalTest');
            const porcentaje = (aciertos / totalPreguntas) * 100;
            
            if (panelGlobal) {
                panelGlobal.className = "panel-kpi-global";
                if (porcentaje >= 70) {
                    panelGlobal.classList.add('panel-aprobado');
                    panelGlobal.innerHTML = `<div style="color: #14532d;"><strong>Evaluación Aprobada</strong><br>Rendimiento: <strong>${aciertos} / ${totalPreguntas}</strong> aciertos (${porcentaje}%). Guardando en base de datos...</div>`;
                } else {
                    panelGlobal.classList.add('panel-reprobado');
                    panelGlobal.innerHTML = `<div style="color: #7a1515;"><strong>Evaluación No Aprobada</strong><br>Rendimiento: <strong>${aciertos} / ${totalPreguntas}</strong> aciertos (${porcentaje}%). Guardando en base de datos...</div>`;
                }
                panelGlobal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            // Enlace asíncrono seguro con Supabase sin congelar el hilo principal
            try {
                const nombreUsuario = document.getElementById('nombreCliente') ? document.getElementById('nombreCliente').value : 'Usuario Simulador';
                const correoUsuario = document.getElementById('emailCliente') ? document.getElementById('emailCliente').value : 'anonimo@simulador.com';

                const { error } = await supabase
                    .from('respuestas_encuesta')
                    .insert([
                        {
                            nombre: nombreUsuario,
                            correo: correoUsuario,
                            pregunta_1: r1 ? r1.value : 'N/A',
                            pregunta_2: r2 ? r2.value : 'N/A',
                            pregunta_3: r3 ? r3.value : 'N/A',
                            pregunta_4: r4 ? r4.value : 'N/A',
                            pregunta_5: r5 ? r5.value : 'N/A',
                            pregunta_6: `Valoración: ${valorEscala} | Comentario: ${comentarioTexto}`
                        }
                    ]);

                if (error) {
                    console.error("Error en persistencia Supabase:", error);
                    if (retroP6) retroP6.innerHTML = `Error de red: Los resultados se calcularon localmente pero no se pudieron guardar en la base de datos.`;
                } else {
                    if (retroP6) retroP6.innerHTML = `Sincronización exitosa: Respuestas almacenadas correctamente en Supabase.`;
                    alert('Respuestas enviadas y almacenadas correctamente en Supabase.');
                }
            } catch (errSupabase) {
                console.error("La instancia global de Supabase falló al inicializar:", errSupabase);
                if (retroP6) retroP6.innerHTML = `Error crítico: Compruebe la conexión de Supabase en su proyecto.`;
            }
        });
    };

    // Inicialización elástica e inmune para el DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarTest);
    } else {
        inicializarTest();
    }
})();
