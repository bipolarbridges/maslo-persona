import {
  States,
  PersonaViewState as PersonaViewStateInternal,
  PersonaSettings,
} from '@persona-core';

export type PersonaViewState = PersonaViewStateInternal<string | number>;

export type CurrentPersonaSettings = Readonly<{ radius: number, resultScale: number }>;

export interface IPersonaContext {
  state: States;
  view: PersonaViewState;
  qolMags: { [dom: string]: number };

  currentSettings?: CurrentPersonaSettings;
}

export { PersonaSettings };
