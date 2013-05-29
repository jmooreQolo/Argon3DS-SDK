var context;
var osc1;
window.onload  = init();
var panNode;
var distance = 10;
var x = distance;
var y = 0;
var z = 0;
var isCircling;
var angle = 0;;

var revCounter = 0;
var revTime = 50000;

function init(){
	try{
		context = new webkitAudioContext();
		panNode = context.createPanner();
		osc1= context.createOscillator();
		osc1.connect(panNode);
		panNode.connect(context.destination);
		//alert('Context created');
		
	}
	catch(e){
		alert('Web Audio API is not supported in this browser');
	}

}

function updateAngle(angleIn){
	angle = angleIn;
	x = Math.cos((angle/180.0)*Math.PI) * distance;
	z = Math.sin((angle/180.0)*Math.PI) * distance;
	panNode.setPosition(x,y,z);
	console.log("Update Angle");
	console.log(angle);
	console.log("Distance:"+distance);

}

function updateDistance(dist){
	distance = dist;
	x = Math.cos((angle/180.0)*Math.PI) * distance;
	z = Math.sin((angle/180.0)*Math.PI) * distance;
	panNode.setPosition(x,y,z);
	console.log("Update Distance");
	console.log("Angle:" + angle);
	console.log("Distance:"+distance);

}

function updateHeight(height){
	y = height;
	x = Math.cos((angle/180.0)*Math.PI) * distance;
	z = Math.sin((angle/180.0)*Math.PI) * distance;
	panNode.setPosition(x,y,z);
	console.log("Update Distance");
	console.log("Angle:" + angle);
	console.log("Distance:"+distance);
	console.log("Height: "+height);

}


function constructWave(){
	//angle = $('#form_ input[name=panAngleIn]').val();
	//distance = $('#form_ input[name=distIn]').val();
	var fEle = document.getElementById("freq");
	var f = fEle.value;
	//alert("You inputed a freq of " + f);/lu
	var freqJumpValue = (3.0*f)-f;
	osc1.type = 0;
	osc1.frequency.value = f;
	x = Math.cos((angle/180.0)*Math.PI) * distance;
	z = Math.sin((angle/180.0)*Math.PI) * distance;
	panNode.setPosition(x,y,z);

	
	osc1.noteOn && osc1.noteOn(0);
	
	
	


}
function stopWave(){
	
	osc1.stop(0);

}
