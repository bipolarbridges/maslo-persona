import {
  States,
  PersonaViewState as PersonaViewStateInternal,
  PersonaArmState as PersonaArmStateInternal,
  PersonaSettings,
} from '@persona-core';

export type PersonaViewState = PersonaViewStateInternal<string | number>;
export type PersonaArmState = PersonaArmStateInternal;

export type CurrentPersonaSettings = Readonly<{ radius: number, resultScale: number }>;

export interface IPersonaContext {
  state: States;
  view: PersonaViewState;
  qolMags: PersonaArmState;

  currentSettings?: CurrentPersonaSettings;
}

export { PersonaSettings };
