import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { Injectable, Input } from '@angular/core';
import { PlanetService } from "./planet.service";
import { PlanetComponent } from "./planet/planet.component";
import { Planet } from "./planet";

@Injectable({
  providedIn: 'root'
})
export class CreateOne3dPlanetService {

  public divWidth: number;
  public divHeight: number;
  public divOffsetLeft: number;
  public divOffsetTop: number;
  protected canvas: HTMLCanvasElement;
  protected renderer: THREE.WebGLRenderer;
  protected camera: THREE.PerspectiveCamera;
  protected scene: THREE.Scene;
  protected pointLight: THREE.PointLight;
  protected ambientLight: THREE.AmbientLight;
  protected directionalLight: THREE.DirectionalLight;
  protected objects: THREE.Mesh[] = [];
  public raycaster: THREE.Raycaster = new THREE.Raycaster();
  protected mouse: THREE.Vector2 = new THREE.Vector2(0,0);
  protected controls: OrbitControls;
  protected texturePath: string = "../assets/textures/planetes/";
  protected listOfPlanets: Planet[];
  protected numberPlanets: number = 1;
  protected texturesArray: any[] = [
    { texture: "jupitermap03.jpg" },
    { texture: "mars_1k_color.jpg", bump: "marsbump1k.jpg", scale: 0.2 },
    { texture: "mercurymap02.jpg", bump: "mercurybump.jpg", scale: 0.05 },
    { texture: "neptunemap03.jpg" },
    { texture: "saturnmap02.jpg" },
    { texture: "plutomap1k02.jpg", bump: "plutobump1k.jpg", scale: 0.1 },
    { texture: "uranusmap03.jpg" },
    { texture: "mars_1k_color03.jpg", bump: "marsbump1k.jpg", scale: 0.2 },
    { texture: "jupitermap02.jpg" },
    { texture: "mercurymap.jpg", bump: "mercurybump.jpg", scale: 0.05 },
    { texture: "venusmap03.jpg", bump: "venusbump.jpg", scale: 0.1 },
    { texture: "saturnmap.jpg" },
    { texture: "mars_1k_color02.jpg", bump: "marsbump1k.jpg", scale: 0.2 },
    { texture: "mercurymap03.jpg", bump: "mercurybump.jpg", scale: 0.05 },
    { texture: "neptunemap.jpg" },
    { texture: "venusmap.jpg", bump: "venusbump.jpg", scale: 0.1 },
    { texture: "uranusmap.jpg" },
    { texture: "plutomap1k.jpg", bump: "plutobump1k.jpg", scale: 0.1 },
    { texture: "neptunemap02.jpg" },
    { texture: "plutomap1k03.jpg", bump: "plutobump1k.jpg", scale: 0.1 },
    { texture: "venusmap02.jpg", bump: "venusbump.jpg", scale: 0.1 },
    { texture: "jupitermap.jpg" },
    { texture: "uranusmap02.jpg" },
    { texture: "saturnmap03.jpg" },
  ];
  // protected radiusArray: number[] = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
  // private randomTexturesArray: any[] = [];
  protected rotationSpeed: number[] = [];

  protected mainPivot: THREE.Group;

  protected group = new THREE.Group();

  public planetes: THREE.Object3D[] = [];


