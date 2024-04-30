import * as THREE from 'three';
import { GLTFLoader, SkeletonUtils,OrbitControls, GlitchPass } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';
    const renderer = new THREE.WebGLRenderer({antialias:true});
    document.body.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor();


const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
);
camera.position.set(10,0,20);
const scene = new THREE.Scene();
// const orbit = new OrbitControls(camera, renderer.domElement)
// orbit.update();
const ambientLight = new THREE.AmbientLight(0xffffff,0.8);
const directionLight = new THREE.DirectionalLight(0xffffff,2);
scene.add(directionLight)
scene.add(ambientLight)
document.body.style.cursor = 'pointer'
// const boxMesh = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({color:'green'})
// )
// scene.add(boxMesh)
// const gridHelper = new THREE.GridHelper(20,20);
// scene.add(gridHelper)

const phoenixLoader = new GLTFLoader();
const dovLoader = new GLTFLoader();
const bgLoader = new GLTFLoader();
let mixer1;
let mixer2;
let mixer3;
let mixer4;

bgLoader.load("./assests/realistic_jungle_tree_avatar/scene.gltf",(gltf)=>{
    const model = gltf.scene;
    // scene.add(model)
})

phoenixLoader.load("./assests/white_eagle_animation_fast_fly/scene.gltf",(gltf)=>{
    const model = gltf.scene;
    model.scale.set(0.08,0.08,0.08);
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
    const clip = THREE.AnimationClip.findByName(clips,"CINEMA_4D_Principal");

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

    dovLoader.load("./assests/dove_bird_rigged/scene.gltf",(gltf)=>{
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.2,0.2,0.2);
        model.position.set(15,-40,0);
        model.rotation.y = Math.PI/2
        mixer4 = new THREE.AnimationMixer(model);
        const  clips = gltf.animations;
        const clip = THREE.AnimationClip.findByName(clips,"Take 001");
        const action = mixer4.clipAction(clip);
        action.play();
        action.startAt(0.40);
        // window.addEventListener( "mouseover" , cameraAnimation);
    
    });
    phoenixLoader.load("./assests/realistic_jungle_tree_avatar/scene.gltf",(gltf)=>{
        const model = gltf.scene;
                    model.position.set(0,-60,-150)
                    scene.add(model);
        const model22 = SkeletonUtils.clone(model)
        const model2 = SkeletonUtils.clone(model)
        const model3 = SkeletonUtils.clone(model)
        const model4 = SkeletonUtils.clone(model)
        
        scene.add(model4)
        scene.add(model3)
        scene.add(model2)
        scene.add(model22)
        model22.position.set(30,-50,-150)
        model2.position.set(30,-90,-150)
        model3.position.set(10,-90,-150)
        model4.position.set(60,-90,-200)
        
        
        

    })

  
    window.addEventListener( "mousedown" , cameraAnimation);
        

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
    if(mixer1 && mixer2 && mixer3 && mixer4){
        mixer1.update(delta);
        mixer2.update(delta);
        mixer3.update(delta);
        mixer4.update(delta);
        
        
    }
   renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize',(e)=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
})