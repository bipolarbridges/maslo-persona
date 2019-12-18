import React from 'react';
import ExpoTHREE from 'expo-three';
import suppressExpoWarnings from 'expo-three/build/suppressWarnings';
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl';
import { StyleSheet, Dimensions, View, PixelRatio } from 'react-native';
import {
  PersonaCore,
  THREE,
  States,
  UseResources,
  ResourceManager,
  PersonaSettings,
} from '../lib';
import { AudioPlayer } from './audioPlayer';
import { getExpoAssetsAsync } from './resources';
import { createLogger } from '../lib/utils/logger';

const logger = createLogger('[MasloPersonaExpo]');

const Device = function() {
  const { height, width } = Dimensions.get('window');
  const aspectRatio = height / width;
  return {
    width, height, aspectRatio,
    pixelRatio: PixelRatio.get(),
    isSmall() {
      return (width <= 320) || aspectRatio < 1.6;
    },
  };
}();

export type Props = {
  state?: States,
  disabled?: boolean,
  personaSettings?: Partial<PersonaSettings>,
};

type CompState = {
  resourcesLoaded: boolean,
};

export class MasloPersonaExpo extends React.Component<Props, CompState> {

  state = {
    resourcesLoaded: false,
  };

  private _gl: ExpoWebGLRenderingContext = null;
  private _scene: THREE.Scene;
  private _camera: THREE.Camera;
  private _renderer: ExpoTHREE.Renderer;
  private _persona: PersonaCore;

  private _rafId: number;

  componentDidMount() {
    suppressExpoWarnings(true);
    console.ignoredYellowBox = [
      'THREE.WebGLRenderer',
    ];

    this.loadResources();
  }

  componentWillUnmount() {
    this.cleanup(true);
  }

  async loadResources() {
    const resources = await getExpoAssetsAsync();
    // console.log('RESOURCES:', resources);
    UseResources(resources);
    this.setState({ resourcesLoaded: true });
  }

  cleanup(disposePersona = false) {
    if (disposePersona && this._persona) {
      this._persona.dispose();
    }
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
    }
  }

  onGLContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    this.cleanup(true);

    this._gl = gl;

    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;

    logger.log('Initializing with GL context:', { width, height });

    // THREE scene
    this._scene = new THREE.Scene();

    // THREE camera
    this._camera = new THREE.OrthographicCamera( - width / 2, width / 2, height / 2, - height / 2, -10, 1000);
    this._camera.position.z = 100;

    // THREE renderer and dimensions
    this._renderer = new ExpoTHREE.Renderer({ gl: this._gl as WebGLRenderingContext });
    this._renderer.setSize(width, height);

    const pixelRadius = Math.min(width, height);
    const radius = Math.max(pixelRadius, 10) / Device.pixelRatio;

    // position persona on screen
    this._persona = new PersonaCore(this._scene, {
      ringRes: Math.round(pixelRadius / 100) * 10 + 16,
      radius,
      glow: false,
      audio: new AudioPlayer(ResourceManager.Current),
      ...this.props.personaSettings,
    });

    this._persona.setState(this.props.state || States.Init);

    this.step();
  }

  step = () => {
    try {
      this._persona.step();
    } catch (err) {
      console.error(err);
      return;
    }

    this._rafId = requestAnimationFrame(this.step);

    // render scene
    this._renderer.render(this._scene, this._camera);
    this._gl.endFrameEXP();
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (this.props.disabled !== prevProps.disabled) {
      if (this.props.disabled) {
        this.cleanup();
      } else {
        this.step();
      }
    }

    if (this._persona && this.props.state !== prevProps.state) {
      this._persona.setState(this.props.state);
    }
  }

  render(): any {
    if (!this.state.resourcesLoaded) {
      return null;
    }

    return (
      <View style={styles.wrapper}>
        <GLView
            style={styles.container}
            onContextCreate={this.onGLContextCreate}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
      flex: 1,
      backgroundColor: 'transparent',
  },
  container: {
      flex: 1,
      // top: Device.isSmall() ? '-18%' : '-20%',
      // opacity: 0.8,
  },
});