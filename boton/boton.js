import style from "./style.js";

class Boton extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
    this.elementHtml = document.createElement("button");

    shadowRoot.innerHTML=`<style>${style}</style>`;
    shadowRoot.appendChild(this.elementHtml);
  }

  connectedCallback() {
    this.elementHtml.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();

      this.dispatchEvent(
        new CustomEvent("customClick", {
          detail: {
            titulo: this.titulo,
          },
          bubbles: true,
          composed: true,
        }));
    });
  }

  get titulo () {
    return this.getAttribute("titulo");
  }

  set titulo (titulo) {
    this.setAttribute("titulo", titulo);
  }

  static get observedAttributes() {
    return ["titulo"];
  }

  attributeChangedCallback(name , oldValue, newValue) {
    switch (name){
      case "titulo":
        this.actualizarElementoHtml(oldValue, newValue);
    }
  }

  actualizarElementoHtml(oldValue, newValue) {
    if (oldValue != newValue) {
      this.elementHtml.innerText = newValue;
    }
  }

};

export default Boton;