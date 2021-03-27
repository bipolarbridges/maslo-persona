import * as THREE from 'three';
import { PersonaArmData } from './arm.data';

export class ArmGeometry {

  readonly geoShape = new THREE.Shape();
  readonly geoData: THREE.ShapeGeometry;

  constructor(readonly data: PersonaArmData, mag: number) {
    this.geoShape.moveTo( -data.armBaseRadius, 0);
    this.geoShape.moveTo(-data.armBaseRadius, data.armBaseLength*mag);
    this.geoShape.quadraticCurveTo(-data.armScoopCurveX, data.armScoopCurveY*mag, -data.armScoopEndX, data.armScoopEndY*mag);
    this.geoShape.lineTo(-data.armTipRadius, data.armRectangleLength*mag);
    this.geoShape.bezierCurveTo(-data.armTipControlPointX, data.armTipControlPointY* mag, data.armTipControlPointX, data.armTipControlPointY*mag, data.armTipRadius, data.armRectangleLength*mag);
    this.geoShape.lineTo(data.armScoopEndX, data.armScoopEndY*mag);
    this.geoShape.quadraticCurveTo(data.armScoopCurveX, data.armScoopCurveY*mag, data.armBaseRadius, data.armBaseLength*mag);
    this.geoShape.moveTo(data.armBaseRadius, 0);
    this.geoShape.lineTo(-data.armBaseRadius,0);
    this.geoData = new THREE.ShapeGeometry(this.geoShape);
  }

  step(time: number) {}
}
