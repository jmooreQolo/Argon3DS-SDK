/**
 * 
 */

window.onload=init();
var context;
var scene;
var threecamera;
var camera;
var renderer;
var bufferLoader;
var cube1;

function init(){
	//window.AudioContext = window.AudioContext || window.webkitAudioContext;
	try{
		context = new webkitAudioContext();
	}
	catch(e){
		alert("Web Audio API is not supported in this browser!");
	}
	
	
}
scene = new THREE.Scene();
//camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


//var geometry = new THREE.CubeGeometry(1,1,1);
//var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//var cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

//cube.position.z = -5;




cube1 = new THREEWebAudioCube(context,0,0,-20,0,0,0,1,1,1);
console.log(cube1);
threecamera = new THREEWebAudioCamera(context,0,0,0,0,0,0);
//console.log(threecamera);
//
cube1.addToScene(scene);
//cube1.startSound();


function render() {
	requestAnimationFrame(render);
	threecamera.rotate(0, .01, 0);
	//console.log(threecamera.rotation);
	cube1.translate(0,0,.1);
	//camera.rotation.y += .01;
	renderer.render(scene, threecamera.camera);
}
render();






function THREEWebAudioCube(context,x,y,z,rotX,rotY,rotZ,width,height,depth){
	this.position = new THREE.Vector3(x,y,z);
	this.rotation = new THREE.Vector3(rotX,rotY,rotZ);
	this.incontext = context;
	this.osc = null;
	
	try{
		this.geometry = new THREE.CubeGeometry(width,height,depth);
		this.material = new THREE.MeshBasicMaterial({color: 0x00ff00});
		this.cube = new THREE.Mesh(this.geometry, this.material);
		this.cube.position = this.position;
		this.cube.rotation = this.rotation
	}
	catch(e){
		alert("Something went wrong on THREE.js instantiation!");
	}
	
	
	
	this.panner = this.incontext.createPanner();
	
	this.osc = this.incontext.createOscillator();
	this.osc.frequency.value = 200;
	this.osc.type = 0;
	this.osc.connect(this.panner);
	this.panner.connect(this.incontext.destination);
	
	
	
	this.translate = function(x,y,z){
		transVector = new THREE.Vector3(x,y,z);
		this.position.add(transVector);
		this.cube.position = this.position;
		
		this.panner.setPosition(this.position.x,this.position.y,this.position.z);
		
	}
		
	this.rotate = function(rotX,rotY,rotZ){
		rotateVector = new THREE.Vector3(rotX,rotY,rotZ);
		this.rotation.add(rotateVector);
		this.cube.rotation= this.rotation;
		this.panner.setOrientation(this.rotation.x,this.rotation.y,this.rotation.z);
	}
	
	this.addToScene= function(scene){
		scene.add(this.cube);
	}
		
	this.startSound = function(){
		this.osc.start(0);
	}

	this.stopSound = function(){
		this.osc.stop(0);
	}

	
}



function THREEWebAudioCamera(context,x,y,z,rotX,rotY,rotZ){
	this.camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight, 0.1, 1000);
	this.incontext = context;
	
	this.position = new THREE.Vector3(x,y,z);
	this.rotation = new THREE.Vector3(rotX,rotY,rotZ);
	
	this.translate = function(x,y,z){
		transVector = new THREE.Vector3(x,y,z);
		this.position.add(transVector);
		this.camera.position = this.position;
		this.incontext.listener.setPosition(this.position.x,this.position.y,this.position.z);
		
	}
	
	
	//right now...only rotates on Y axis
	this.rotate = function(rotX,rotY,rotZ){
		rotateVector = new THREE.Vector3(rotX,rotY,rotZ);
		this.rotation.add(rotateVector);
		this.camera.rotation = this.rotation;
		var listenX = -1*Math.sin((this.rotation.y));
		var listenZ = -1*Math.cos((this.rotation.y));
		this.incontext.listener.setOrientation(listenX,0,listenZ,0,1,0);
	}
	
}
