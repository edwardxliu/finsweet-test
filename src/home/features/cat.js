import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import Stats from 'three/addons/libs/stats.module.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
// import { nodeFrame } from 'three/addons/renderers/webgl/nodes/WebGLNodes.js';

let canvas, clock, controls;
let camera, renderer, mixer, particleLight;
const scene = new THREE.Scene();
let pre_mouseX, pre_mouseY;
let tapedTwice = false;
let timer = 0;
let anime_forward = true;
let cat_left_arm;
let requestId;

const container = document.getElementById('contact-container');
const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.querySelector('.progress-bar-container');

const manager = new THREE.LoadingManager();

manager.onLoad = function () {
  progressBarContainer.style.display = 'none';
};

manager.onProgress = function (item, loaded, total) {
  progressBar.value = (loaded / total) * 100;
};

function init() {
  canvas = document.querySelector('#bubble');
  canvas.height = container.offsetHeight;
  canvas.width = container.offsetWidth;
  // console.log(canvas.style);
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(100, 50, 150);

  clock = new THREE.Clock();

  const wall_texture = new THREE.TextureLoader().load(
    'https://uploads-ssl.webflow.com/649802b639d4f2cdad48d8db/64b64138ad558e5a9292da54_wall_texture.webp'
  );

  const tail_material = new THREE.MeshPhysicalMaterial({
    roughness: 1,
    clearcoat: 1,
    clearcoatRoughness: 1,
    transmission: 0,
    thickness: 1, // Add refraction!
    //roughnessMap: brick_diffuse,
    reflectivity: 0,
    color: 0x505050,
    map: wall_texture,
  });

  const body_material = new THREE.MeshLambertMaterial({ color: 'white' });
  const metal_material = new THREE.MeshPhysicalMaterial({
    color: 0xffa500,
    emissive: 0,
    metalness: 0.8,
    roughness: 0.2,
    //transmission: 1,
    reflectivity: 0.6,
    clearcoat: 1,
    clearcoatRoughness: 1,
    thickness: 1, // Add refraction!
  });

  const loader = new FBXLoader(manager);
  // loader.load('https://edwardxliu.github.io/media/3d-model/cat3.fbx', function (object) {
  loader.load('https://qn.edwardxwliu.cn/cat%20fix.fbx', function (object) {
    // console.log(object);
    object.traverse(function (child) {
      if (child.isMesh) {
        // console.log(child);
        // child.castShadow = true;
        // child.receiveShadow = true;
        if (child.name === 'cat3') {
          cat_left_arm = child;
        }
        if (child.name === 'cat1003' || child.name === 'cat2' || child.name === 'cat3') {
          child.material = body_material;
        } else if (child.name === 'Coin_Dollar_1,5_cm') {
          child.material = metal_material;
        } else if (child.name === 'cat4') {
          child.material = tail_material;
        }
      }
    });
    // console.log(container.offsetWidth, container.offsetHeight);
    if ($(window).width() > 768) {
      object.scale.setScalar((container.clientWidth / container.clientHeight) * 0.05);
    } else {
      object.scale.setScalar((container.clientWidth / container.clientHeight) * 0.1);
    }
    object.position.set(0, -50, 0);

    // object.position.set(60, -30, 0);
    // object.addEventListener('touchstart', () => {
    //   touchingObject = true;
    //   controls.enabled = true;
    // });

    // object.addEventListener('touchend', () => {
    //   touchingObject = false;
    //   controls.enabled = false;
    // });
    scene.add(object);
  });

  // const gridHelper = new THREE.GridHelper(10, 20, 0xc1c1c1, 0x8d8d8d);
  // scene.add(gridHelper);

  // const ambientLight = new THREE.AmbientLight(0x404040, 1);
  // scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 500);
  spotLight.name = 'Spot Light';
  spotLight.angle = Math.PI / 5;
  spotLight.penumbra = 0.3;
  spotLight.position.set(100, 100, 50);
  spotLight.castShadow = true;
  spotLight.shadow.camera.near = 80;
  spotLight.shadow.camera.far = 300;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  scene.add(spotLight);
  // scene.add(new THREE.CameraHelper(spotLight.shadow.camera));
  // scene.add(new THREE.CameraHelper(shadowLight.shadow.camera));

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
  scene.add(dirLight);
  // scene.add(new THREE.CameraHelper(dirLight.shadow.camera));

  const dirLight2 = new THREE.DirectionalLight(0xffffff, 3);
  dirLight2.name = 'Dir. Light 2';
  dirLight2.position.set(50, -50, 0);
  dirLight2.castShadow = true;
  scene.add(dirLight2);
  // const dl_helper = new THREE.DirectionalLightHelper(dirLight2, 50, "red");
  // scene.add(dl_helper);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  hemiLight.position.set(0, 150, 0);
  scene.add(hemiLight);

  // const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 30);
  // scene.add(hemiLightHelper);

  particleLight = new THREE.Mesh(
    new THREE.SphereGeometry(1, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  scene.add(particleLight);

  particleLight.add(new THREE.PointLight(0xffffff, 3000));

  /*--------------------
  Plane
  --------------------*/

  // const planeGeometry = new THREE.PlaneGeometry(200, 200);
  // const planeMaterial = new THREE.ShadowMaterial({
  //   opacity: 0.3,
  // })
  // const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  // plane.position.y = -25;
  // plane.position.x = 0;
  // plane.position.z = 0;
  // plane.rotation.x = Math.PI / 180 * -90;
  // plane.receiveShadow = true;
  // scene.add(plane);

  // renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.useLegacyLights = false;
  // canvas.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  //
  controls = new OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = true;
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.minDistance = 50;
  controls.maxDistance = 500;
  controls.target.set(0, 2, 0);
  controls.update();

  //

  // stats = new Stats();
  // canvas.appendChild(stats.dom);

  //

  window.addEventListener('resize', onWindowResize);
  // renderer.domElement.addEventListener('pointerdown', onPointerDown);
  if ($(window).width() > 768) {
    renderer.domElement.addEventListener('mousemove', onMouseMove, true);
  } else {
    // controls.enabled = false;
    renderer.domElement.addEventListener('touchstart', tapHandler);
  }
  // renderer.domElement.addEventListener('onTouchStart', (event) => {
  //   event.preventDefault();
  // });
  // renderer.domElement.addEventListener('touchmove', onTouchMove, true);
  // renderer.domElement.addEventListener('touchstart', onTouchStart, true);

  // renderer.domElement.addEventListener('touchmove', (event) => {
  //   if (!touchingObject) return; // If not touching the object, do nothing.

  //   // Check if the touch position is still inside the object's bounding box.
  //   const touchX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
  //   const touchY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;

  //   // Raycast to check if the touch intersects with the object.
  //   const raycaster = new THREE.Raycaster();
  //   const mouse = new THREE.Vector2(touchX, touchY);
  //   raycaster.setFromCamera(mouse, camera);

  //   const intersects = raycaster.intersectObject(cat);
  //   if (intersects.length > 0) {
  //     // Touch is still inside the object's area.
  //     touchingObject = true;
  //   } else {
  //     // Touch has moved outside the object's area.
  //     touchingObject = false;
  //     controls.enabled = false;
  //   }
  // });
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
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

function animate() {
  requestId = requestAnimationFrame(animate);

  if (anime_forward) {
    cat_left_arm.rotation.x += 0.02;
    timer++;
    if (timer >= 50) {
      anime_forward = false;
    }
  } else {
    cat_left_arm.rotation.x -= 0.02;
    timer--;
    if (timer <= -0.79) {
      anime_forward = true;
    }
  }
  // nodeFrame.update();
  render();
  // stats.update();
}

function render() {
  const delta = clock.getDelta();

  if (mixer !== undefined) {
    mixer.update(delta);
  }

  const t = Date.now() * 0.00025;

  if ($(window).width() > 768) {
    particleLight.position.x = Math.sin(t * 7) * 50;
    particleLight.position.y = Math.cos(t * 5) * 50 - 50;
    particleLight.position.z = Math.cos(t * 3) * 50;
  } else {
    particleLight.position.x = Math.sin(t * 7) * 25;
    particleLight.position.y = Math.cos(t * 5) * 25 - 25;
    particleLight.position.z = Math.cos(t * 3) * 25;
  }

  renderer.render(scene, camera);
}

function onMouseMove(event) {
  const mousePosition = new THREE.Vector3(0, 0, 0.5);
  const rect = renderer.domElement.getBoundingClientRect();
  mousePosition.x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
  mousePosition.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
  mousePosition.unproject(camera);
  const raycaster = new THREE.Raycaster(
    camera.position,
    mousePosition.sub(camera.position).normalize()
  );
  const intersects = raycaster.intersectObjects(scene.children);
  controls.enabled = intersects.length > 0;
}

// function onTouchStart(event) {
//   event.preventDefault();
//   // var mousePosition = new THREE.Vector3(0, 0, 0.5);
//   // mousePosition.x = 2 * (event.touches[0].pageX / window.innerWidth) - 1;
//   // mousePosition.y = 1 - 2 * (event.touches[0].pageY / window.innerHeight);
//   // mousePosition.x = +(event.targetTouches[0].pageX / window.innerWidth) * 2 + -1;
//   // mousePosition.y = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;
//   // mousePosition.unproject(camera);

//   // var projector = new THREE.Projector();
//   var mouseX = +(event.targetTouches[0].pageX / window.innerWidth) * 2 + -1;
//   var mouseY = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;
//   var vector = new THREE.Vector3(mouseX, mouseY, 1);

//   // projector.unproject(vector, camera);
//   vector.unproject(camera);
//   var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
//   var intersects = ray.intersectObjects(scene.children);

//   // var raycaster = new THREE.Raycaster(camera.position, mousePosition.sub(camera.position).normalize());
//   // var intersects = raycaster.intersectObjects(scene.children);
//   console.log(intersects.length, mouseX, mouseY);

//   controls.enabled = intersects.length > 0;
// }

function tapHandler(event) {
  const mouseX = +(event.targetTouches[0].clientX / window.innerWidth) * 2 + -1;
  const mouseY = -(event.targetTouches[0].clientY / window.innerHeight) * 2 + 1;

  // var mouseX = event.targetTouches[0].clientX;
  // var mouseY = event.targetTouches[0].clientY;
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
  if (
    Math.abs(mouseX - pre_mouseX) / 2 < 0.2 &&
    Math.abs(mouseY - pre_mouseY) / 2 < 0.2 &&
    Math.abs(mouseX - pre_mouseX) / 2 > 0 &&
    Math.abs(mouseY - pre_mouseY) / 2 > 0
  ) {
    controls.enabled = !controls.enabled;
    // console.log(mouseX, pre_mouseX, mouseY, pre_mouseY, Math.abs(mouseX - pre_mouseX) / 2, Math.abs(mouseY - pre_mouseY) / 2);

    if (controls.enabled) {
      $('#bubble').css('touch-action', 'none');
      // canvas.style[2] = 'none';
    } else {
      $('#bubble').css('touch-action', 'auto');
      // canvas.style[2] = 'auto !important';
    }
  }
  // alert('You tapped me Twice !!!');
}

export { init, observe_animate };
