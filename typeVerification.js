function choisirVerification(type){

const champType = document.getElementById("type-verification");

const boutonInterieur = document.getElementById("btn-interieur");
const boutonExterieur = document.getElementById("btn-exterieur");

const groupeInterieur = document.getElementById("pieces-interieur");
const groupeExterieur = document.getElementById("pieces-exterieur");

const indicateur = document.getElementById("mode-verification-indicateur");
const bandeau = document.getElementById("bandeau-mode-verification");

const selectPieces = document.getElementById("type-piece");

champType.value = type;

boutonInterieur.classList.remove("actif");
boutonExterieur.classList.remove("actif");

bandeau.classList.remove("bandeau-interieur");
bandeau.classList.remove("bandeau-exterieur");

if(type === "interieur"){

boutonInterieur.classList.add("actif");

groupeInterieur.style.display = "block";
groupeExterieur.style.display = "none";

indicateur.style.display = "block";
indicateur.className = "mode-interieur";
indicateur.innerText = "Mode de vérification : INTÉRIEUR";

bandeau.classList.add("bandeau-interieur");
bandeau.innerText = "🏠 Mode actif : Vérification INTÉRIEURE";

}

if(type === "exterieur"){

boutonExterieur.classList.add("actif");

groupeInterieur.style.display = "none";
groupeExterieur.style.display = "block";

indicateur.style.display = "block";
indicateur.className = "mode-exterieur";
indicateur.innerText = "Mode de vérification : EXTÉRIEUR";

bandeau.classList.add("bandeau-exterieur");
bandeau.innerText = "🌳 Mode actif : Vérification EXTÉRIEURE";

}

selectPieces.value = "";

}



document.addEventListener("DOMContentLoaded", function(){

const groupeInterieur = document.getElementById("pieces-interieur");
const groupeExterieur = document.getElementById("pieces-exterieur");

groupeInterieur.style.display = "none";
groupeExterieur.style.display = "none";

});
