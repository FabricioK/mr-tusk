import { Component, AfterContentInit } from '@angular/core';
import { Scene, Grid, Engine } from 'hexenginets'

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
    var scene = new Scene({ title : 'scene01'});
    this.engine.init({ containerId : 'container_id'});
    this.engine.addScene('scence01',scene);
  }
}
