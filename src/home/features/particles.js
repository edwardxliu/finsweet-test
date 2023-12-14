import * as THREE from 'three';

let canvas, camera, scene, renderer, parameters;
let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let requestId;

const materials = [];
const container = document.getElementById("banner-container");
// console.log(container.offsetWidth, container.offsetHeight, windowHalfX, windowHalfY, window.innerWidth, window.innerHeight);
// init();
// animate();

function init() {

  canvas = document.querySelector('#banner-canvas');
  canvas.height = container.offsetHeight;
  canvas.width = container.offsetWidth;
  // console.log(canvas);
  let width = canvas.height,
    height = canvas.width;
  // console.log(width, height);
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 1400;

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.0008);

  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  const textureLoader = new THREE.TextureLoader();

  const assignSRGB = (texture) => {

    texture.colorSpace = THREE.SRGBColorSpace;

  };

  const ball = textureLoader.load('https://uploads-ssl.webflow.com/649802b639d4f2cdad48d8db/64b9f2173b619fe50ee27ea9_ball.webp', assignSRGB);
  const disc = textureLoader.load('https://uploads-ssl.webflow.com/649802b639d4f2cdad48d8db/64b9f217e1ae7e98fce71d13_disc.webp', assignSRGB);
  const circle = textureLoader.load('https://uploads-ssl.webflow.com/649802b639d4f2cdad48d8db/64b9f2173b619fe50ee27df1_circle.webp', assignSRGB);
  const spark = textureLoader.load('https://uploads-ssl.webflow.com/649802b639d4f2cdad48d8db/64b9f2176beddb56d427c607_spark1.webp', assignSRGB);
  const snowflake = textureLoader.load('https://uploads-ssl.webflow.com/649802b639d4f2cdad48d8db/64b9e16942f7724f06ee984f_snowflake4.webp', assignSRGB);

  for (let i = 0; i < 10000; i++) {

    const x = Math.random() * 2000 - 1000;
    const y = Math.random() * 2000 - 1000;
    const z = Math.random() * 2000 - 1000;

    vertices.push(x, y, z);

  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  parameters = [
    [[1.0, 0.2, 0.5], disc, 6],
    [[0.95, 0.1, 0.5], circle, 5],
    [[0.90, 0.05, 0.5], ball, 4],
    [[0.85, 0, 0.5], snowflake, 3],
    [[0.80, 0, 0.5], spark, 3]
  ];

  for (let i = 0; i < parameters.length; i++) {

    const color = parameters[i][0];
    const sprite = parameters[i][1];
    const size = parameters[i][2];

    materials[i] = new THREE.PointsMaterial({
      size: size,
      map: sprite,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true
    });
    materials[i].color.setHSL(color[0], color[1], color[2], THREE.SRGBColorSpace);

    const particles = new THREE.Points(geometry, materials[i]);

    particles.rotation.x = Math.random() * 6;
    particles.rotation.y = Math.random() * 6;
    particles.rotation.z = Math.random() * 6;

    scene.add(particles);

  }

  //

  // renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.useLegacyLights = false;
  // document.body.appendChild(renderer.domElement);

  //



  // document.body.style.touchAction = 'none';
  document.body.addEventListener('pointermove', onPointerMove);

  //

  window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function onPointerMove(event) {

  if (event.isPrimary === false) return;

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

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

  render();

}

function render() {

  const time = Date.now() * 0.00005;

  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (- mouseY - camera.position.y) * 0.05;

  camera.lookAt(scene.position);

  for (let i = 0; i < scene.children.length; i++) {

    const object = scene.children[i];
    if (object instanceof THREE.Points) {
      // console.log(object.rotation);

      object.rotation.y = time * (i < 4 ? i + 1 : - (i + 1));
      // object.material.opacity = Math.abs(1 / object.rotation.y * time / 2)
      // console.log(object.color);
    }

  }

  for (let i = 0; i < materials.length; i++) {

    const color = parameters[i][0];

    const h = (360 * (color[0] + time) % 360) / 360;
    materials[i].color.setHSL(h, color[1], color[2], THREE.SRGBColorSpace);
  }

  renderer.render(scene, camera);

}

export { init, observe_animate };