
/* ======================================================
MODULE 1 IMPRIMER RAPPORT
====================================================== */


function imprimerRapport() {

window.print();

}

/* ======================================================
MODULE 2
INJECTION FACTURATION DANS RAPPORT
====================================================== */

const facture = calculerFacturationRapport();

document.getElementById("rapport-heures").textContent = facture.heures;
document.getElementById("rapport-sous-total").textContent = facture.sousTotal;
document.getElementById("rapport-tps").textContent = facture.tps;
document.getElementById("rapport-tvq").textContent = facture.tvq;
document.getElementById("rapport-total").textContent = facture.total;


/* ======================================================
MODULE 3 FACTURATION
====================================================== */

<h2>Facturation</h2>

<p>Temps travaillé : <span id="rapport-heures">0.00</span> heures</p>

<p>Taux horaire : 125.00 $ / heure</p>

<p>Sous-total : <span id="rapport-sous-total">0.00</span> $</p>

<p>TPS (5%) : <span id="rapport-tps">0.00</span> $</p>

<p>TVQ (9.975%) : <span id="rapport-tvq">0.00</span> $</p>

<h3>Total à payer : <span id="rapport-total">0.00</span> $</h3>



