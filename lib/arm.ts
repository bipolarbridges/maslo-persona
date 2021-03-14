import * as THREE from 'three';
import { PersonaArmData } from './arm.data';
import { ArmGeometry } from './arm.geometry';
// import { ArmMaterial } from './arm.material'; currently not using this
import { PersonaConfig } from './persona.settings';
import { IPersonaArm } from './abstractions';

export type ArmSettings = { id: number, config: PersonaConfig };

export class PersonaArm implements IPersonaArm {

  readonly data: PersonaArmData;
  private readonly _geometry: ArmGeometry;
  private readonly _material: THREE.MeshBasicMaterial;
  private readonly _originalMaterial: THREE.MeshBasicMaterial;
  private readonly mesh: THREE.Mesh;

  // private readonly translationGroup: THREE.Object3D;
  // private readonly rotationGroup: THREE.Object3D;

  // private _debugMaterial: THREE.MeshBasicMaterial;

  constructor(id: number, config: PersonaConfig) {
    this.data = new PersonaArmData(id, config);

    this._geometry = new ArmGeometry(this.data);
    this._material = new THREE.MeshBasicMaterial( { color: config.armColors[id] });
    this._originalMaterial = this._material;

    this.mesh = new THREE.Mesh(this._geometry.geoData, this._material);
    if (id !== 1) {
      const multiplier: number = (id - 1) * 30;
      this.mesh.rotateZ(Math.PI/180*multiplier);
    }

    // this.translationGroup = new THREE.Object3D();
    // this.rotationGroup = new THREE.Object3D();

    // this.rotationGroup.add(this.translationGroup);
    // this.translationGroup.add(this.mesh);
  }

  get theGroup() { return this.mesh; }

  step(time: number) {
    this._geometry.step(time);
  }
}
