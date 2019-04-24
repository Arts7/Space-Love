import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { Injectable, Input, OnInit } from '@angular/core';
import { PlanetService } from "./planet.service";
import { PlanetComponent } from "./planet/planet.component";
import { Planet } from "./planet";

@Injectable({
  providedIn: 'root'
})
export class Create3dPlanetsService {

  protected canvas: HTMLCanvasElement;
  protected renderer: THREE.WebGLRenderer;
  protected camera: THREE.PerspectiveCamera;
  protected scene: THREE.Scene;
  protected pointLight: THREE.PointLight;
  protected ambientLight: THREE.AmbientLight;
  protected directionalLight: THREE.DirectionalLight;
  protected objects: THREE.Mesh[] = [];
  protected raycaster: THREE.Raycaster = new THREE.Raycaster();
  protected mouse: THREE.Vector2 = new THREE.Vector2();
  protected controls: OrbitControls;
  protected texturePath: string = "../assets/textures/planetes/";
  protected listOfPlanets: Planet[];
  protected numberPlanets: number = 9;
  protected texturesArray: any[] = [{ texture: "sunmap.jpg" }, { texture: "jupitermap.jpg" }, { texture: "mars_1k_color.jpg", bump: "marsbump1k.jpg" }, { texture: "mercurymap.jpg", bump: "mercurybump.jpg" }, { texture: "neptunemap.jpg" }, { texture: "plutomap1k.jpg", bump: "plutobump1k.jpg" }, { texture: "saturnmap.jpg" }, { texture: "uranusmap.jpg" }, { texture: "venusmap.jpg", bump: "venusbump.jpg" }];
  protected radiusArray: number[] = [2, 3, 5, 2.5, 6, 3.5, 7, 4, 5, 6];
  protected rotationSpeed: number[] = [];

  protected mainPivot: THREE.Group;
  protected planete01Pivot: THREE.Group;
  protected planete02Pivot: THREE.Group;
  protected planete03Pivot: THREE.Group;
  protected planete04Pivot: THREE.Group;
  protected planete05Pivot: THREE.Group;
  protected planete06Pivot: THREE.Group;
  protected planete07Pivot: THREE.Group;
  protected planete08Pivot: THREE.Group;
  protected planete01Object: THREE.Object3D;
  protected planete02Object: THREE.Object3D;
  protected planete03Object: THREE.Object3D;
  protected planete04Object: THREE.Object3D;
  protected planete05Object: THREE.Object3D;
  protected planete06Object: THREE.Object3D;
  protected planete07Object: THREE.Object3D;
  protected planete08Object: THREE.Object3D;

  protected group = new THREE.Group();

  public planetes: THREE.Mesh[] = [];


