import * as THREE from 'three';
import { PersonaArmData } from './arm.data';
import { ArmGeometry } from './arm.geometry';
import { PersonaConfig } from './persona.settings';
import { IPersonaArm } from './abstractions';

export type ArmSettings = { id: number, config: PersonaConfig };

export class PersonaArm implements IPersonaArm {

  readonly data: PersonaArmData;
  private readonly _geometry: ArmGeometry;
  private readonly _material: THREE.MeshBasicMaterial;
  private readonly _originalMaterial: THREE.MeshBasicMaterial;
  private readonly mesh: THREE.Mesh;
  private _mag: number;

  constructor(id: number, config: PersonaConfig, mag: number) {
    this.data = new PersonaArmData(id, config);
    this._mag = mag;

    this._geometry = new ArmGeometry(this.data, mag);
    this._material = new THREE.MeshBasicMaterial( { color: config.armColors[id] });
    this._originalMaterial = this._material;

    this.mesh = new THREE.Mesh(this._geometry.geoData, this._material);
    if (id !== 1) {
      const multiplier: number = (id - 1) * 30;
      this.mesh.rotateZ(Math.PI/180*multiplier);
    }
  }

  get theGroup() { return this.mesh; }

  updateMag(newMag: number) {
    this._geometry.updateMag(newMag, this._mag);
    this._mag = newMag;
  }
}
