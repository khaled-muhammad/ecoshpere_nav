// Create a scene
const scene = new THREE.Scene();

// Set up a camera with field of view, aspect ratio, and near/far clipping planes
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000); // Lower FOV

// Create a WebGL renderer and set its size to full window
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a sphere geometry (the Earth), set its size and segments
const geometry = new THREE.SphereGeometry(5, 64, 64); // Increase radius and segments for better quality

// Load an Earth texture (you can find an Earth texture online)
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('../imgs/8k_earth_nightmap.jpg'); // Replace with actual path

// Apply the texture to the material
const material = new THREE.MeshBasicMaterial({ map: earthTexture });

// Create a mesh with the geometry and material (Earth model)
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Set camera position
camera.position.z = 7; // Bring the camera closer for a zoomed-in effect

// Animate the Earth rotation
function animate() {
  requestAnimationFrame(animate);

  // Rotate the Earth
  earth.rotation.y += 0.001;

  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});


const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 3, 5);
scene.add(light);