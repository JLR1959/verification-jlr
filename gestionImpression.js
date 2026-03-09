/* ======================================================
MODULE 1
REMPLIR INFORMATIONS CLIENT DANS LE RAPPORT
====================================================== */

function remplirInformationsRapport(){

const dossier = document.getElementById("numeroDossier");
const locataire = document.getElementById("locataire");
const telephone = document.getElementById("telephone");
const adresse = document.getElementById("adresse");

const rDossier = document.getElementById("rapport-dossier");
const rLocataire = document.getElementById("rapport-locataire");
const rTelephone = document.getElementById("rapport-telephone");
const rAdresse = document.getElementById("rapport-adresse");

if(dossier && rDossier){
rDossier.textContent = dossier.value;
}

if(locataire && rLocataire){
rLocataire.textContent = locataire.value;
}

if(telephone && rTelephone){
rTelephone.textContent = telephone.value;
}

if(adresse && rAdresse){
rAdresse.textContent = adresse.value;
}

}



/* ======================================================
MODULE 2
INJECTION FACTURATION DANS RAPPORT
====================================================== */

function injecterFacturationRapport(){

if(typeof calculerFacturationRapport !== "function"){
return;
}

try{

const facture = calculerFacturationRapport();

const heures = document.getElementById("rapport-heures");
const sousTotal = document.getElementById("rapport-sous-total");
const tps = document.getElementById("rapport-tps");
const tvq = document.getElementById("rapport-tvq");
const total = document.getElementById("rapport-total");

if(heures){
heures.textContent = facture.heures;
}

if(sousTotal){
sousTotal.textContent = facture.sousTotal;
}

if(tps){
tps.textContent = facture.tps;
}

if(tvq){
tvq.textContent = facture.tvq;
}

if(total){
total.textContent = facture.total;
}

}catch(e){

console.warn("Erreur facturation :", e);

}

}



/* ======================================================
MODULE 3
GÉNÉRATION RAPPORT AVANT IMPRESSION
====================================================== */

function genererRapportImpression(){

remplirInformationsRapport();

injecterFacturationRapport();

}



/* ======================================================
MODULE 4
MISE À JOUR AUTOMATIQUE AVANT IMPRESSION
====================================================== */

window.addEventListener("beforeprint", function(){

genererRapportImpression();

});
