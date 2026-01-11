import './style.css'
import * as THREE from 'three'
import { reduceVertices } from 'three/examples/jsm/utils/SceneUtils.js';
import { add, array } from 'three/tsl';
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
    alpha: true
});


const betterLightingTM = new THREE.AmbientLight(0xfffff, 0.5);
scene.add(betterLightingTM);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const texture = new THREE.TextureLoader().load('/imagetexture.png')
texture.anisotropy = renderer.capabilities.getMaxAnisotropy
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {map: texture} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const donut_geo = new THREE.TorusGeometry(10, 3, 16, 100);
const donut_tex = new THREE.MeshBasicMaterial({color: 0xffffff});
const donut = new THREE.Mesh(donut_geo, donut_tex);
scene.add(donut);
camera.position.z = 18;

function animate() {
    requestAnimationFrame(animate);

    donut.rotation.x += 0.005;
    donut.rotation.y += 0.005;

  renderer.render( scene, camera );

}

function add_star() {
    const star_geometery = new THREE.SphereGeometry(0.25, 24, 24);
    const star_material = new THREE.MeshBasicMaterial({color: 0xffffff})
    const star = new THREE.Mesh(star_geometery, star_material);
    
    const [x,y,z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(200));

        star.position.set(x,y,z);
        scene.add(star);
}

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    cube.rotation.y += 0.01
    cube.rotation.x += 0.01

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0000;
}
document.body.onscroll = moveCamera;
moveCamera();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

Array(200).fill().forEach(add_star);
animate();
