import type { Meta, StoryObj } from '@storybook/web-components-vite';

import { html } from 'lit'
import LogLine from './LogLine'

const meta = {
  title: 'Log Line',
  render: (args) => html`<log-line .raw=${args.raw} .time=${args.time}></log-line>`,
  args: {
    raw: `Player "Hopps"(id=u-zsMeDnVvc4GNYj6Ac-66-aT-gRWNlZwuOwybJDgtw=) is connected`,
    time: {
      hour: 1,
      minute: 23,
      second: 45,
      seq: 2,
    }
  },
} satisfies Meta<LogLine>;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
