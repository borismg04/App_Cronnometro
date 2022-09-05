import style from "./style.js";

class contenedorDigitos extends HTMLElement {
  constructor(){
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `<style>${style}</style>`+`<slot></slot>`;
  }
}

export default contenedorDigitos;