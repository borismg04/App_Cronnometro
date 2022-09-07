import style from "./style.js";

class contenedorDigitos extends HTMLElement {
  constructor(){
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `<style>${style}</style>`+'<slot></slot>';
    this.contador = 0;
    this.actualizarTiempo = this.actualizarTiempo.bind(this);
  }

  connectedCallback(){
    // setInterval(() => {
    //   this.contador++;
    //   this.actualizarTiempo();
    // }, 10);
    document.body.addEventListener('actualizarTiempo', this.actualizarTiempo);
  };

  disconnectedCallback(){
    document.body.removeEventListener('actualizarTiempo', this.actualizarTiempo);
  }

  actualizarTiempo(event){
    let tiempo= this.formatearTiempo(event.detail.contador);

    this.querySelector("#decenasHoras").numero = Math.floor(tiempo.horas / 10);
    this.querySelector("#horas").numero = Math.floor(tiempo.horas % 10);

    this.querySelector("#decenasMinutos").numero = Math.floor(tiempo.minutos / 10);
    this.querySelector("#minutos").numero = Math.floor(tiempo.minutos % 10);
    
    this.querySelector("#decenasSegundos").numero = Math.floor(tiempo.segundos / 10);
    this.querySelector("#segundos").numero = Math.floor(tiempo.segundos % 10);
    
    this.querySelector("#decenasCentesimas").numero = tiempo.decimas;
    this.querySelector("#centesimas").numero = tiempo.centesimas;
  };
  
  formatearTiempo(contador){
    let horas , minutos, segundos , decimas , centesimas;

    centesimas = contador % 10;

    decimas = Math.floor((contador % 100) / 10);

    segundos = Math.floor((contador / 100) % 60);

    minutos = Math.floor(contador / 100 / 60);

    horas = Math.floor(contador / 100 / 3600);

    return {
      horas,
      minutos,
      segundos,
      decimas,
      centesimas
    }
  };
}

export default contenedorDigitos;