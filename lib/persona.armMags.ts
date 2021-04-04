
export type PersonaArmState = { [dom: string]: number };

export namespace PersonaArmState {
  export function createEmptyArmState(): PersonaArmState {
    return {
      "physical": 0.2,
      "sleep": 0.2,
      "mood": 0.2,
      "cognition": 0.2,
      "leisure": 0.2,
      "relationships": 0.2,
      "spiritual": 0.2,
      "money": 0.2,
      "home": 0.2,
      "self-esteem": 0.2,
      "independence": 0.2,
      "identity": 0.2,
    };
  }
}