  createScene(elementId: string): void {
    this.canvas = <HTMLCanvasElement>document.getElementById(elementId);

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // ajoute l'environnement Map
    let envMap = new THREE.CubeTextureLoader().setPath(this.texturePath).load(["Starscape.png", "Starscape.png", "Starscape.png", "Starscape.png", "Starscape.png", "Starscape.png"]);
    this.scene.background = envMap;

    // ajoute la camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(0, 0, 20);
    this.scene.add(this.camera);

    // ajoute une lumière ponctuelle
    this.pointLight = new THREE.PointLight(0xFFFFFF);
    this.pointLight.position.set(0, 10, 0);
    this.scene.add(this.pointLight);

    this.ambientLight = new THREE.AmbientLight(0x222222);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    this.directionalLight.position.set(5, 5, 5)
    this.scene.add(this.directionalLight)
    this.directionalLight.castShadow = true
    this.directionalLight.shadowCameraNear = 0.01
    this.directionalLight.shadowCameraFar = 15
    this.directionalLight.shadowCameraFov = 45
    this.directionalLight.shadowCameraLeft = -1
    this.directionalLight.shadowCameraRight = 1
    this.directionalLight.shadowCameraTop = 1
    this.directionalLight.shadowCameraBottom = -1
    this.directionalLight.shadowBias = 0.001
    this.directionalLight.shadowMapWidth = 1024
    this.directionalLight.shadowMapHeight = 1024

    /*
    // creation of circles wich will be the orbital trajectories
    this.group.position.y = 0;
    this.group.rotation.x = (90 * Math.PI /180);
    this.scene.add(this.group);
    var extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    var arcShape = new THREE.Shape();
    arcShape.moveTo(0, 0);
    arcShape.absarc(0, 0, 20, 0, Math.PI * 2, false);
    this.addShape(arcShape, extrudeSettings, 0x00ff00, 0, 0, 0, 0, 0, 0, 1);
    */

    // planets creation
    for (let i = 0, distance = 0; i < this.numberPlanets; i++) {
      let current: any = this.texturesArray[i];


      if (current.bump !== undefined && i !== 0) {
        this.createPlanetWithBump(i, this.radiusArray[i], 32, current.texture, current.bump, 0.3, distance + this.radiusArray[i] * 2 + 20, this.radiusArray[i], 0);
      } else if (current.bump == undefined && i == 0) {
        this.createPlanetWithoutBump(i, this.radiusArray[i], 32, current.texture, 0, 0, 0);
      } else {
        this.createPlanetWithoutBump(i, this.radiusArray[i], 32, current.texture, distance + this.radiusArray[i] * 2 + 20, this.radiusArray[i], 0);
      }
      distance += this.radiusArray[i] * 10;
    }

    // creation of the pivot point for all the planets (it's always the stellar)
    this.scene.add(this.planetes[0]);

    this.planete01Pivot = new THREE.Group();
    this.planete01Pivot.add(this.planetes[1]);
    this.planete01Object = new THREE.Object3D();
    this.planete01Object.add(this.planete01Pivot);
    this.planete01Object.rotateY(180 * Math.PI / 180);
    this.planete01Object.rotateZ(23 * Math.PI / 180);
    this.planetes[0].add(this.planete01Object);

    this.planete02Pivot = new THREE.Group();
    this.planete02Pivot.add(this.planetes[2]);
    this.planete02Object = new THREE.Object3D();
    this.planete02Object.add(this.planete02Pivot);
    // this.planete02Object.rotateY(180 * Math.PI /180);
    this.planete02Object.rotateZ(5 * Math.PI / 180);
    this.planete02Object.translateX(35);
    this.planetes[0].add(this.planete02Object);

    this.planete03Pivot = new THREE.Group();
    this.planetes[0].add(this.planete03Pivot);
    this.planete03Object = new THREE.Object3D();
    this.planete03Object.add(this.planete03Pivot);
    this.planete03Object.rotateY(20 * Math.PI / 180);
    // this.planete03Object.rotateZ(0 * Math.PI /180);
    this.planete03Object.translateX(35);
    this.planetes[0].add(this.planete03Object);


    this.planete04Pivot = new THREE.Group();
    this.planetes[0].add(this.planete04Pivot);
    this.planete04Object = new THREE.Object3D();
    this.planete04Object.add(this.planete04Pivot);
    this.planete04Object.rotateY(45 * Math.PI / 180);
    this.planete04Object.rotateZ(3 * Math.PI / 180);
    this.planete04Object.translateX(35);
    this.planetes[0].add(this.planete04Object);

    this.planete05Pivot = new THREE.Group();
    this.planetes[0].add(this.planete05Pivot);
    this.planete05Pivot.add(this.planetes[5]);

    this.planete06Pivot = new THREE.Group();
    this.planetes[0].add(this.planete06Pivot);
    this.planete06Pivot.add(this.planetes[6]);

    this.planete07Pivot = new THREE.Group();
    this.planetes[0].add(this.planete07Pivot);
    this.planete07Pivot.add(this.planetes[7]);

    this.planete08Pivot = new THREE.Group();
    this.planetes[0].add(this.planete08Pivot);
    this.planete08Pivot.add(this.planetes[8]);

    


    // this.createPlanetWithoutBump(0, (this.listOfPlanets[0].radiusJupiter)*10, 32, this.texturesArray[0].texture, 0, 0, 0);

    /*
    for (let i = 0; i < this.numberPlanets; i++) {
      let current: any = this.texturesArray[i];

      if (current.bump !== undefined && (this.allPlanets[i].radiusJupiter)) {
        this.createPlanetWithBump(i, this.allPlanets[i].radiusJupiter * 10, 32, current.texture, current.bump, 0.3, (this.allPlanets[i].radiusJupiter / 100) + 5, 0, 0);
      } else if (current.bump !== undefined && (this.allPlanets[i].radiusJupiter) == undefined) {
        this.createPlanetWithBump(i, 2, 32, current.texture, current.bump, 0.3, 2 + 5, 0, 0);
      } else if (current.bump == undefined && (this.allPlanets[i].radiusJupiter) == undefined) {
        this.createPlanetWithoutBump(i, 2, 32, current.texture, 2 + 5, 0, 0);
      } else {
        this.createPlanetWithoutBump(i, this.allPlanets[i].radiusJupiter * 10, 32, current.texture, (this.allPlanets[i].radiusJupiter / 100) + 5, 0, 0);
      }


    }
    */

    // this.createPlanetWithoutBump(0, 10, 32, "sunmap.jpg", 0, 0, 0);
    // this.createPlanetWithBump(1, 6.3, 32, "earthmap1k.jpg", "earthbump1k.jpg", 0.3, 10+6.3+2, 0, 0); // Earth
    // this.createAtmosphere(2, 6.4, 32, "earthcloudmap.png", THREE.DoubleSide, 0.8, true, this.planetes[1].position.x, this.planetes[1].position.y, this.planetes[1].position.z); // Earth cloud



    // ajoute les commandes de l'orbite

    this.controls = new OrbitControls(this.camera);
    // this.controls.target.set(this.planetes[0].position.x, this.planetes[0].position.y, this.planetes[0].position.z);
    this.controls.target.set(0, 0, 0);
    this.controls.enablePan = true;
    this.controls.enableZoom = true;
    this.controls.update();

  }


