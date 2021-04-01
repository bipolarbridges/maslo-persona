import { start } from 'repl';
import * as THREE from 'three';
import { LoggerAnalyticsManager } from './analytics';
import { PersonaArmData } from './arm.data';
import { createLogger } from './utils/logger';
const logger = createLogger();

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

  updateMag(newMag: number, oldMag: number) {
    const vertices: THREE.Vector3[] = this.geoData.vertices;
    const tipStartIndex: number = 13;
    const tipEndIndex: number = 28;
    for (let i = 0; i < vertices.length; i++) {
      let newYValue: number = 0;
      if (i >= tipStartIndex && i <= tipEndIndex) {
        newYValue = (vertices[i].y + ((2 * (1 - oldMag)))) - (2 * (1 - newMag));
      } else {
        if (vertices[i].y !== 0) { newYValue = (vertices[i].y / oldMag) * newMag; }
      }
      vertices[i].setY(newYValue);
      this.geoData.verticesNeedUpdate = true;
    }
  }

  step(time: number) {}
}
