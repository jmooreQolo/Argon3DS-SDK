/**
 * 
 */
var osc3D;

window.onload  = init();

function init(){
	initializeArgon3DS();
	osc3D = new ArgonOscillator("osc1", context.destination);
}

function constructWave(){
	//angle = $('#form_ input[name=panAngleIn]').val();
	//distance = $('#form_ input[name=distIn]').val();
	var fEle = document.getElementById("freq");
	var f = fEle.value;
	//alert("You inputed a freq of " + f);/lu
	osc3D.setOscType(0);
	osc3D.setOscFrequency(f);
	osc3D.setPosition(0,0,0);

	
	osc3D.start(0,0,0);
	
}