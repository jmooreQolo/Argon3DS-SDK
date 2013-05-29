/**
 * 
 */
var sound1 =  new Howl({urls: ['Heart Attack (Club Edit).mp3']});
var x;
var y;
var z;
var angle;
var distance;


function startSound(){
	sound1.play();
	sound1.pos3d(x, y, z);
	console.log("sound started");
}

function stopSound(){
	sound1.pause()
}

function updateAngle(angleIn){
	angle = angleIn
	x = Math.cos((angle/180.0)*Math.PI) * distance;
	z = Math.sin((angle/180.0)*Math.PI) * distance;
	sound1.pos3d(x, y, z);
	console.log("update angle");
}

/*
 * updateDistance 
 * changes the distance from the AudioListener where the sound should be.
 * @param dist the new angle to be updated 
 * 
 */
function updateDistance(dist){
	distance = dist;
	x = Math.cos((angle/180.0)*Math.PI) * distance;
	z = Math.sin((angle/180.0)*Math.PI) * distance;
	sound1.pos3d(x, y, z);
	console.log("update dist");

}

/*
 * updateHeight 
 * changes the height relative to the AudioListener. 0 is on-level with AudioListener, neg is down, pos is up.
 * @param height the new height to be inputed
 * 
 */
function updateHeight(height){
	y = height;
	x = Math.cos((angle/180.0)*Math.PI) * distance;
	z = Math.sin((angle/180.0)*Math.PI) * distance;
	sound1.pos3d(x, y, z);
}