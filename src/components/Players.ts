import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

type Player = {
  selected: boolean;
  name: string;
  id: string;
}

@customElement('player-list')
export default class Players extends LitElement {
  @property()
  public players: Player[] = [];

  private _togglePlayer(id: string) {
    this.players = this.players.map(player => {
      if(player.id === id) {
        player.selected = !player.selected;
      }
      return player;
    });
  }

  private _unselectAll() {
    this.players = this.players.map(player => {
      player.selected = false;
      return player;
    });
  }

  render() {
    return html`
    <ul>
      <li>
        <strong>Players</strong>
        <button ?disabled=${this.players.every((player) => !player.selected)} @click=${() => this._unselectAll()}>Clear Selection</button>
      </li>
      ${this.players.map(player => html`
        <li @click=${() => this._togglePlayer(player.id)}>
          <input type="checkbox" .checked=${player.selected} @change=${() => this._togglePlayer(player.id)}>
          <span title="${player.id}">${player.name}</span>
        </li>
      `)}
    </ul>
    `
  }

  static styles = css`
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
}
li {
  padding: 5px 0;
  font-family: monospace;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
li:hover {
  background-color: #eee;
}
ul li:last-child {
  border-bottom: none;
}
ul li:first-child {
  background: #ccc;
  padding: 5px;
  display: flex;
}
ul li:first-child:hover {
  background: #ccc;
}
ul li:first-child button {
  margin-left: auto;
  font-weight: bold;
  border-radius: 5px;
  border: 2px solid #888;
  color: #444;
  background-color: #eee;
  cursor: pointer;
}
ul li:first-child button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
`

}

declare global {
  interface HTMLElementTagNameMap {
    'player-list': Players
  }
}

