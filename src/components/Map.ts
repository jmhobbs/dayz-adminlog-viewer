import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import chernarus from '../maps/chernarus.jpg'
import deerisle from '../maps/deerisle.jpg'
import other from '../maps/other.png'

@customElement('dayz-map')
export default class Map extends LitElement {
  @property({ type: String })
  public map: "chernarus" | "deerisle" | "other" = "chernarus";

  render() {
    let mapUrl = chernarus;
    switch(this.map) {
      case "chernarus":
        mapUrl = chernarus;
      break
      case "deerisle":
        mapUrl = deerisle;
      break
      default:
        mapUrl = other;
        break;
    }
    return html`
    <style>div { background-image: url("${mapUrl}") !important; }</style>
    <div></div>
    `
  }

  static styles = css`
div {
  position: relative;
  width: 600px;
  height: 600px;
  border: 1px solid #000;
  background-size: cover;
  backgrround-color: #ccc;
}
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'dayz-map': Map
  }
}
