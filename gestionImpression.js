document.addEventListener("DOMContentLoaded", function () {

const rapport = document.getElementById("rapport-impression");

if (!rapport) {
return;
}

rapport.style.display = "none";

window.addEventListener("beforeprint", function () {

rapport.style.display = "block";

});

window.addEventListener("afterprint", function () {

rapport.style.display = "none";

});

});



function imprimerRapport() {

const rapport = document.getElementById("rapport-impression");

if (!rapport) {
window.print();
return;
}

rapport.style.display = "block";

setTimeout(function () {

window.print();

setTimeout(function () {

rapport.style.display = "none";

}, 100);

}, 100);

}
