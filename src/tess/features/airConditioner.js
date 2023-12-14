import * as THREE from 'three';
// import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
// import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
// import { nodeFrame } from 'three/addons/renderers/webgl/nodes/WebGLNodes.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

let canvas, controls;
let camera, renderer;
const scene = new THREE.Scene();
let pre_mouseX, pre_mouseY;

var tapedTwice = false;

// scene.background = new THREE.Color(0xf0f0f0);
let composer, requestId, outlinePass;
let selectedObjects = [];
let shield_text, bracket_text, fin_text, fan_text, compressor_text;
var shield_helper, bracket_helper, fin_helper, fan_helper, compressor_helper;
let top_z_up,
  botton_z_down,
  bracket_y_down,
  compressor_xy_down,
  right_x_up,
  fan2_y_down,
  front_y_down,
  left_x_down,
  fan_y_down,
  fin_z_down;
var direction = new THREE.Vector3(1, 1, 1);
var speed = 0.5;
var anime_reverse = false;
var hover_interact_ct = 0;
var anime_iter = 0;

const raycaster = new THREE.Raycaster();
const mousePosition = new THREE.Vector2();

const container = document.getElementById('airConditioner-model-container');
const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.querySelector('.progress-bar-container');
const model_hint = document.querySelector('.preloader__item');
model_hint.addEventListener('pointerdown', () => {
  model_hint.style.display = 'none';
});

var manager = new THREE.LoadingManager();
// console.log(manager);
// manager.onStart = function (item, loaded, total) {
//   console.log('Loading started');
// };

manager.onLoad = function () {
  progressBarContainer.style.display = 'none';
  model_hint.style.display = 'flex';
};

manager.onProgress = function (item, loaded, total) {
  // console.log(item, loaded, total);
  // console.log('Loaded:', Math.round(loaded / total * 100, 2) + '%')
  progressBar.value = (loaded / total) * 100;
  // console.log((loaded / total) * 100);
};
// manager.onWarning = function (url) {
//   console.log('Warning');
// };
// manager.onError = function (url) {
//   console.log('Error loading');
// };

const font_loader = new FontLoader();
font_loader.load(
  'https://qn.edwardxwliu.cn/tesseraction/helvetiker_regular.typeface.json',
  function (font) {
    // const color = 0x006699;
    // const matDark = new THREE.LineBasicMaterial({
    //   color: color,
    //   side: THREE.DoubleSide
    // });

    const matLite = new THREE.MeshBasicMaterial({
      color: 'white',
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    });
    const shield_message = 'Anti-corrosion Shield';
    const bracket_message = 'Bracket';
    const fin_message = 'Dual Graphene Fin';
    const fan_message = 'Fan';
    const compressor_message = 'Compressor';

    const shield_shapes = font.generateShapes(shield_message, 2);
    const bracket_shapes = font.generateShapes(bracket_message, 2);
    const fin_shapes = font.generateShapes(fin_message, 2);
    const fan_shapes = font.generateShapes(fan_message, 2);
    const compressor_shapes = font.generateShapes(compressor_message, 2);

    var geometry = new THREE.ShapeGeometry(shield_shapes);
    geometry.computeBoundingBox();
    var xMid = -0.8 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);
    shield_text = new THREE.Mesh(geometry, matLite);

    geometry = new THREE.ShapeGeometry(bracket_shapes);
    geometry.computeBoundingBox();
    xMid = -0.8 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);
    bracket_text = new THREE.Mesh(geometry, matLite);

    geometry = new THREE.ShapeGeometry(fin_shapes);
    geometry.computeBoundingBox();
    xMid = -0.8 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);
    fin_text = new THREE.Mesh(geometry, matLite);

    geometry = new THREE.ShapeGeometry(fan_shapes);
    geometry.computeBoundingBox();
    xMid = -0.8 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);
    fan_text = new THREE.Mesh(geometry, matLite);

    geometry = new THREE.ShapeGeometry(compressor_shapes);
    geometry.computeBoundingBox();
    xMid = -0.8 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);
    compressor_text = new THREE.Mesh(geometry, matLite);

    scene.add(shield_text);
    scene.add(bracket_text);
    scene.add(fin_text);
    scene.add(fan_text);
    scene.add(compressor_text);
    // make line shape ( N.B. edge view remains visible )

    // const holeShapes = [];

    // for (let i = 0; i < shapes.length; i++) {

    //   const shape = shapes[i];

    //   if (shape.holes && shape.holes.length > 0) {

    //     for (let j = 0; j < shape.holes.length; j++) {

    //       const hole = shape.holes[j];
    //       holeShapes.push(hole);

    //     }

    //   }

    // }
    // shapes.push.apply(shapes, holeShapes);

    // const lineText = new THREE.Object3D();

    // for (let i = 0; i < shapes.length; i++) {

    //   const shape = shapes[i];

    //   const points = shape.getPoints();
    //   const geometry = new THREE.BufferGeometry().setFromPoints(points);

    //   geometry.translate(xMid, 0, 0);

    //   const lineMesh = new THREE.Line(geometry, matDark);
    //   lineText.add(lineMesh);

    // }

    // scene.add(lineText);

    // render();
  }
); //end load function

