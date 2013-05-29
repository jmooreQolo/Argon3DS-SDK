/**
 * Argon3DS
 * @version 0.1
 * This class structure is intended to support the BAMS (Background Audio Management System) for use 
 * in the Argon Augmented Reality Web Browser. Support for Tracks is being implemented.
 * @author Josh Moore IMTC
 */
var context;

/*
 * initializeArgon3DS 
 * initializes the AudioContext in order to generate all other nodes
 */
function initializeArgon3DS(){
	try{
		context = new webkitAudioContext();
	}
	catch(e){
		alert("Web Audio API is not supported in this browser");
	}
}



/*ArgonOscillator: Container class to hold a single Oscillator in a 3D space
 * TODO: Connect this with the ARGON backend
 * TODO: Add single effect chaining to sound.
 * TODO: Add dry and wet outputs for later.
 */


/*
 * Constructor of Argon Oscillator
 * @param name string with the name of the oscillator (for reference)
 * @param destination the destination layer that the Oscillater will travel too.
 */
function ArgonOscillator(name,destination){
	this.name = name;
	this.osc = context.createOscillator();
	this.dest = destination;
	this.gainNode = context.createGain();
	this.panNode = context.createPanner();
	
	this.osc.connect(this.panNode);
	this.panNode.connect(this.gainNode);
	this.gainNode.connect(destination);
	
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.angle = 0;
	this.distance = 0;
	
	console.log("ArgonOsc created");
}
	
/*
 * updateAngle changes and calculates the angle around the AudioListener where the sound should be. 0 angle is to the right.
 * @param angle the new angle to be updated 
 * 
 */
ArgonOscillator.prototype.updateAngle = function(angleIn){
	this.angle = angleIn
	this.x = Math.cos((this.angle/180.0)*Math.PI) * this.distance;
	this.z = Math.sin((this.angle/180.0)*Math.PI) * this.distance;
	this.panNode.setPosition(this.x,this.y,this.z);
	console.log("Update Angle");
	console.log(this.angle);
	console.log("Distance:"+this.distance);
}

/*
 * updateDistance 
 * changes the distance from the AudioListener where the sound should be.
 * @param dist the new angle to be updated 
 * 
 */
ArgonOscillator.prototype.updateDistance= function(dist){
	this.distance = dist;
	this.x = Math.cos((this.angle/180.0)*Math.PI) * this.distance;
	this.z = Math.sin((this.angle/180.0)*Math.PI) * this.distance;
	this.panNode.setPosition(this.x,this.y,this.z);
	console.log("Update Distance");
	console.log("Angle:" + this.angle);
	console.log("Distance:"+this.distance);

}

/*
 * updateHeight 
 * changes the height relative to the AudioListener. 0 is on-level with AudioListener, neg is down, pos is up.
 * @param height the new height to be inputed
 * 
 */
ArgonOscillator.prototype.updateHeight= function(height){
	this.y = height;
	this.x = Math.cos((this.angle/180.0)*Math.PI) * this.distance;
	this.z = Math.sin((this.angle/180.0)*Math.PI) * this.distance;
	this.panNode.setPosition(this.x,this.y,this.z);
	console.log("Update Distance");
	console.log("Angle:" + this.angle);
	console.log("Distance:"+this.distance);
	console.log("Height: "+this.height);

}

/*
 * setPosition
 * sets the position of the sound at a given x, y, and z coordinate, relative to the Listener. Positive x is right, z+ is forward, y+ is up.
 * @param xIn the new z value
 * @param yIn the new y value 
 * @param zIn the new z value
 * 
 */
ArgonOscillator.prototype.setPosition = function(xIn,yIn,zIn){
	this.x=xIn;
	this.y=yIn;
	this.z=zIn;
	this.panNode.setPosition(xIn,yIn,zIn);
}

/*
 * setOscFrequency
 * sets the Oscillator's frequency in Hz.
 * @param freq the new frequency to be played. 
 * 
 */
ArgonOscillator.prototype.setOscFrequency = function(freq){
	this.osc.frequency.value = freq;
}

/*
 * setOscType
 * sets the oscillator waveform. Valid types: "sine", "square", "sawtooth", "triangle", and "custom"
 * @param type string of the desired waveform 
 * 
 */
ArgonOscillator.prototype.setOscType = function(type){
	this.osc.type = type;
} 

/*
 * start
 * begins the oscillator. 
 * @param delay time to wait before beginning the sound
 * @param offset time to offset into the sound clip 
 * @param duration length of sound to be played, then automatically stop.
 * 
 */
ArgonOscillator.prototype.start = function(delay, offset, duration){
	this.osc.noteOn && this.osc.noteOn(delay,offset,duration);
}

/*
 * stop 
 * stops the oscillator. can have a delay
 * @param delay time in seconds the sound is delayed before stopping 
 * 
 */
ArgonOscillator.prototype.stop = function(delay){
	var del = 0;
	if(typeof delay === "undefined"){ del = delay}
	this.osc.stop(del);
}
	
	