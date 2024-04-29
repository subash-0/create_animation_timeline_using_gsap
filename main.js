import * as THREE from 'three';
import { GLTFLoader, SkeletonUtils } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';
    const renderer = new THREE.WebGLRenderer({antialias:true});
    document.body.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0XA3A3A3A3);


const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
);
camera.position.set(0,2,5);
camera.lookAt(0,0,0);
const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff,2);
const directionLight = new THREE.DirectionalLight(0xffffff,3);
scene.add(directionLight)
scene.add(ambientLight)
const boxMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:'green'})
)
scene.add(boxMesh)
const gridHelper = new THREE.GridHelper(20,20);
scene.add(gridHelper)

const phoenixLoader = new GLTFLoader();
let mixer1;
let mixer2;
let mixer3;
phoenixLoader.load("./assests/phoenix_bird/scene.gltf",(gltf)=>{
    const model = gltf.scene;
    model.scale.set(0.004,0.004,0.004);
    const model22 = SkeletonUtils.clone(model)
    const model32 = SkeletonUtils.clone(model)
    scene.add(model)
    scene.add(model22)
    scene.add(model32);

    model22.position.set(2,-1,3);
    model32.position.set(-2, 2,-2);

    
        

})


window.addEventListener( "mousedown" ,(e)=>{
    gsap.to(camera.position,{
        z:14,
        y:5,
        duration:1.5,
        onUpdate:()=>{
            camera.lookAt(0,0,0)
        }
    })
})



function animate(){
   renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize',(e)=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
})