let tG = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
let tM = new THREE.LineBasicMaterial({ color: 'white' });
let shield_tracker = new THREE.Line(tG.clone(), tM);
let bracket_tracker = new THREE.Line(tG.clone(), tM);
let fin_tracker = new THREE.Line(tG.clone(), tM);
let fan_tracker = new THREE.Line(tG.clone(), tM);
let compressor_tracker = new THREE.Line(tG.clone(), tM);

scene.add(shield_tracker);
scene.add(bracket_tracker);
scene.add(fin_tracker);
scene.add(fan_tracker);
scene.add(compressor_tracker);

let shield_tV = new THREE.Vector3(); // temp vector for re-use
let bracket_tV = new THREE.Vector3(); // temp vector for re-use
let fin_tV = new THREE.Vector3(); // temp vector for re-use
let fan_tV = new THREE.Vector3(); // temp vector for re-use
let compressor_tV = new THREE.Vector3(); // temp vector for re-use

function init() {
  canvas = document.querySelector('#airConditioner-model');
  canvas.height = container.offsetHeight;
  canvas.width = container.offsetWidth;
  // console.log(canvas.style);
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });

  camera = new THREE.PerspectiveCamera(30, container.offsetWidth / container.offsetHeight, 1, 2000);
  if ($(window).width() > 768) {
    camera.position.set(150, 80, 200);
  } else {
    camera.position.set(150, 80, 500);
  }
  camera.lookAt(0, 0, 0);

  const hdrEquirect = new RGBELoader().load(
    'https://qn.edwardxwliu.cn/tesseraction/studio_small_06_1k.hdr',
    function () {
      hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
      // scene.background = hdrEquirect;
      // scene.enviroment = hdrEquirect;
      //init();
      // render();
    }
  );

  const outer_metal_material = new THREE.MeshPhysicalMaterial({
    color: '#c2c2c2',
    emissive: 0,
    metalness: 0.8,
    roughness: 0.2,
    envMap: hdrEquirect,
    //transmission: 1,
    reflectivity: 0.6,
    clearcoat: 1,
    clearcoatRoughness: 1,
    thickness: 1, // Add refraction!
  });

  const back_metal_material = new THREE.MeshPhysicalMaterial({
    color: '#585e6a',
    emissive: 0,
    metalness: 0.9,
    roughness: 0.25,
    envMap: hdrEquirect,
    //transmission: 1,
    reflectivity: 0.2,
    clearcoat: 0,
    clearcoatRoughness: 0,
    //thickness: 1, // Add refraction!
  });

  const plastic_material = new THREE.MeshPhysicalMaterial({
    color: '#1f3251',
    emissive: 0,
    metalness: 0,
    roughness: 0.5,
    envMap: hdrEquirect,
    //transmission: 1,
    reflectivity: 0.4,
    clearcoat: 0.2,
    clearcoatRoughness: 0.4,
  });

  const compressor_material = new THREE.MeshPhysicalMaterial({
    color: '#2e2e2e',
    transparent: true,
    opacity: 1,
    emissive: 0,
    metalness: 0.8,
    roughness: 0.25,
    envMap: hdrEquirect,
    //transmission: 1,
    reflectivity: 0.2,
    clearcoat: 0,
    clearcoatRoughness: 0,
  });

  // const fan_loader = new FBXLoader(manager);
  const loader = new FBXLoader(manager);
  // fan_loader.load('https://qn.edwardxwliu.cn/tesseraction/only%20fan.fbx', function (object) {
  //   object.traverse(function (child) {
  //     // console.log(child);
  //     if (child.isMesh) {
  //       console.log(child);
  //       if (child.name == "FAN__Y-") {
  //         child.material = plastic_material.clone();
  //         fan_y_down = child;
  //       }
  //     }
  //   });
  //   scene.add(object);
  // });

  // loader.load('https://qn.edwardxwliu.cn/tesseraction/air_condition.fbx', function (object) {
  loader.load('https://qn.edwardxwliu.cn/tesseraction/light.fbx', function (object) {
    // console.log(object);
    object.traverse(function (child) {
      // console.log(child);
      if (child.isMesh) {
        // child.castShadow = true;
        // child.receiveShadow = true;
        // child.material = metal_material.clone();
        // child.material.userData.color = child.material.color.clone(); // used for resetting
        if (child.name === 'FRONT__Y-') {
          child.material = outer_metal_material.clone();
          front_y_down = child;
          shield_helper = new THREE.BoxHelper(front_y_down, 0xff0000);
          // scene.add(shield_helper);
        } else if (child.name === 'TOP__Z+') {
          child.material = outer_metal_material.clone();
          top_z_up = child;
        } else if (child.name === 'BOTTON__Z-') {
          child.material = outer_metal_material.clone();
          botton_z_down = child;
        } else if (child.name === 'FIN_0') {
          child.material = back_metal_material.clone();
          fin_z_down = child;
          fin_helper = new THREE.BoxHelper(fin_z_down, 0xff0000);
          // scene.add(fin_helper);
        } else if (child.name === 'BRACKET__Y-') {
          // child.material = back_metal_material.clone();
          bracket_y_down = child;
          bracket_helper = new THREE.BoxHelper(bracket_y_down, 0xff0000);
          // scene.add(bracket_helper);
        } else if (child.name === 'COMPRESSOR__X+Y-') {
          child.material = compressor_material.clone();
          compressor_xy_down = child;
          compressor_helper = new THREE.BoxHelper(compressor_xy_down, 0xff0000);
          // scene.add(compressor_helper);
        } else if (child.name === 'RIGHT__X+') {
          child.material = outer_metal_material.clone();
          right_x_up = child;
        } else if (child.name === 'FAN2__Y-') {
          child.material = outer_metal_material.clone();
          fan2_y_down = child;
        } else if (child.name === 'LEFT__X-') {
          child.material = outer_metal_material.clone();
          left_x_down = child;
        } else if (child.name === 'FAN__Y-') {
          child.material = plastic_material.clone();
          fan_y_down = child;
          fan_helper = new THREE.BoxHelper(fan_y_down, 0xff0000);
          // scene.add(fan_helper);
        }
      }
    });
    // if ($(window).width() < 768) {
    //   object.scale.setScalar(container.clientWidth / container.clientHeight * 1);
    // }
    // object.scale.setScalar(container.clientWidth / container.clientHeight * 0.05);
    // object.position.set(5, 0, 0);
    // console.log(object.name);
    scene.add(object);
    // render();
    shield_text.visible = false;
    shield_tracker.visible = false;
    bracket_text.visible = false;
    bracket_tracker.visible = false;
    fin_text.visible = false;
    fin_tracker.visible = false;
    fan_text.visible = false;
    fan_tracker.visible = false;
    compressor_text.visible = false;
    compressor_tracker.visible = false;
  });

  let spotLight = new THREE.SpotLight(0xffffff, 500);
  spotLight.name = 'Spot Light';
  spotLight.angle = Math.PI / 5;
  spotLight.penumbra = 0.3;
  spotLight.position.set(100, 100, 50);
  spotLight.castShadow = true;
  spotLight.shadow.camera.near = 80;
  spotLight.shadow.camera.far = 300;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  // scene.add(spotLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 3);
  dirLight.name = 'Dir. Light';
  dirLight.position.set(0, 100, 0);
  dirLight.castShadow = true;
  dirLight.shadow.camera.near = 1;
  dirLight.shadow.camera.far = 130;
  dirLight.shadow.camera.right = 150;
  dirLight.shadow.camera.left = -150;
  dirLight.shadow.camera.top = 150;
  dirLight.shadow.camera.bottom = -150;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  // scene.add(dirLight);

  const dirLight2 = new THREE.DirectionalLight(0xffffff, 3);
  dirLight2.name = 'Dir. Light 2';
  dirLight2.position.set(50, -50, 0);
  dirLight2.castShadow = true;
  // scene.add(dirLight2);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  hemiLight.position.set(0, 150, 0);
  // scene.add(hemiLight);

  // renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.shadowMap.enabled = true;
  renderer.useLegacyLights = false;
  // canvas.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  //
  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);
  // controls.screenSpacePanning = true;
  // controls.enablePan = true;
  // controls.enableZoom = true;
  controls.minDistance = 50;
  controls.maxDistance = 700;
  // controls.target.set(0, 2, 0);
  // controls.update();

  //

  // stats = new Stats();
  // canvas.appendChild(stats.dom);

  //

  // postprocessing
  // scene.add(new THREE.AxesHelper(200));

  composer = new EffectComposer(renderer);

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  outlinePass = new OutlinePass(
    new THREE.Vector2(container.offsetWidth, container.offsetHeight),
    scene,
    camera
  );
  outlinePass.edgeStrength = 3;
  outlinePass.edgeGlow = 0;
  outlinePass.edgeThickness = 1;
  outlinePass.pulsePeriod = 0;
  outlinePass.visibleEdgeColor.set('#A0C8F0');
  outlinePass.hiddenEdgeColor.set('black');
  composer.addPass(outlinePass);

  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  // effectFXAA = new ShaderPass(FXAAShader);
  // effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
  // composer.addPass(effectFXAA);

  window.addEventListener('resize', onWindowResize);
  if ($(window).width() > 768) {
    renderer.domElement.addEventListener('mousemove', onMouseMove, true);
    renderer.domElement.addEventListener('mousedown', () => {
      model_hint.style.display = 'none';
    });
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('dblclick', onDoubleClick, true);
  } else {
    renderer.domElement.addEventListener('touchstart', tapHandler);
  }
  renderer.domElement.addEventListener('click', onClick, true);
}

