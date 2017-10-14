import { Component, AfterContentInit } from '@angular/core';
import { Engine,Scene,Grid } from 'hexenginets'
import * as THREE from 'three'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  engine: Engine;
  title = 'app';

  constructor() {
    this.engine = new Engine();
  }

  ngAfterContentInit() {
    var scene = new Scene({
      title: 'scene01',
      gridConfig: {
        cellSize: 4
      }
    });

    var sceneSettings = {
      element: document.body,
      alpha: true,
      antialias: true,
      clearColor: '#fff',
      sortObjects: false,
      fog: null,
      light: new THREE.DirectionalLight(0xffffff),
      lightPosition: null,
      cameraType: 'PerspectiveCamera',
      cameraPosition: null, // {x, y, z}
      orthoZoom: 4
    }

    if (!sceneSettings.lightPosition) {
      sceneSettings.light.position.set(-1, 1, -1).normalize();
    }

    scene.camera.position.y = 50;
    scene.camera.position.z = 200;

    scene.container.add(sceneSettings.light);
    scene.container.add(new THREE.AmbientLight(0xdddddd));
    
    this.engine.init({
      containerId: 'container_id',
      width: window.innerWidth,
      height: window.innerHeight,
      renderSettings: {
        alpha: sceneSettings.alpha,
        antialias: sceneSettings.antialias
      }
    });

    this.engine.addScene('scence01', scene);
    this.engine.resumeScene();
    scene.renderer.setClearColor('#fff', 0);
  }
}