  // planetes creation with bump
  createPlanetWithBump(id: number, radius: number, division: number, textureMapFile: string, textureBumpMapFile: string, bumpMapScale: number, x: number, y: number, z: number): void {
    let geometry = new THREE.SphereBufferGeometry(radius, division, division);
    let textureMap: THREE.Texture = new THREE.TextureLoader().load(this.texturePath + textureMapFile);
    let textureBumpMap: THREE.Texture = new THREE.TextureLoader().load(this.texturePath + textureBumpMapFile);
    let materialDefinition = { map: textureMap, bumpMap: textureBumpMap, bumpScale: bumpMapScale };
    let material = new THREE.MeshPhongMaterial(materialDefinition);
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    this.planetes.push(mesh);
    // this.scene.add(mesh);
  }

  // planetes creation without bump
  createPlanetWithoutBump(id: number, radius: number, division: number, textureMapFile: string, x: number, y: number, z: number): void {
    let geometry = new THREE.SphereBufferGeometry(radius, division, division);
    let textureMap: THREE.Texture = new THREE.TextureLoader().load(this.texturePath + textureMapFile);
    let materialDefinition = { map: textureMap };
    let material = new THREE.MeshPhongMaterial(materialDefinition);
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    this.planetes.push(mesh);
    // this.scene.add(mesh);
  }

