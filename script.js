import { PrimerGradoJuego } from './primer-grado.js';
import { SegundoGradoJuego } from './segundo-grado.js';

class JuegoEcuaciones {
  constructor() {
    this.menuPrincipal = document.getElementById('menu-principal');
    this.juegoPrimerGrado = document.getElementById('juego-primer-grado');
    this.juegoSegundoGrado = document.getElementById('juego-segundo-grado');
    
    this.btnPrimerGrado = document.getElementById('btn-primer-grado');
    this.btnSegundoGrado = document.getElementById('btn-segundo-grado');
    
    this.primerGradoJuego = null;
    this.segundoGradoJuego = null;
    
    this.inicializarEventos();
  }
  
  inicializarEventos() {
    this.btnPrimerGrado.addEventListener('click', () => this.mostrarJuegoPrimerGrado());
    this.btnSegundoGrado.addEventListener('click', () => this.mostrarJuegoSegundoGrado());
  }
  
  mostrarJuegoPrimerGrado() {
    this.menuPrincipal.style.display = 'none';
    this.juegoPrimerGrado.style.display = 'block';
    
    if (!this.primerGradoJuego) {
      this.primerGradoJuego = new PrimerGradoJuego(
        () => this.volverAlMenu('primer-grado')
      );
    }
  }
  
  mostrarJuegoSegundoGrado() {
    this.menuPrincipal.style.display = 'none';
    this.juegoSegundoGrado.style.display = 'block';
    
    if (!this.segundoGradoJuego) {
      this.segundoGradoJuego = new SegundoGradoJuego(
        () => this.volverAlMenu('segundo-grado')
      );
    }
  }
  
  volverAlMenu(tipo) {
    if (tipo === 'primer-grado') {
      this.juegoPrimerGrado.style.display = 'none';
    } else {
      this.juegoSegundoGrado.style.display = 'none';
    }
    
    this.menuPrincipal.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new JuegoEcuaciones();
});