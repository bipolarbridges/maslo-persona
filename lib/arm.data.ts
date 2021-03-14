import * as THREE from 'three';
import { Color as ChromaColor } from 'chroma-js';
import { PersonaConfig } from './persona.settings';

export class PersonaArmData {
  armBaseRadius: number = 0.28;
  armBaseLength: number = 0.6;
  armScoopCurveX: number = 0.16;
  armScoopCurveY: number = 1;
  armScoopEndX: number = 0.15;
  armScoopEndY: number = 1.2;
  armTipRadius: number = 0.092;
  armLength: number = 2.4;
  armTipControlPointX: number = 0.09;
  armTipControlPointY: number = 2.42;
  armRectangleLength: number = 2.28;

  constructor(readonly id: number, readonly settings: PersonaConfig) { }
}
