export class SegundoGradoJuego {
    constructor(volverAlMenu) {
        this.ecuacionContainer = document.getElementById('ecuacion-segundo');
        this.opcionesContainer = document.getElementById('opciones-segundo');
        this.resultadoContainer = document.getElementById('resultado-segundo');
        this.siguienteEcuacionBtn = document.getElementById('siguiente-ecuacion-segundo');
        this.contadorEcuaciones = document.getElementById('contador-ecuaciones-segundo');
        this.volverMenuBtn = document.getElementById('volver-menu-segundo');
        
        this.contadorTotal = 0;
        this.generarEcuacion();
        
        this.siguienteEcuacionBtn.addEventListener('click', () => this.generarEcuacion());
        this.volverMenuBtn.addEventListener('click', volverAlMenu);
    }

    generarEcuacion() {
        // Límite de 10 ecuaciones
        if (this.contadorTotal >= 10) {
            this.mostrarMensajeFinal();
            return;
        }

        // Reiniciar interfaz
        this.resultadoContainer.innerHTML = '';
        this.siguienteEcuacionBtn.style.display = 'none';

        // Generar ecuación de segundo grado: ax² + bx + c = 0
        const a = Math.floor(Math.random() * 5) + 1; // a > 0
        const b = Math.floor(Math.random() * 10);
        const c = Math.floor(Math.random() * 20);

        // Calcular las raíces usando la fórmula cuadrática
        const discriminante = b * b - 4 * a * c;
        
        // Nos aseguraremos de que tenga soluciones reales
        let valorX1, valorX2;
        if (discriminante >= 0) {
            valorX1 = Math.floor((-b + Math.sqrt(discriminante)) / (2 * a));
            valorX2 = Math.floor((-b - Math.sqrt(discriminante)) / (2 * a));
        } else {
            // Si no hay soluciones reales, generamos valores aleatorios
            valorX1 = Math.floor(Math.random() * 10);
            valorX2 = Math.floor(Math.random() * 10);
        }

        this.ecuacionContainer.textContent = `${a}x² + ${b}x + ${c} = 0`;
        this.valoresCorrectos = [valorX1, valorX2];

        // Generar opciones de respuesta
        const opciones = this.generarOpciones(this.valoresCorrectos);
        this.mostrarOpciones(opciones);

        // Incrementar contador
        this.contadorTotal++;
        this.contadorEcuaciones.textContent = `Ecuaciones: ${this.contadorTotal}/10`;
    }

    generarOpciones(valoresCorrectos) {
        const opciones = [...valoresCorrectos];
        while (opciones.length < 4) {
            const opcionAleatoria = Math.floor(Math.random() * 20);
            if (!opciones.includes(opcionAleatoria)) {
                opciones.push(opcionAleatoria);
            }
        }
        return this.mezclarArray(opciones);
    }

    mezclarArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    mostrarOpciones(opciones) {
        this.opcionesContainer.innerHTML = '';
        opciones.forEach(opcion => {
            const boton = document.createElement('button');
            boton.textContent = opcion;
            boton.classList.add('opcion');
            boton.addEventListener('click', () => this.verificarRespuesta(opcion));
            this.opcionesContainer.appendChild(boton);
        });
    }

    verificarRespuesta(respuestaSeleccionada) {
        this.resultadoContainer.innerHTML = '';
        const mensaje = document.createElement('p');

        if (this.valoresCorrectos.includes(respuestaSeleccionada)) {
            mensaje.textContent = 'EXCELENTE';
            mensaje.classList.add('correcto');
            this.siguienteEcuacionBtn.style.display = 'block';
        } else {
            mensaje.textContent = 'INTENTALO DE NUEVO';
            mensaje.classList.add('incorrecto');
        }

        this.resultadoContainer.appendChild(mensaje);
    }

    mostrarMensajeFinal() {
        this.ecuacionContainer.textContent = 'JUEGO TERMINADO';
        this.opcionesContainer.innerHTML = '';
        this.resultadoContainer.innerHTML = '<p class="correcto">¡Has completado todas las ecuaciones!</p>';
        this.siguienteEcuacionBtn.style.display = 'none';
    }
}