/**
 * 
 */

window.onload=init();
var context;
var scene;
//var camera;
var renderer;
var bufferLoader;

function init(){
	//window.AudioContext = window.AudioContext || window.webkitAudioContext;
	try{
		context = new webkitAudioContext();
	}
	catch(e){
		alert("Web Audio API is not supported in this browser!");
	}
	
	bufferLoader = new BufferLoader(
		    context,
		    [
		      'http://localhost/ThreeLibraryTesting/sounds/Happyland.wav',
		    ],
		    finishedLoading
		    );
	console.log(bufferLoader);
	//console.log(bufferLoader.load);
	//bufferLoader.load();
	
}

function finishedLoading(bufferList){
	var cube1 = new THREEWebAudioCube(bufferList[1],context,0,0,-5,0,0,0,1,1,1,"");
	
	
	
	
}
/*
var geometry = new THREE.CubeGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

cube.position.z = -5;
*/
scene = new THREE.Scene();
//var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


var camera = new THREEWebAudioCamera(context,0,0,0,0,0,0);

cube1.addToScene(scene);


function render() {
	requestAnimationFrame(render);
	camera.rotate(0, .01, 0);
	renderer.render(scene, camera.camera);
}
render();


function THREEWebAudioCube(buffer,context,x,y,z,rotX,rotY,rotZ,width,height,depth,url){
	this.position = new THREE.Vector3(x,y,z);
	this.rotation = new THREE.Vector3(rotX,rotY,rotZ);
	this.incontext = context;
	this.audioBuffer = null;
	this.sourceNode = null;
	
	try{
		var geometry = new THREE.CubeGeometry(width,height,depth);
		var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
		var cube = new THREE.Mesh(this.geometry, this.material);
		cube.position = this.position;
		cube.rotation = this.rotation
	}
	catch(e){
		alert("Something went wrong on THREE.js instantiation!");
	}
	
	
	function onError(){
		alert("Request.onload error");
	}
	
	
		this.panner = this.incontext.createPanner();
		
		this.sourceNode = this.incontext.createBufferSource();
		this.sourceNode.buffer = buffer;
		this.sourceNode.connect(this.panner);
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
		
	
	
}

THREEWebAudioCube.prototype.startSound = function(){
	this.sourceNode.start(0);
}

THREEWebAudioCube.prototype.stopSound = function(){
	this.sourceNode.stop(0);
}


function THREEWebAudioCamera(context,x,y,z,rotX,rotY,rotZ){
	this.camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
	this.incontext = context;
	
	this.position = new THREE.Vector3(x,y,z);
	this.rotation = new THREE.Vector3(rotX,rotY,rotZ);
	
	this.translate = function(x,y,z){
		transVector = new THREE.Vector3(x,y,z);
		this.position.add(transVector);
		this.camera.position = this.position;
		this.incontext.listener.setPosition(this.position.x,this.position.y,this.position.z);
		
	}
	
	this.rotate = function(rotX,rotY,rotZ){
		rotateVector = new THREE.Vector3(rotX,rotY,rotZ);
		this.rotation.add(rotateVector);
		this.camera.rotation = this.rotation;
		this.incontext.listener.setOrientation(this.rotation.x,this.rotation.y,this.rotation.z,0,1,0);
	}
	
}


function BufferLoader(context,urlList,callback){
	this.context=context;
	this.urlList=urlList;
	this.onload=callback;
	this.bufferList=new Array();
	this.loadCount=0;
}

BufferLoader.prototype.loadBuffer=function(url,index){
	var request=new XMLHttpRequest();
	request.open("GET",url,true);
	request.responseType="arraybuffer";
	var loader=this;
	request.onload=function(){
		loader.context.decodeAudioData(request.response,
				function(buffer){
					if(!buffer){
						alert('error decoding file data: '+url);
						return;
					}
					loader.bufferList[index]=buffer;
					if(++loader.loadCount==loader.urlList.length) loader.onload(loader.bufferList);
				},
				function(error){
					console.error('decodeAudioData error',error);
				});
	}
	request.onerror=function(){alert('BufferLoader: XHR error');}
	request.send();
}

BufferLoader.prototype.load=function(){
	for(var i=0;i<this.urlList.length;++i)
		this.loadBuffer(this.urlList[i],i);
}