function forwardAnimate() {
  anime_iter++;
  if (anime_iter < 100) {
    moveObject();
    requestAnimationFrame(forwardAnimate);
    // nodeFrame.update();
    // render();
  }
  shield_text.visible = true;
  shield_tracker.visible = true;
  bracket_text.visible = true;
  bracket_tracker.visible = true;
  fin_text.visible = true;
  fin_tracker.visible = true;
  fan_text.visible = true;
  fan_tracker.visible = true;
  compressor_text.visible = true;
  compressor_tracker.visible = true;
}

function reveseAnimate() {
  anime_iter--;
  if (anime_iter >= 0) {
    moveObjectReverse();
    requestAnimationFrame(reveseAnimate);
    // nodeFrame.update();
    // render();
  }
  shield_text.visible = false;
  shield_tracker.visible = false;
  bracket_text.visible = false;
  bracket_tracker.visible = false;
  fin_text.visible = false;
  fin_tracker.visible = false;
  fan_text.visible = false;
  fan_tracker.visible = false;
  compressor_text.visible = false;
  compressor_tracker.visible = false;
}

function moveObjectReverse() {
  var vector = direction.clone().multiplyScalar(speed, speed, speed);
  top_z_up.position.y -= vector.y * 0.5;
  botton_z_down.position.y -= -vector.y * 0.5;
  bracket_y_down.position.z -= vector.z * 0.5;
  compressor_xy_down.position.x -= vector.x * 0.7;
  compressor_xy_down.position.z -= vector.z;
  right_x_up.position.x -= vector.x * 0.7;
  fan2_y_down.position.z -= vector.z * 1.2;
  front_y_down.position.z -= vector.z * 1.1;
  left_x_down.position.x -= -vector.x * 0.7;
  fan_y_down.position.z -= vector.z * 0.8;
  fin_z_down.position.z += vector.z * 0.3;
}

