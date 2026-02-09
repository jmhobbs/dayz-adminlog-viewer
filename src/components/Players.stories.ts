import type { Meta, StoryObj } from '@storybook/web-components-vite';

import { html } from 'lit'
import Players from './Players'

const meta = {
  title: 'Players',
  render: (args) => html`<player-list .players=${args.players}></player-list>`,
  args: {},
} satisfies Meta<Players>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    players: [
      {
        selected: false,
        name: "Fresh",
        id: "u-zsMeDnVvc4GNYj6Ac-66-aT-gRWNlZwuOwtbJDgtw=",
      },
      {
        selected: false,
        name: "Hopps",
        id: "c9RJIKp7N5H-7Ev0LH9ikHsraLgTLbEIV1BDAE5YbcM=",
      },
      {
        selected: false,
        name: "Neon",
        id: "zBWq5HZjBP7f2tPGwuPawx3xb_jqEfmmmD_2jDi8Ees=",
      },
    ]
  }
};
