// TODO: Use zod?
export interface Event {
  time: Time;
  raw: string;
}

export interface Time {
  hour: number;
  minute: number;
  second: number;
  seq: number;
}
