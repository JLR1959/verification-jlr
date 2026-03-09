/* ======================================================
MODULE 15
TYPE DE VÉRIFICATION ANDROID STABLE
====================================================== */

function choisirVerification(type){

const select = document.getElementById("type-piece");

if(!select) return;


/* ======================================================
LISTE DES PIÈCES
====================================================== */

const piecesInterieur = [

"Cuisine",
"Salle de bain",
"Salle d'eau",
"Salle à manger",
"Salon",
"Chambre",
"Bureau",
"Corridor",
"Escalier",
"Hall d'entrée",
"Sous-sol",
"Salle mécanique",
"Salle électrique",
"Éclairage",
"Salle lavage"

];

const piecesExterieur = [

"Garage",
"Balcon",
"Terrasse",
"Piscine",
"Verrière",
"Climatisation",
"Porte patio",
"Réservoir eau chaude",
"Stationnement",
"Borne de recharge",
"Clôture",
"Cabanon",
"Porte",
"Vide sanitaire"

];


/* ======================================================
VIDER LA LISTE
====================================================== */

select.innerHTML = '<option value="">Pièces ou éléments</option>';

let liste = [];


/* ======================================================
CHOIX DU TYPE
====================================================== */

if(type === "interieur"){
liste = piecesInterieur;
}

if(type === "exterieur"){
liste = piecesExterieur;
}


/* ======================================================
RECONSTRUCTION DE LA LISTE
====================================================== */

liste.forEach(function(piece){

const option = document.createElement("option");

option.value = piece;
option.textContent = piece;

select.appendChild(option);

});


/* ======================================================
ENREGISTRER LE TYPE
====================================================== */

const champType = document.getElementById("type-verification");

if(champType){
champType.value = type;
}

}
