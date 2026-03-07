// ======================================================
// MODULE 14
// SIGNATURE MULTIPLATEFORME + VERROUILLAGE TOTAL
// Compatible Windows / macOS / Linux / Android
// ======================================================

const signatures = {};

document.addEventListener("DOMContentLoaded", function(){

initialiserSignature("signature-client");
initialiserSignature("signature-verificateur");

});



function initialiserSignature(idCanvas){

const canvas = document.getElementById(idCanvas);
if(!canvas) return;

const ctx = canvas.getContext("2d");

signatures[idCanvas] = {
dessin:false,
verrouille:false
};

canvas.style.touchAction = "none";



function position(event){

const rect = canvas.getBoundingClientRect();

let x,y;

if(event.touches && event.touches.length>0){

x = event.touches[0].clientX - rect.left;
y = event.touches[0].clientY - rect.top;

}else{

x = event.clientX - rect.left;
y = event.clientY - rect.top;

}

return {x,y};

}



function start(event){

if(signatures[idCanvas].verrouille) return;

signatures[idCanvas].dessin = true;

ctx.beginPath();

const pos = position(event);

ctx.moveTo(pos.x,pos.y);

event.preventDefault();

}



function move(event){

if(signatures[idCanvas].verrouille) return;
if(!signatures[idCanvas].dessin) return;

const pos = position(event);

ctx.lineTo(pos.x,pos.y);

ctx.stroke();

event.preventDefault();

}



function stop(){

signatures[idCanvas].dessin = false;

}



/* pointer */

canvas.addEventListener("pointerdown",start);
canvas.addEventListener("pointermove",move);
canvas.addEventListener("pointerup",stop);
canvas.addEventListener("pointerleave",stop);



/* mouse */

canvas.addEventListener("mousedown",start);
canvas.addEventListener("mousemove",move);
canvas.addEventListener("mouseup",stop);



/* touch */

canvas.addEventListener("touchstart",start);
canvas.addEventListener("touchmove",move);
canvas.addEventListener("touchend",stop);

}



/* ======================================================
FIGER SIGNATURE
====================================================== */

function figerSignature(idCanvas){

if(!signatures[idCanvas]) return;

signatures[idCanvas].verrouille = true;

}



/* ======================================================
DÉVERROUILLER SIGNATURE
====================================================== */

function deverrouillerSignature(idCanvas){

if(!signatures[idCanvas]) return;

signatures[idCanvas].verrouille = false;

}



/* ======================================================
EFFACER SIGNATURE CLIENT
====================================================== */

function effacerSignatureLocataire(){

if(signatures["signature-client"] && signatures["signature-client"].verrouille) return;

const canvas = document.getElementById("signature-client");
if(!canvas) return;

const ctx = canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

}



/* ======================================================
EFFACER SIGNATURE CONSULTANT
====================================================== */

function effacerSignatureConsultant(){

if(signatures["signature-verificateur"] && signatures["signature-verificateur"].verrouille) return;

const canvas = document.getElementById("signature-verificateur");
if(!canvas) return;

const ctx = canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

}
