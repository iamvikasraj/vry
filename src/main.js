import * as THREE from 'three';
import { gsap } from 'gsap';

// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

// Setup renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.getElementById('app').prepend(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add point light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Create animated geometry
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({
  color: 0x3b82f6,
  wireframe: true,
  transparent: true,
  opacity: 0.3
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Position camera
camera.position.z = 50;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

// Start animation
animate();

// GSAP Animations
gsap.from('.heading', {
  duration: 1,
  y: 30,
  opacity: 0,
  ease: 'power3.out'
});

gsap.from('.social-links a', {
  duration: 0.8,
  y: 20,
  opacity: 0,
  stagger: 0.1,
  ease: 'power2.out',
  delay: 0.5
}); 