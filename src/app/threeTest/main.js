import React, { Component } from 'react'
import * as THREE from 'three';

export default class main extends Component {
    componentDidMount(){
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.set( 0, 0, 100 );
        camera.lookAt( 0, 0, 0 );

        var renderer = new THREE.WebGLRenderer({ antialias: true,alpha:true });
        
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.querySelector('.threeJs_aniBox').appendChild( renderer.domElement );
        
        var geometry = new THREE.BoxGeometry( 1, 1, 1, 10, 10, 10 );
        var material = new THREE.MeshNormalMaterial();
        var cube = new THREE.Mesh( geometry, material );

        // var geometry2 = new THREE.Geometry();
        // geometry2.vertices.push(new THREE.Vector3( -10, 0, 0) );
        // geometry2.vertices.push(new THREE.Vector3( 0, 10, 0) );
        // geometry2.vertices.push(new THREE.Vector3( 10, 0, 0) );
        // var line = new THREE.Line( geometry2, material );
        
        scene.add( cube );
        // scene.add( line );

        camera.position.z = 5;
        
        function animate() {
            requestAnimationFrame( animate );

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            cube.rotation.z += 0.01;

            // cube.position.x += 0.01;
            renderer.render( scene, camera );
        }
        animate();
    }
    render() {
        return (
            <div className='threeJs_aniBox'></div>
        )
    }
}
