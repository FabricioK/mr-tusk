import { Component, AfterContentInit } from '@angular/core';
import { Scene, Grid, Engine } from 'hexenginets'
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
    var scene = new Scene({ title: 'scene01' });
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
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
    
    scene.scene.add(sceneSettings.light);
    scene.scene.add(new THREE.AmbientLight(0xdddddd));;


    this.engine.init({
      containerId: 'container_id',
      width: window.innerWidth,
      height: window.innerHeight
    });
   
    this.engine.addScene('scence01', scene);
    this.engine.resumeScene();
    scene.renderer.setClearColor('#fff',0);
  }
}