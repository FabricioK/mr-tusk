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

    scene.scene.add(cube);


    this.engine.init({
      containerId: 'container_id',
      width: window.innerWidth,
      height: window.innerHeight
    });
    this.engine.addScene('scence01', scene);
    this.engine.resumeScene();
  }
}