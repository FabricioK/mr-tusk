import { Component, AfterContentInit } from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three-orbitcontrols-ts';
import { Engine, Scene, Grid, SkinnedEntity } from 'hexenginets'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  engine: Engine;
  title = 'app';

  constructor() {

  }

  ngAfterContentInit() {
    var scene = new Scene({
      title: 'scene01',
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth ,
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


    this.engine = new Engine({
      containerId: 'container_id',
      width: window.innerWidth ,
      height: window.innerHeight,
      renderSettings: {
        alpha: sceneSettings.alpha,
        antialias: sceneSettings.antialias
      }
    });

    const controls = new OrbitControls(scene.camera, this.engine.container);
    controls.enableZoom = true;
    // How far you can orbit vertically, upper and lower limits.
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;

    // How far you can dolly in and out ( PerspectiveCamera only )
    controls.minDistance = 0;
    controls.maxDistance = Infinity;

    var player = new SkinnedEntity();
    let hello: any;
    var action = {
      hello: hello,
      idle: hello,
      run: hello,
      walk: hello
    }
    var activeActionName = 'idle';

    var arrAnimations = [
      'idle',
      'walk',
      'run',
      'hello'
    ];
    var actualAnimation = 0;
    player.SetTile(scene.board.tiles[20]);
    player.Load('assets/models/eva-animated.json', () => {
      player.skinnedMesh.scale.set(5, 5, 5);
      scene.addSkinnedEntity("player", player)
      player.StartAnimationMixer(() => {
        action.hello = player.mixer.clipAction(player.geometry.animations[0]);
        action.idle = player.mixer.clipAction(player.geometry.animations[1]);
        action.run = player.mixer.clipAction(player.geometry.animations[3]);
        action.walk = player.mixer.clipAction(player.geometry.animations[4]);

        action.hello.setEffectiveWeight(1);
        action.idle.setEffectiveWeight(1);
        action.run.setEffectiveWeight(1);
        action.walk.setEffectiveWeight(1);

        action.hello.setLoop(THREE.LoopOnce, 0);
        action.hello.clampWhenFinished = true;

        action.hello.enabled = true;
        action.idle.enabled = true;
        action.run.enabled = true;
        action.walk.enabled = true;
        action.idle.play();
      });
    });

    //this.engine.addEntity("player",player);
    this.engine.addScene('scence01', scene);
    this.engine.resumeScene();
  }
}