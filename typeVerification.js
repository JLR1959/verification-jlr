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

function choisirVerification(type){

const select = document.getElementById("type-piece");

select.innerHTML = '<option value="">Sélectionnez une pièce</option>';

let liste = [];

if(type === "interieur"){
liste = piecesInterieur;
}

if(type === "exterieur"){
liste = piecesExterieur;
}

liste.forEach(function(piece){

const option = document.createElement("option");

option.value = piece;
option.textContent = piece;

select.appendChild(option);

});

}