function moveObject() {
  var vector = direction.clone().multiplyScalar(speed, speed, speed);
  top_z_up.position.y += vector.y * 0.5;
  botton_z_down.position.y += -vector.y * 0.5;
  bracket_y_down.position.z += vector.z * 0.5;
  compressor_xy_down.position.x += vector.x * 0.7;
  compressor_xy_down.position.z += vector.z;
  right_x_up.position.x += vector.x * 0.7;
  fan2_y_down.position.z += vector.z * 1.2;
  front_y_down.position.z += vector.z * 1.1;
  left_x_down.position.x += -vector.x * 0.7;
  fan_y_down.position.z += vector.z * 0.8;
  fin_z_down.position.z -= vector.z * 0.3;

  shield_text.position.x = front_y_down.position.x;
  shield_text.position.z = front_y_down.position.z;
  shield_text.position.y = front_y_down.position.y + 50;

  bracket_text.position.x = bracket_y_down.position.x;
  bracket_text.position.z = bracket_y_down.position.z;
  bracket_text.position.y = bracket_y_down.position.y + 50;

  fin_text.position.x = fin_z_down.position.x;
  fin_text.position.z = fin_z_down.position.z - 20;
  fin_text.position.y = fin_z_down.position.y + 50;

  fan_text.position.x = fan_y_down.position.x;
  fan_text.position.z = fan_y_down.position.z;
  fan_text.position.y = fan_y_down.position.y - 50;

  compressor_text.position.x = compressor_xy_down.position.x + 25;
  compressor_text.position.z = compressor_xy_down.position.z;
  compressor_text.position.y = compressor_xy_down.position.y - 50;
}

