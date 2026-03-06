document.addEventListener("DOMContentLoaded", function(){

const cleLog = "VPI_LOG_SYSTEME";



function ajouterLog(message){

const date = new Date();

const horodatage =
date.getFullYear() + "-" +
String(date.getMonth()+1).padStart(2,"0") + "-" +
String(date.getDate()).padStart(2,"0") + " " +
String(date.getHours()).padStart(2,"0") + ":" +
String(date.getMinutes()).padStart(2,"0") + ":" +
String(date.getSeconds()).padStart(2,"0");

const ligne = horodatage + " | " + message;

let logs = localStorage.getItem(cleLog);

if(logs){

logs = JSON.parse(logs);

}else{

logs = [];

}

logs.push(ligne);

localStorage.setItem(cleLog, JSON.stringify(logs));

console.log("LOG:", ligne);

}



window.logSysteme = ajouterLog;



verifierNumeroDossier();



surveillerSauvegarde();



surveillerMinuteur();



});



function verifierNumeroDossier(){

const champ = document.getElementById("numeroDossier");

if(!champ) return;

let precedent = champ.value;

setInterval(function(){

if(champ.value && champ.value !== precedent){

precedent = champ.value;

logSysteme("Numéro de dossier créé : " + champ.value);

}

},1000);

}



function surveillerSauvegarde(){

setInterval(function(){

logSysteme("Sauvegarde automatique exécutée");

},2000);

}



function surveillerMinuteur(){

const temps = document.getElementById("temps-affiche");

if(!temps) return;

let precedent = temps.textContent;

setInterval(function(){

if(temps.textContent !== precedent){

precedent = temps.textContent;

logSysteme("Minuteur actif : " + temps.textContent);

}

},3000);

}



function afficherLogs(){

const logs = JSON.parse(localStorage.getItem("VPI_LOG_SYSTEME") || "[]");

console.log("===== JOURNAL SYSTEME =====");

logs.forEach(function(ligne){

console.log(ligne);

});

}
