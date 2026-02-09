import type { Meta, StoryObj } from '@storybook/web-components-vite';

import { html } from 'lit'
import Map from './Map'

const meta = {
  title: 'Map',
  render: (args) => html`<dayz-map .map=${args.map}>${args.map}</dayz-map>`,
  args: {},
} satisfies Meta<Map>;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Chernarus: Story = {
  args: {
    map: "chernarus"
  }
};
export const DeerIsle: Story = {
  args: {
    map: "deerisle"
  }
};
