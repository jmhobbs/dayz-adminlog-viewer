import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import chernarus from '../maps/chernarus.jpg'
import deerisle from '../maps/deerisle.jpg'
import other from '../maps/other.png'

// The "on screen" size of the map
const physicalSize = 600;

@customElement('dayz-map')
export default class Map extends LitElement {
  @property({ type: String })
  public map: "chernarus" | "deerisle" | "other" = "chernarus";

  // TODO: Link to map property, expose for `other` maps
  @state()
  private _mapSize = 15360;
  // deerisle 16380?
  // livonia 12800?
  // sakhal 15360?

  @state()
  private _zoom = 0;

  @state()
  private _xOffset = 0;

  @state()
  private _yOffset = 0;

  @state()
  private _mouseX = 0;

  @state()
  private _mouseY = 0;

  @state()
  private _onMap = false;

  private _dragging = false;
  private _dragStartX = 0;
  private _dragStartY = 0;

  private _zoomIn() {
    if(this._zoom < 8) {
      this._zoom++
    }
  }

  private _zoomOut() {
    if(this._zoom > 0) {
      this._zoom--
      this._xOffset = Math.max(
        Math.min(0, this._xOffset),
        -1 * (physicalSize * (this._zoom * 0.25))
      );
      this._yOffset = Math.max(
        Math.min(0, this._yOffset),
        -1 * (physicalSize * (this._zoom * 0.25))
      );
    }
  }

  private _mouseOver() {
    this._onMap = true;
  }

  private _mouseOut() {
    this._onMap = false;
    this._mouseUp();
  }

  private _mouseDown(e: MouseEvent) {
    this._dragging = true;
    this._dragStartX = e.offsetX;
    this._dragStartY = e.offsetY;
  }

  private _mouseUp() {
    this._dragging = false;
  }

  private _mouseMove(e: MouseEvent) {
    this._mouseX = e.offsetX;
    this._mouseY = e.offsetY;

    if(this._dragging) {
      this._xOffset = Math.max(
        Math.min(0, this._xOffset - (this._dragStartX - e.offsetX)),
        -1 * (physicalSize * (this._zoom * 0.25))
      );
      this._dragStartX = e.offsetX;
      this._yOffset = Math.max(
        Math.min(0, this._yOffset - (this._dragStartY - e.offsetY)),
        -1 * (physicalSize * (this._zoom * 0.25))
      );
      this._dragStartY = e.offsetY;
    }
  }

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

    const mapScale = this._mapSize / physicalSize;
    const zoomScale = 1 + (this._zoom * 0.25);
    let mouseMapX = Math.round(((this._mouseX - this._xOffset) / zoomScale) * mapScale);
    let mouseMapY = Math.round(this._mapSize - ((this._mouseY - this._yOffset) / zoomScale) * mapScale);

    // TODO: Move this to another component?
    const mapPosition = this._onMap ? html`(<span>${mouseMapX.toFixed(0)}</span>, <span>${mouseMapY.toFixed(0)}</span>)` : undefined;

    return html`
    <style>
      div.map {
        background-image: url("${mapUrl}") !important;
        background-size: ${100 + this._zoom * 25}% !important;
        background-position-x: ${this._xOffset}px !important;
        background-position-y: ${this._yOffset}px !important;
      }
    </style>
    <div class="container">
      <div
        class="map"
        @mousedown=${this._mouseDown}
        @mouseup=${this._mouseUp}
        @mouseover=${this._mouseOver}
        @mouseout=${this._mouseOut}
        @mousemove=${this._mouseMove}
      ></div>
      <div class="controls">
        <div class="zoom">
          <button @click="${this._zoomIn}" ?disabled="${this._zoom >= 8}">➕</button>
          <button @click="${this._zoomOut}" ?disabled="${this._zoom <= 0}">➖</button>
        </div>
        <div class="position">
          ${mapPosition ?? nothing}
        </div>
      </div>
    </div>
    `
  }

  static styles = css`
div.container {
  width: ${physicalSize}px;
}
div.map {
  position: relative;
  width: ${physicalSize}px;
  height: ${physicalSize}px;
  background-size: cover;
  backgrround-color: #ccc;
  margin-bottom: 10px;
}
div.controls {
  display: flex;
  flex-direction: row;
}
button {
  font-weight: bold;
  margin-right: 5px;
  border-radius: 25%;
  border: 2px solid #888;
  background-color: #ccc;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
div.zoom {
  flex-grow: 2;
}
div.position {
  font-family: monospace;
  font-size: 16px;
  text-align: right;
}
`

}

declare global {
  interface HTMLElementTagNameMap {
    'dayz-map': Map
  }
}
