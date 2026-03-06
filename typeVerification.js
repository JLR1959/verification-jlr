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

const boutonInterieur = document.getElementById("btn-interieur");
const boutonExterieur = document.getElementById("btn-exterieur");

const bandeau = document.getElementById("bandeau-mode-verification");

const indicateur = document.getElementById("mode-verification-indicateur");

document.getElementById("type-verification").value = type;

select.innerHTML = '<option value="">Sélectionnez une pièce</option>';

let liste = [];

if(type === "interieur"){

liste = piecesInterieur;

boutonInterieur.classList.add("actif");
boutonExterieur.classList.remove("actif");

bandeau.classList.add("bandeau-interieur");
bandeau.classList.remove("bandeau-exterieur");

bandeau.innerText = "🏠 Mode actif : Vérification INTÉRIEURE";

indicateur.className = "mode-interieur";
indicateur.innerText = "Mode de vérification : INTÉRIEUR";

}



if(type === "exterieur"){

liste = piecesExterieur;

boutonExterieur.classList.add("actif");
boutonInterieur.classList.remove("actif");

bandeau.classList.add("bandeau-exterieur");
bandeau.classList.remove("bandeau-interieur");

bandeau.innerText = "🌳 Mode actif : Vérification EXTÉRIEURE";

indicateur.className = "mode-exterieur";
indicateur.innerText = "Mode de vérification : EXTÉRIEUR";

}



indicateur.style.display = "block";



liste.forEach(function(piece){

const option = document.createElement("option");

option.value = piece;

option.textContent = piece;

select.appendChild(option);

});

}
