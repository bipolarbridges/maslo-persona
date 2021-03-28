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
    logger.log("new mag:", newMag, "old mag:", oldMag);
    const vertices: THREE.Vector3[] = this.geoData.vertices;
    logger.log(vertices);
    for (let i = 0; i < vertices.length; i++) {
       let newYValue = 0;
       if (vertices[i].y !== 0) { newYValue = (vertices[i].y / oldMag) * newMag; }
    //   logger.log("STEP3: updating vertex with this value", newYValue);
      vertices[i].setY(newYValue);
      this.geoData.verticesNeedUpdate = true;
    }
  }

  step(time: number) {}
}
