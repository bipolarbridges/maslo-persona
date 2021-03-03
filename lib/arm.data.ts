import * as THREE from 'three';
import { Color as ChromaColor } from 'chroma-js';
import { PersonaConfig } from './persona.settings';

export class PersonaArmData {
  armBaseRadius: number = 0.3;
  armScoopCurveX: number = 0.14;
  armScoopCurveY: number = 1;
  armScoopEndX: number = 0.14;
  armScoopEndY: number = 1.2;
  armTipRadius: number = 0.1;
  armLength: number = 2.4;
  armRectangleLength: number = 2.28;

  // originalColor: THREE.Vector3;
  // hsl: THREE.Vector3;

  // color: ChromaColor;

  // seed = new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);

  // osc = 0.05;
  // intensity = 1;
  // frequency = 0.2;
  // gaussIt = 0;
  // weightIn = 0;
  // shadowSpread = 0.01;
  // shadowColor = 0;
  // shadowIntensity = 0.15;
  // theta = Math.random();
  // gaussAmplitude = 0.3;
  // opacity = 0;
  // scaleInc = new THREE.Vector3(0, 0, 0);
  // scale = new THREE.Vector3(1, 1, 1);
  // position = new THREE.Vector3(0, 0, 0);
  // easingFactor = 0;

  constructor(readonly id: number, readonly settings: PersonaConfig) { }
}
