import SimplexNoise from 'simplex-noise';
import { IAudioPlayer } from './abstractions';

export type PersonaSettings = {
  ringRes: number,
  radius: number,
  colors: string[],
  audio?: IAudioPlayer,
  armColors: string[],
  glow?: boolean,
  skipTextures: false | 'all' | 'background',
  disableSound: boolean,
};

export const DefaultSettings: PersonaSettings = {
  ringRes: 256,
  radius: 300,
  colors: [
    '#C3C3C3',
    '#DADADA',
    '#FDFDFD',
    '#9E9EFF',
    '#A9A9FF',
    '#B9B9FF',
    '#DCDCFF',
    '#DCFFFF',
  ],
  armColors: [
    '#9E9E9E',
    '#CACACA',
    '#DCDCDC',
    '#DBDBDB',
    '#CACACA', // arm at ripple
    '#AEAEAE',
    '#9E9E9E',
    '#848484',
    '#696969',
    '#646464',
    '#696969',
    '#848484',
  ],
  audio: {
    play() { /* do nothing */ },
  } as IAudioPlayer,
  glow: false,
  skipTextures: false,
  disableSound: false,
};

export const DefaultInternalSettings = {
  ringsCount: 8,
  simplex: new SimplexNoise(Math.random),
};

export type PersonaInternalSettings = typeof DefaultInternalSettings;
export type PersonaConfig = PersonaSettings & PersonaInternalSettings;