  // atmosphere creation
  createAtmosphere(id: number, radius: number, division: number, textureMapFile: string, textureSideMap, textureOpacity: number, transparentTexture: boolean, x: number, y: number, z: number): void {
    let geometry = new THREE.SphereBufferGeometry(radius, division, division);
    let textureMap: THREE.Texture = new THREE.TextureLoader().load(this.texturePath + textureMapFile);
    let materialDefinition = { map: textureMap, side: textureSideMap, opacity: textureOpacity, transparent: transparentTexture };
    let material = new THREE.MeshPhongMaterial(materialDefinition);
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    this.planetes.push(mesh);
    // this.scene.add(mesh);
  }

  // creation of the shape
  addShape(shape: THREE.Shape, extrudeSettings: {}, color, x: number, y: number, z: number, rx: number, ry: number, rz: number, s: number) {
    /*
    // flat shape
    var geometry = new THREE.ShapeBufferGeometry(shape);
    var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: color, side: THREE.DoubleSide }));
    mesh.position.set(x, y, z - 125);
    mesh.rotation.set(rx, ry, rz);
    mesh.scale.set(s, s, s);
    this.group.add(mesh);

    // extruded shape
    var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: color }));
    mesh.position.set(x, y, z - 75);
    mesh.rotation.set(rx, ry, rz);
    mesh.scale.set(s, s, s);
    this.group.add(mesh);
    */

    this.addLineShape(shape, color, x, y, z, rx, ry, rz, s);

  }

  addLineShape(shape: THREE.Shape, color, x: number, y: number, z: number, rx: number, ry: number, rz: number, s: number) {
  
    // lines
    shape.autoClose = true;
    var points = shape.getPoints();
    var spacedPoints = shape.getSpacedPoints(50);
    var geometryPoints = new THREE.BufferGeometry().setFromPoints(points);
    var geometrySpacedPoints = new THREE.BufferGeometry().setFromPoints(spacedPoints);
  
    // solid line
    var line = new THREE.Line(geometryPoints, new THREE.LineBasicMaterial({ color: color }));
    line.position.set(x, y, z);
    line.rotation.set(rx, ry, rz);
    line.scale.set(s, s, s);
    this.group.add(line);

    /*
    // line from equidistance sampled points
    var line = new THREE.Line(geometrySpacedPoints, new THREE.LineBasicMaterial({ color: color }));
    line.position.set(x, y, z + 25);
    line.rotation.set(rx, ry, rz);
    line.scale.set(s, s, s);
    this.group.add(line);
    // vertices from real points
    var particles = new THREE.Points(geometryPoints, new THREE.PointsMaterial({ color: color, size: 4 }));
    particles.position.set(x, y, z + 75);
    particles.rotation.set(rx, ry, rz);
    particles.scale.set(s, s, s);
    this.group.add(particles);
    // equidistance sampled points
    var particles = new THREE.Points(geometrySpacedPoints, new THREE.PointsMaterial({ color: color, size: 4 }));
    particles.position.set(x, y, z + 125);
    particles.rotation.set(rx, ry, rz);
    particles.scale.set(s, s, s);
    this.group.add(particles);
    */
  }


  animate(): void {
    window.addEventListener('DOMContentLoaded', () => {
      this.render();
    });

    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    //animation

    // this.planetes[0].rotation.y += 0.05;
    this.planetes[1].rotation.y += 0.02;
    this.planete01Pivot.rotation.y += 0.005;
    this.planetes[2].rotation.y -= 0.05;
    this.planete02Pivot.rotation.y += 0.0025;
    this.planetes[3].rotation.y += 0.01;
    this.planete03Pivot.rotation.y -= 0.005;
    this.planetes[4].rotation.y -= 0.025;
    this.planete04Pivot.rotation.y -= 0.0035;
    this.planetes[5].rotation.y += 0.05;
    this.planete05Pivot.rotation.y += 0.0015;
    this.planetes[6].rotation.y -= 0.35;
    this.planete06Pivot.rotation.y -= 0.002;
    this.planetes[7].rotation.y += 0.05;
    this.planete07Pivot.rotation.y += 0.001;
    this.planetes[8].rotation.y += 0.04;
    this.planete08Pivot.rotation.y -= 0.0005;

    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
