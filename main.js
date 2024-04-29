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
camera.position.set(10,0,20);
const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff,2);
const directionLight = new THREE.DirectionalLight(0xffffff,3);
scene.add(directionLight)
scene.add(ambientLight)
// const boxMesh = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({color:'green'})
// )
// scene.add(boxMesh)
// const gridHelper = new THREE.GridHelper(20,20);
// scene.add(gridHelper)

const phoenixLoader = new GLTFLoader();
let mixer1;
let mixer2;
let mixer3;
phoenixLoader.load("./assests/phoenix_bird/scene.gltf",(gltf)=>{
    const model = gltf.scene;
    model.scale.set(0.008,0.008,0.008);
    const model22 = SkeletonUtils.clone(model)
    const model32 = SkeletonUtils.clone(model)
    scene.add(model)
    scene.add(model22)
    scene.add(model32);

    model22.position.set(5,-4,3);
    model32.position.set(-5, 4,-2);
    mixer1 = new THREE.AnimationMixer(model);
    mixer2 = new THREE.AnimationMixer(model22);
    mixer3 = new THREE.AnimationMixer(model32);
    const clips = gltf.animations;
    console.log(clips)
    const clip = THREE.AnimationClip.findByName(clips,"Take 001");

    const action1 = mixer1.clipAction(clip);
    const action2 = mixer2.clipAction(clip);
    const action3 = mixer3.clipAction(clip);
    
    action1.play();
    action1.timeScale =0.5;
    action2.play();
    action2.timeScale =0.5;
    action2.startAt(0.2);
    action3.play();
    action3.timeScale =0.5;
    action3.startAt(0.35);
    window.addEventListener( "mouseover" , cameraAnimation);
        

});
const tl = gsap.timeline();
const duration = 8;
const ease = 'none';
let isAnimationFinished = false;
const cameraAnimation=()=>{
        if(!isAnimationFinished){
            isAnimationFinished = true;

            tl.to(camera.position,{
                x:0,
                duration,
                ease
            })
            .to(camera.position,{
                y:40,
                z:30,
                duration,
                ease,
                onUpdate:()=>{
                    camera.lookAt(0, 0, 0);
                }
            }, 8)
            .to(camera.position,{
                x:-10,
                y:15,
                z:10,
                duration,
                ease,
                onUpdate:()=>{
                    camera.lookAt(0, 0, 0);
                }
            }, 8)

              .to(camera.position,{
                x:-30,
                y:30,
                z:20,
                duration,
                ease,
                onUpdate:()=>{
                    camera.lookAt(0, 0, 0);
                }
            }, 8)

              .to(camera.position,{
                x:-40,
                y:30,
                z:-20,
                duration,
                ease,
                onUpdate:()=>{
                    camera.lookAt(0, 0, 0);
                }
            }, 14)
             .to(camera.position,{
                x:5,
                y:5,
                z:-10,
                duration,
                ease,
                onUpdate:()=>{
                    camera.lookAt(0, 0, 0);
                }
            })
             .to(camera.position,{
                x:5,
                y:20,
                z:30,
                duration,
                ease,
                onUpdate:()=>{
                    camera.lookAt(0, 0, 0);
                }
            }, '>-0.2')
            .to(camera.position,{
                x: -20,
                duration : 12,
                ease,
                delay:2,
            })

            
        }
}

// window.addEventListener( "mousedown" ,(e)=>{
//     gsap.to(camera.position,{
//         z:14,
//         y:5,
//         duration:1.5,
//         onUpdate:()=>{
//             camera.lookAt(0,0,0)
//         }
//     })
// })



const clock = new THREE.Clock();
function animate(){
    const delta = clock.getDelta();
    if(mixer1 && mixer2 && mixer3){
        mixer1.update(delta);
        mixer2.update(delta);
        mixer3.update(delta);
        
    }
   renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize',(e)=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
})