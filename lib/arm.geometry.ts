import * as THREE from 'three';
import { PersonaArmData } from './arm.data';

export class ArmGeometry {

  readonly geoShape = new THREE.Shape();
  readonly geoData: THREE.ShapeGeometry;

  constructor(readonly data: PersonaArmData) {
    this.geoShape.moveTo( -data.armBaseRadius, 0 );
    this.geoShape.moveTo(-data.armBaseRadius, data.armBaseLength);
    this.geoShape.quadraticCurveTo(-data.armScoopCurveX, data.armScoopCurveY, -data.armScoopEndX, data.armScoopEndY);
    this.geoShape.lineTo(-data.armTipRadius, data.armRectangleLength);
    this.geoShape.bezierCurveTo(-data.armTipControlPointX, data.armTipControlPointY, data.armTipControlPointX, data.armTipControlPointY, data.armTipRadius, data.armRectangleLength);
    this.geoShape.lineTo(data.armScoopEndX, data.armScoopEndY);
    this.geoShape.quadraticCurveTo(data.armScoopCurveX, data.armScoopCurveY, data.armBaseRadius, data.armBaseLength);
    this.geoShape.moveTo(data.armBaseRadius, 0);
    this.geoShape.lineTo(-data.armBaseRadius,0);
    this.geoData = new THREE.ShapeGeometry(this.geoShape);
  }
}
