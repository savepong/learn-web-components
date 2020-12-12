class InfoToggle extends HTMLElement {
  constructor() {
    super();
    this._isHidden = true;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
      p {
        display: none;
      }
      </style>
      <button type="button">Show</button>
      <p>
        <slot>More infos!</slot>
      </p>
    `;
    this._infoButton = this.shadowRoot.querySelector("button");
    this._infoButton.addEventListener("click", this._toggleInfoBox.bind(this));
    this._infoBox = this.shadowRoot.querySelector("p");
  }

  connectedCallback() {
    if (this.hasAttribute("is-visible")) {
      if (this.getAttribute("is-visible") === "true") {
        this._isHidden = false;
        this._infoBox.style.display = "block";
        this._infoButton.innerText = "Hide";
      }
    }
  }

  _toggleInfoBox() {
    this._isHidden = !this._isHidden;

    this._infoBox.style.display = this._isHidden ? "none" : "block";
    this._infoButton.innerText = this._isHidden ? "Show" : "Hide";
  }
}

customElements.define("savepong-info-toggle", InfoToggle);