function onWindowResize() {
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  composer.setSize(container.offsetWidth, container.offsetHeight);
  // render();
}

function onDoubleClick() {
  // if (text.isMesh) {
  //   scene.remove(text);
  // }
  if (!anime_reverse) {
    forwardAnimate();
  } else {
    // resetColor();
    reveseAnimate();
  }
  anime_reverse = !anime_reverse;
}

function tapHandler(event) {
  // var mouseX = +(event.targetTouches[0].clientX / window.innerWidth) * 2 + -1;
  // var mouseY = -(event.targetTouches[0].clientY / window.innerHeight) * 2 + 1;
  var mouseX = +(event.targetTouches[0].clientX / container.offsetWidth) * 2 + -1;
  var mouseY = -(event.targetTouches[0].clientY / container.offsetHeight) * 2 + 1;
  // var mouseX = event.targetTouches[0].clientX;
  // var mouseY = event.targetTouches[0].clientY;
  model_hint.style.display = 'none';
  if (!tapedTwice) {
    tapedTwice = true;
    setTimeout(function () {
      tapedTwice = false;
    }, 300);
    pre_mouseX = mouseX;
    pre_mouseY = mouseY;
    return false;
  }
  event.preventDefault();
  //action on double tap goes below
  // console.log(mouseX, pre_mouseX, mouseY, pre_mouseY, Math.abs(mouseX - pre_mouseX) / 2, Math.abs(mouseY - pre_mouseY) / 2);
  if (
    Math.abs(mouseX - pre_mouseX) / 2 < 0.2 &&
    Math.abs(mouseY - pre_mouseY) / 2 < 0.2 &&
    Math.abs(mouseX - pre_mouseX) / 2 > 0 &&
    Math.abs(mouseY - pre_mouseY) / 2 > 0
  ) {
    if (!anime_reverse) {
      forwardAnimate();
    } else {
      // resetColor();
      reveseAnimate();
    }
    anime_reverse = !anime_reverse;
  }
  // alert('You tapped me Twice !!!');
}

