function remplirRapport(){

document.getElementById("rapport-dossier").textContent =
document.getElementById("numeroDossier").value;

document.getElementById("rapport-locataire").textContent =
document.getElementById("locataire").value;

document.getElementById("rapport-telephone").textContent =
document.getElementById("telephone").value;

document.getElementById("rapport-adresse").textContent =
document.getElementById("adresse").value + ", " +
document.getElementById("ville").value;

}

function imprimerRapport(){

remplirRapport();

window.print();

}