  constructor() { 
    this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this);
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
  }

  createScene(elementId: string, planetIndex: number): void {

    // // random of the texturesArray into the randomTexturesArray
    // for (let i: number = 0; i < 24; i++) {
    //   this.randomTexturesArray.push(this.texturesArray[Math.floor((Math.random() * this.texturesArray.length))]);
    // }

    this.divWidth = document.getElementById("map-wrapper").clientWidth;
    this.divHeight = document.getElementById("map-wrapper").clientHeight;
    this.divOffsetLeft = document.getElementById("map-wrapper").offsetLeft;
    this.divOffsetTop = document.getElementById("map-wrapper").offsetTop;
    this.canvas = <HTMLCanvasElement>document.getElementById(elementId);

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(this.divWidth, this.divHeight);

    // ajoute l'environnement Map
    // let envMap = new THREE.CubeTextureLoader().setPath(this.texturePath).load(["Starscape.png", "Starscape.png", "Starscape.png", "Starscape.png", "Starscape.png", "Starscape.png"]);
    let envMap = new THREE.CubeTextureLoader().setPath("../assets/textures/blue/").load(["bkg1_front.png","bkg1_back.png", "bkg1_top.png", "bkg1_bot.png","bkg1_left.png", "bkg1_right.png"]);
    this.scene.background = envMap;

    // ajoute la camera
    // this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera = new THREE.PerspectiveCamera(75, this.divWidth / this.divHeight, 1, 1000);
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


    // planet creation
    let i = planetIndex;
    let current: any = this.texturesArray[i];




    if (current.bump !== undefined && i !== 0) {
      this.createPlanetWithBump(i, 8, 32, current.texture, current.bump, current.scale, 0, -3, 0);
    } else if (current.bump == undefined && i == 0) {
      this.createPlanetWithoutBump(i, 8, 32, current.texture, 0, -3, 0);
    } else {
      this.createPlanetWithoutBump(i, 8, 32, current.texture, 0, -3, 0);
    }


    // ajoute les commandes de l'orbite
    this.controls = new OrbitControls(this.camera);
    this.controls.target.set(0, 0, 0);
    // this.controls.enablePan = true;
    // this.controls.enableZoom = true;
    this.controls.update();

    // this.canvas.addEventListener("mousedown", this.onDocumentMouseDown, false);
    // this.canvas.addEventListener("mousemove", this.onDocumentMouseMove, false);
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

    // // angle of planet
    // let planetPivot = new THREE.Group();
    // planetPivot.add(mesh);
    // let planetObject = new THREE.Object3D();
    // planetObject.add(planetPivot);
    // planetObject.rotateZ(Math.random() * 360 * Math.PI / 180);
    // this.planetes[0] = planetObject;
    // this.scene.add(planetObject);

    this.planetes[0] = mesh;
    this.scene.add(mesh);
  }

  // planetes creation without bump
  createPlanetWithoutBump(id: number, radius: number, division: number, textureMapFile: string, x: number, y: number, z: number): void {
    let geometry = new THREE.SphereBufferGeometry(radius, division, division);
    let textureMap: THREE.Texture = new THREE.TextureLoader().load(this.texturePath + textureMapFile);
    let materialDefinition = { map: textureMap };
    let material = new THREE.MeshPhongMaterial(materialDefinition);
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    // // angle of planet
    // let planetPivot = new THREE.Group();
    // planetPivot.add(mesh);
    // let planetObject = new THREE.Object3D();
    // planetObject.add(planetPivot);
    // planetObject.rotateZ(Math.random() * 360 * Math.PI / 180);
    // this.planetes[0] = planetObject;
    // this.scene.add(planetObject);

    this.planetes[0] = mesh;
    this.scene.add(mesh);
  }


  // Change the planet to show
  changePlanet(planetIndex: number): void {
    this.scene.remove(this.planetes[0]);
    this.planetes[0] = undefined;
    let i = planetIndex;
    let current: any = this.texturesArray[i];

    if (current.bump !== undefined && i !== 0) {
      this.createPlanetWithBump(i, 8, 32, current.texture, current.bump, current.scale, 0, -3, 0);
    } else if (current.bump == undefined && i == 0) {
      this.createPlanetWithoutBump(i, 8, 32, current.texture, 0, -3, 0);
    } else {
      this.createPlanetWithoutBump(i, 8, 32, current.texture, 0, -3, 0);
    }

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
    this.planetes[0].rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    let width = this.divWidth;
    let height = this.divHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  

  // display a console.log message when the user clicked on the planet
  onDocumentMouseDown(event: any) {
    event.preventDefault();
    this.mouse.x = (event.clientX - this.divOffsetLeft) / this.divWidth * 2 - 1;
    this.mouse.y = (event.clientY - this.divOffsetTop) / this.divHeight * 2 - 1.16;
    console.log(this.mouse.x);
    console.log(this.mouse.y);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    let intersects = this.raycaster.intersectObjects(this.planetes, true);
    if (intersects.length > 0) {
      console.log("You just click on the planet")
      // this.scene.remove(this.planetes[0]);
      // this.planetes[0] = undefined;
    }
}

  // change the cursor when the mouse is on a planet, to inform the user that he can click on it
  onDocumentMouseMove(event: any): void {
    // console.log("mouxe X: " + (event.clientX - this.divOffsetLeft), "mouse Y: " + (event.clientY - this.divOffsetTop));
    this.mouse.x = (event.clientX - this.divOffsetLeft) / this.divWidth * 2 - 1;
    this.mouse.y = (event.clientY - this.divOffsetTop) / this.divHeight * 2 - 1.16;
    // console.log(this.mouse.x, this.mouse.y);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    let intersects: THREE.Intersection[] = this.raycaster.intersectObjects(this.planetes, true);
    // console.log(intersects);
    if (intersects.length > 0) {
      this.canvas.style.cursor = "pointer";
    } else {
      this.canvas.style.cursor = "default";
    }
  }

}
