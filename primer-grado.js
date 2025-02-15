export class PrimerGradoJuego {
    constructor(volverAlMenu) {
        this.ecuacionContainer = document.getElementById('ecuacion');
        this.opcionesContainer = document.getElementById('opciones');
        this.resultadoContainer = document.getElementById('resultado');
        this.siguienteEcuacionBtn = document.getElementById('siguiente-ecuacion');
        this.contadorEcuaciones = document.getElementById('contador-ecuaciones');
        this.volverMenuBtn = document.getElementById('volver-menu');
        
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

        // Generar ecuación aleatoria x + a = b
        const a = Math.floor(Math.random() * 10);
        const b = Math.floor(Math.random() * 20);
        const valorX = b - a;

        this.ecuacionContainer.textContent = `x + ${a} = ${b}`;
        this.valorCorrecto = valorX;

        // Generar opciones de respuesta
        const opciones = this.generarOpciones(valorX);
        this.mostrarOpciones(opciones);

        // Incrementar contador
        this.contadorTotal++;
        this.contadorEcuaciones.textContent = `Ecuaciones: ${this.contadorTotal}/10`;
    }

    generarOpciones(valorCorrecto) {
        const opciones = [valorCorrecto];
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

        if (respuestaSeleccionada === this.valorCorrecto) {
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