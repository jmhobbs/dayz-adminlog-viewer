import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { Time } from '../event';

@customElement('log-line')
export default class LogLine extends LitElement {
  @property({ type: String })
  raw = ""

  @property()
  time = {hour: 0, minute: 0, second: 0, seq: 0};

  render() {
    return html`
    <div>${formatTime(this.time)} | ${this.raw}</div>
    `
  }

  static styles = css`
div {
  font-family: monospace;
  white-space: pre;
}
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'log-line': LogLine
  }
}

function formatTime(time: Time) {
  return formatTimePart(time.hour) + ":" + formatTimePart(time.minute) + ":" + formatTimePart(time.second);
}

function formatTimePart(part: number) {
  if(part < 10) {
    return '0' + part.toString()
  }
  return part.toString()
}
