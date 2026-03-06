document.addEventListener("DOMContentLoaded", function(){

const section = document.getElementById("section-pieces-verification");
const liste = document.getElementById("liste-pieces");

if(!section || !liste) return;



function verifierEtatPieces(){

if(liste.children.length > 0){

section.style.display = "block";

}else{

section.style.display = "none";

}

}



const observer = new MutationObserver(function(){

verifierEtatPieces();

});



observer.observe(liste,{

childList:true,
subtree:true

});



verifierEtatPieces();

});
