// Window event listener subscriptions
window.addEventListener("load", windowLoadHandler, false);

//for debug messages
var Debugger = function() { };
Debugger.log = function(message) {
	try {
		console.log(message);
	}
	catch (exception) {
		return;
	}
}

function windowLoadHandler() {
	if (canvasSupport())
	{
		startAnimation();
	}
}

function canvasSupport() {
	return Modernizr.canvas;
}

var canvas;
var context;
var alphaGradient;
var chromaScale;
var colorLeft;
var colorRight;
var colorLeftLerp;
var colorRightLerp;

function startAnimation() {
    
    	// Get canvas and 2d context
    	canvas = document.getElementById("hero-background-canvas");
    	context = canvas.getContext("2d");
    
    	// Create color scale and set initial colors
    	chromaScale = chroma.scale(['99FFFF', '#66ff99', 'ff99ff', 'ff66ff', 'FFFF00', 'F0F000', '99FFFF']).domain([0.0, 24.0]);
    	colorLeftLerp = 0.0;
    	colorRightLerp = 12.0;
    	colorLeft = chromaScale(colorLeftLerp).hex();
    	colorRight = chromaScale(colorRightLerp).hex();

    	// Create alpha gradient context and setup alpha color stops
    	alphaGradient = context.createLinearGradient(0, canvas.height * 0.25, 0, canvas.height);
    	alphaGradient.addColorStop(0.0, "rgba(255, 255, 255, 0.0)");
    	alphaGradient.addColorStop(0.8, "rgba(255, 255, 255, 1.0)");
	alphaGradient.addColorStop(1.0, "rgba(255, 255, 255, 1.0)");

    	// Setup and start timer for successive frames (24fps)
	var timer = setInterval(onTimer, 1000/12);
}

function onTimer()
{
    	// Update color lerp indicies
	colorLeftLerp += 0.1;
    	colorRightLerp += 0.1;
    	colorLeftLerp = colorLeftLerp % 24.0;
    	colorRightLerp = colorRightLerp % 24.0;
    
    	// Update colors
    	colorLeft = chromaScale(colorLeftLerp).hex();
    	colorRight = chromaScale(colorRightLerp).hex();

    	// Render colors
    	let colorGradient = context.createLinearGradient(0, 0, canvas.width, 0);
    	colorGradient.addColorStop(0.0, colorLeft);
    	colorGradient.addColorStop(1.0, colorRight);
	context.fillStyle = colorGradient;
    	context.fillRect(0, 0, canvas.width, canvas.height);

    // Render white-to-transparent hero bottom mask
    context.fillStyle = alphaGradient;
    context.fillRect(0, canvas.height * 0.25, canvas.width, canvas.height);
}
