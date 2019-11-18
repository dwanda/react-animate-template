import anime from 'animejs/lib/anime.es.js';

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';

export default function newBroswer(timeline){

    let camera, scene, renderer, composer;
    let object, light;
    let mesh = new Array(100)
    let glitchPass;
    let CREATEFLAG = false

    timeline.add({
        duration: 3800,
        changeBegin(){
            console.log('进入模型')
            if(!CREATEFLAG){
                init();
                CREATEFLAG = true
            }
        },
        change: function(anim) {
            console.log(anim.currentTime)
            anim.reversePlayback?animate(-1):animate()
        },
        changeComplete(){
            console.log('改变结束')
            // composer.reset( renderer )
        },
        delay:-500
    });

    function init() {
        renderer = new THREE.WebGLRenderer({ antialias: true,alpha:true });
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.querySelector('.threeJs_aniBox').appendChild( renderer.domElement );
        //
        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 2000 );
        camera.position.z = 700;
        scene = new THREE.Scene();
        scene.background = null;
        object = new THREE.Object3D();
        scene.add( object );
        let geometry = new THREE.PlaneGeometry(1.5,1.5);
        
        for ( let i = 0; i < 150; i ++ ) {
            let material = new THREE.MeshNormalMaterial();

            mesh[i] = new THREE.Mesh( geometry, material );
            mesh[i].position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ).normalize();
            mesh[i].position.multiplyScalar( Math.random() * 450 );
            mesh[i].rotation.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );
            mesh[i].scale.x = mesh[i].scale.y = mesh[i].scale.z = Math.random() * 50;
            object.add( mesh[i] );
        }
        //灯光
        scene.add( new THREE.AmbientLight( 0x222222 ) );
        light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 1, 1, 200 );
        scene.add( light );
        // postprocessing
        composer = new EffectComposer( renderer );
        composer.addPass( new RenderPass( scene, camera ) );

        // 添加故障滤镜
        glitchPass = new GlitchPass();
        composer.addPass( glitchPass );
    }

    function animate(playState=1) {
        for ( let i = 0; i < 100; i ++ ) {
            mesh[i].position.x = mesh[i].position.x + (mesh[i].position.x>=0?1:-1)*playState
            mesh[i].position.y = mesh[i].position.y + (mesh[i].position.y>=0?1:-1)*playState
            mesh[i].position.z = mesh[i].position.z + (mesh[i].position.z>=0?1:-1)*playState
            mesh[i].rotation.x += 0.03*Math.random();
            mesh[i].rotation.y += 0.03*Math.random();
        }
        object.rotation.x += 0.005;
        object.rotation.y += 0.005;
        composer.render();
    }
}
