import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// =================================================================
// SECTION 1: ADVANCED THREE.JS BACKGROUND (REWRITTEN WITH INSTANCEDMESH)
// =================================================================

let camera, controls, scene, renderer;
const instances = []; // This will hold our InstancedMesh objects
const OBJECT_COUNT_PER_TYPE = 2000; // 2000 cones, 2000 boxes, etc.
const DYNAMIC_COUNT_PER_TYPE = 500;

function initThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.z = 30;
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animateThreeJS);
    document.body.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2;
    controls.enableZoom = false;
    controls.enablePan = false;
    initInstancedMeshes();
    window.addEventListener('resize', onWindowResize);
}

// REWRITTEN to use the stable InstancedMesh API
function initInstancedMeshes() {
    const geometries = [
        new THREE.ConeGeometry(0.4, 0.8, 8),
        new THREE.BoxGeometry(0.8, 0.8, 0.8),
        new THREE.SphereGeometry(0.6, 16, 8),
    ];
    const material = new THREE.MeshNormalMaterial();
    const matrix = new THREE.Matrix4();

    // Create one InstancedMesh for each type of geometry
    geometries.forEach(geometry => {
        const mesh = new THREE.InstancedMesh(geometry, material, OBJECT_COUNT_PER_TYPE);
        mesh.userData.rotationSpeeds = [];

        for (let i = 0; i < OBJECT_COUNT_PER_TYPE; i++) {
            // Set a random starting position for each instance
            randomizeMatrix(matrix);
            mesh.setMatrixAt(i, matrix);

            // Store a random rotation speed for animation
            const rotationSpeed = new THREE.Euler(
                Math.random() * 0.01,
                Math.random() * 0.01,
                Math.random() * 0.01
            );
            mesh.userData.rotationSpeeds.push(rotationSpeed);
        }
        
        scene.add(mesh);
        instances.push(mesh); // Add the new mesh to our list for animation
    });
}

function randomizeMatrix(matrix) {
    const pos = new THREE.Vector3(), rot = new THREE.Euler(), quat = new THREE.Quaternion(), scale = new THREE.Vector3();
    pos.x = Math.random() * 40 - 20; pos.y = Math.random() * 40 - 20; pos.z = Math.random() * 40 - 20;
    rot.x = Math.random() * 2 * Math.PI; rot.y = Math.random() * 2 * Math.PI; rot.z = Math.random() * 2 * Math.PI;
    quat.setFromEuler(rot);
    scale.x = scale.y = scale.z = 0.2 + (Math.random() * 0.8);
    return matrix.compose(pos, quat, scale);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animateThreeJS() {
    const matrix = new THREE.Matrix4();
    const rotation = new THREE.Euler();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    // Animate each set of instances (cones, boxes, spheres)
    instances.forEach(mesh => {
        for (let i = 0; i < DYNAMIC_COUNT_PER_TYPE; i++) {
            // Get the current matrix of the instance
            mesh.getMatrixAt(i, matrix);
            matrix.decompose(new THREE.Vector3(), quaternion, new THREE.Vector3()); // We only need the rotation
            
            // Get its stored rotation speed
            const speed = mesh.userData.rotationSpeeds[i];
            rotation.setFromQuaternion(quaternion);
            
            // Apply the rotation
            rotation.x += speed.x;
            rotation.y += speed.y;
            rotation.z += speed.z;
            
            // Re-compose the matrix with the new rotation
            matrix.decompose(pos, new THREE.Quaternion(), scale);
            quaternion.setFromEuler(rotation);
            matrix.compose(pos, quaternion, scale);

            mesh.setMatrixAt(i, matrix);
        }
        // Tell three.js to update the positions in the next frame
        mesh.instanceMatrix.needsUpdate = true;
    });

    controls.update();
    renderer.render(scene, camera);
}
initThreeJS();

// =================================================================
// SECTION 2: CARD CAROUSEL LOGIC
// =================================================================
window.addEventListener('load', () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    const cards = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    const container = document.querySelector('.carousel-container');
    let activeIndex = 0;

    function moveToCard(targetIndex) {
        if (!cards.length || !cards[targetIndex]) return;
        const currentCard = cards[activeIndex], targetCard = cards[targetIndex];
        const containerWidth = container.offsetWidth, cardWidth = targetCard.offsetWidth, cardMargin = 15;
        const totalCardWidth = cardWidth + (cardMargin * 2);
        const newPosition = (containerWidth / 2) - (totalCardWidth / 2) - (targetIndex * totalCardWidth);
        track.style.transform = `translateX(${newPosition}px)`;
        currentCard.classList.remove('active');
        targetCard.classList.add('active');
        activeIndex = targetIndex;
    }
    nextButton.addEventListener('click', () => { moveToCard((activeIndex + 1) % cards.length); });
    prevButton.addEventListener('click', () => { moveToCard((activeIndex - 1 + cards.length) % cards.length); });
    cards.forEach((card, index) => { card.addEventListener('click', () => { moveToCard(index); }); });
    setTimeout(() => { moveToCard(0); }, 100);
});

// A helper function to extract components from a matrix, needed for animation
const pos = new THREE.Vector3();
function randomizeRotationSpeed(rot) { rot.x = Math.random() * 0.01; rot.y = Math.random() * 0.01; rot.z = Math.random() * 0.01; return rot; }