function onClick(event) {
  if (!anime_reverse) {
    return false;
  }
  var rect = renderer.domElement.getBoundingClientRect();
  mousePosition.x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
  mousePosition.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
  raycaster.setFromCamera(mousePosition, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  // console.log(intersects[0].object);
  if (intersects.length > 0 && intersects[0].object.name === 'COMPRESSOR__X+Y-') {
    playVideo();
  }
}

function onMouseMove(event) {
  if (anime_reverse) {
    controls.enabled = true;
    return false;
  }
  var rect = renderer.domElement.getBoundingClientRect();
  mousePosition.x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
  mousePosition.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
  raycaster.setFromCamera(mousePosition, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  controls.enabled = intersects.length > 0;
}

function onPointerMove(event) {
  if (!anime_reverse) {
    return false;
  }
  var rect = renderer.domElement.getBoundingClientRect();
  mousePosition.x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
  mousePosition.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
  raycaster.setFromCamera(mousePosition, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (hover_interact_ct !== intersects.length) {
    hover_interact_ct = intersects.length;
    // resetColor();
  }

  if (intersects.length > 0) {
    const selectedObject = intersects[0].object;
    // console.log(outlinePass.visibleEdgeColor);
    // console.log(selectedObjects);
    // console.log(object);
    //object.material.color.set('#1F94D2');
    addSelectedObject(selectedObject);
    outlinePass.selectedObjects = selectedObjects;
    if (selectedObject.name === 'COMPRESSOR__X+Y-') {
      opacity_change = false;
      compressor_xy_down.material.opacity = 1;
    } else {
      opacity_change = true;
    }
  } else {
    // resetColor();
    outlinePass.selectedObjects = [];
    opacity_change = true;
  }
  // render();
}

// function resetColor() {
//   scene.traverse(function (object) {

//     if (object.isMesh === true) object.material.color.copy(object.material.userData.color);

//   });
// }

// const popup_play_buttons = document.getElementsByClassName("item-link");
const popup_close_buttons = document.getElementsByClassName('popup-close-simple');
const popup_close_bg = document.getElementsByClassName('popup-background-simple');

for (var i = 0; i < popup_close_buttons.length; i++) {
  // popup_close_buttons[i].onclick = pauseVideo;
  popup_close_buttons[i].addEventListener('click', pauseVideo);
  popup_close_bg[i].addEventListener('click', pauseVideo);
}

// compressor_xy_down.addEventListener("click", playVideo);

function playVideo() {
  // var target = (e && e.target) || (event && event.srcElement);
  // while (target) {
  //   if (target.classList.contains('grid-item')) {
  //     break;
  //   }
  //   // Note: May want parentElement here instead.
  //   target = target.parentNode;
  // }
  // target.getElementsByClassName('popup-video')[1].play();
  document.getElementsByClassName('popup-wrapper')[0].style.display = 'block';
  document.getElementsByClassName('popup-video')[1].play();
}

function pauseVideo() {
  // var target = (e && e.target) || (event && event.srcElement);
  // while (target) {
  //   if (target.classList.contains('popup-inner')) {
  //     break;
  //   }
  //   // Note: May want parentElement here instead.
  //   target = target.parentNode;
  // }
  // target.getElementsByClassName('popup-video')[1].pause();
  // document.getElementsByClassName('popup-wrapper')[0].style.display = 'hide';
  document.getElementsByClassName('popup-video')[1].pause();
}
function addSelectedObject(object) {
  selectedObjects = [];
  selectedObjects.push(object);
}

function updateTracker() {
  shield_helper.update();
  bracket_helper.update();
  fin_helper.update();
  fan_helper.update();
  compressor_helper.update();

  let shield_oP = shield_text.position;
  let shield_tP = front_y_down.position;
  let shield_d = shield_oP.distanceTo(shield_tP);
  shield_tV
    .subVectors(shield_tP, shield_oP)
    .normalize()
    .multiplyScalar(shield_d - shield_helper.geometry.attributes.position.getY(0))
    .add(shield_oP);

  shield_tracker.geometry.attributes.position.setXYZ(
    0,
    shield_oP.x,
    shield_oP.y - 2,
    shield_oP.z + 5
  );
  shield_tracker.geometry.attributes.position.setXYZ(
    1,
    shield_tV.x,
    shield_tV.y + 2,
    shield_tV.z + 5
  );
  shield_tracker.geometry.attributes.position.needsUpdate = true;

  let bracket_oP = bracket_text.position;
  let bracket_tP = bracket_y_down.position;
  let bracket_d = bracket_oP.distanceTo(bracket_tP);
  bracket_tV
    .subVectors(bracket_tP, bracket_oP)
    .normalize()
    .multiplyScalar(bracket_d - bracket_helper.geometry.attributes.position.getY(0))
    .add(bracket_oP);

  bracket_tracker.geometry.attributes.position.setXYZ(
    0,
    bracket_oP.x,
    bracket_oP.y - 2,
    bracket_oP.z
  );
  bracket_tracker.geometry.attributes.position.setXYZ(
    1,
    bracket_tV.x,
    bracket_tV.y + 2,
    bracket_tV.z
  );
  bracket_tracker.geometry.attributes.position.needsUpdate = true;

  let fin_oP = fin_text.position;
  let fin_tP = fin_z_down.position;
  let fin_d = fin_oP.distanceTo(fin_tP);
  fin_tV
    .subVectors(fin_tP, fin_oP)
    .normalize()
    .multiplyScalar(fin_d - fin_helper.geometry.attributes.position.getY(0))
    .add(fin_oP);

  fin_tracker.geometry.attributes.position.setXYZ(0, fin_oP.x, fin_oP.y - 2, fin_oP.z + 11);
  fin_tracker.geometry.attributes.position.setXYZ(1, fin_tV.x, fin_tV.y + 4, fin_tV.z);
  fin_tracker.geometry.attributes.position.needsUpdate = true;

  let fan_oP = fan_text.position;
  let fan_tP = fan_y_down.position;
  let fan_d = fan_oP.distanceTo(fan_tP);
  // console.log(fan_helper.geometry.attributes.position.getY(0))
  fan_tV
    .subVectors(fan_tP, fan_oP)
    .normalize()
    .multiplyScalar(fan_d - 21)
    .add(fan_oP);

  fan_tracker.geometry.attributes.position.setXYZ(0, fan_oP.x, fan_oP.y + 4, fan_oP.z);
  fan_tracker.geometry.attributes.position.setXYZ(1, fan_tV.x, fan_tV.y - 4, fan_tV.z);
  fan_tracker.geometry.attributes.position.needsUpdate = true;

  let compressor_oP = compressor_text.position;
  let compressor_tP = compressor_xy_down.position;
  let compressor_d = compressor_oP.distanceTo(compressor_tP);
  compressor_tV
    .subVectors(compressor_tP, compressor_oP)
    .normalize()
    .multiplyScalar(compressor_d - compressor_helper.geometry.attributes.position.getY(4))
    .add(compressor_oP);

  compressor_tracker.geometry.attributes.position.setXYZ(
    0,
    compressor_oP.x,
    compressor_oP.y + 4,
    compressor_oP.z
  );
  compressor_tracker.geometry.attributes.position.setXYZ(
    1,
    compressor_tV.x + 22,
    compressor_tV.y - 16,
    compressor_tV.z
  );
  compressor_tracker.geometry.attributes.position.needsUpdate = true;
}

function observe_animate() {
  const observerOptions = {
    root: null, // Use the viewport as the root
    threshold: 0.5, // The callback is triggered as soon as the target enters or exits the viewport
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Start rendering when the canvas wrapper div is in view
        animate();
      } else {
        // Stop rendering when the canvas wrapper div goes out of view
        // You can optionally pause or clear the renderer here to save resources
        cancelAnimationFrame(requestId);
      }
    });
  }, observerOptions);

  // Start observing the canvas wrapper div
  observer.observe(container);
}

var opacity_gap = 0.01;
var opacity_increase = true;
var opacity_change = true;
function animate() {
  // text.quaternion.copy(camera.quaternion);

  requestId = requestAnimationFrame(animate);
  shield_text.lookAt(camera.position);
  bracket_text.lookAt(camera.position);
  fin_text.lookAt(camera.position);
  fan_text.lookAt(camera.position);
  compressor_text.lookAt(camera.position);

  updateTracker();

  // fan_y_down.rotation.y += 0.03;
  fan_y_down.rotateY(0.15);
  // compressor_xy_down.material.color.set("#284664");
  if (opacity_change) {
    if (!opacity_increase) {
      compressor_xy_down.material.opacity -= opacity_gap;
    } else {
      compressor_xy_down.material.opacity += opacity_gap;
    }
    if (compressor_xy_down.material.opacity <= 0.5) {
      opacity_increase = true;
    } else if (compressor_xy_down.material.opacity >= 1) {
      opacity_increase = false;
    }
  }
  // nodeFrame.update();
  render();
  // stats.update();
}

function render() {
  composer.render();
  // renderer.render(scene, camera);
}

export { init, observe_animate };
