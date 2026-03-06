document.addEventListener("DOMContentLoaded", function(){

const cleStockage = "formulaireVerificationAuto";



function sauvegarderFormulaire(){

const donnees = {};

document.querySelectorAll("input, select, textarea").forEach(function(champ){

if(!champ.id) return;

if(champ.type === "checkbox"){

donnees[champ.id] = champ.checked;

}

else{

donnees[champ.id] = champ.value;

}

});



localStorage.setItem(cleStockage, JSON.stringify(donnees));

}



function restaurerFormulaire(){

const sauvegarde = localStorage.getItem(cleStockage);

if(!sauvegarde) return;

const donnees = JSON.parse(sauvegarde);



Object.keys(donnees).forEach(function(id){

const champ = document.getElementById(id);

if(!champ) return;



if(champ.type === "checkbox"){

champ.checked = donnees[id];

}

else{

champ.value = donnees[id];

}

});

}



restaurerFormulaire();



setInterval(function(){

sauvegarderFormulaire();

},2000);



});

document.addEventListener("DOMContentLoaded", function(){

const cleFormulaire = "VPI_formulaire";
const cleSignatureClient = "VPI_signature_client";
const cleSignatureVerificateur = "VPI_signature_verificateur";



function sauvegarderChamps(){

const donnees = {};

document.querySelectorAll("input, select, textarea").forEach(function(champ){

if(!champ.id) return;

if(champ.type === "checkbox"){

donnees[champ.id] = champ.checked;

}else{

donnees[champ.id] = champ.value;

}

});

localStorage.setItem(cleFormulaire, JSON.stringify(donnees));

}



function restaurerChamps(){

const sauvegarde = localStorage.getItem(cleFormulaire);

if(!sauvegarde) return;

const donnees = JSON.parse(sauvegarde);

Object.keys(donnees).forEach(function(id){

const champ = document.getElementById(id);

if(!champ) return;

if(champ.type === "checkbox"){

champ.checked = donnees[id];

}else{

champ.value = donnees[id];

}

});

}



function sauvegarderSignature(idCanvas, cle){

const canvas = document.getElementById(idCanvas);

if(!canvas) return;

try{

const image = canvas.toDataURL();

localStorage.setItem(cle, image);

}catch(e){}

}



function restaurerSignature(idCanvas, cle){

const canvas = document.getElementById(idCanvas);

if(!canvas) return;

const data = localStorage.getItem(cle);

if(!data) return;

const ctx = canvas.getContext("2d");

const img = new Image();

img.onload = function(){

ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage(img,0,0);

};

img.src = data;

}



function sauvegarderTout(){

sauvegarderChamps();

sauvegarderSignature("signature-client", cleSignatureClient);

sauvegarderSignature("signature-verificateur", cleSignatureVerificateur);

}



function restaurerTout(){

restaurerChamps();

restaurerSignature("signature-client", cleSignatureClient);

restaurerSignature("signature-verificateur", cleSignatureVerificateur);

}



restaurerTout();



setInterval(function(){

sauvegarderTout();

},2000);



window.addEventListener("beforeunload", function(){

sauvegarderTout();

});

});
