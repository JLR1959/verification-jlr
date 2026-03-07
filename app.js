// ======================================================
// MODULE 1
// NUMÉRO DOSSIER AUTOMATIQUE
// ======================================================

function genererNumeroDossier() {

  const nom = document.getElementById("locataire")?.value.trim() || "";
  const tel = document.getElementById("telephone")?.value.trim() || "";
  const apt = document.getElementById("numeroAppartement")?.value.trim() || "";
  const champ = document.getElementById("numeroDossier");

  if (!champ) return;

  if (!nom || !tel || !apt) {
    champ.value = "";
    return;
  }

  const aujourdHui = new Date();

  const dateActive =
    aujourdHui.getFullYear().toString() +
    String(aujourdHui.getMonth() + 1).padStart(2, "0") +
    String(aujourdHui.getDate()).padStart(2, "0");

  const nomFormate = nom
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");

  const telephoneFormate = tel.replace(/\D/g, "");
  const appartementFormate = apt.toLowerCase().replace(/\s+/g, "");

  champ.value =
    "VPIJLR-" +
    dateActive + "-" +
    nomFormate + "-" +
    telephoneFormate + "-" +
    appartementFormate;

}

document.addEventListener("DOMContentLoaded", function () {

  const champs = [
    "locataire",
    "telephone",
    "numeroAppartement"
  ];

  champs.forEach(id => {

    const element = document.getElementById(id);
    if (!element) return;

    element.addEventListener("input", genererNumeroDossier);
    element.addEventListener("change", genererNumeroDossier);

  });

  genererNumeroDossier();

});

// ======================================================
// MODULE 2
// OUTILS GÉNÉRIQUES
// ======================================================

function champ(label, options) {

  let html = `<label>${label}
  <select>
  <option value="">Sélectionnez</option>`;

  options.forEach(option => {
    html += `<option>${option}</option>`;
  });

  html += `</select></label>`;

  return html;

}

function texte(label) {

  return `<label>${label}
  <textarea rows="3" style="width:100%;"></textarea>
  </label>`;

}

// ======================================================
// MODULE 3
// ÉQUIPEMENTS TECHNIQUES
// ======================================================

const equipementsTechniques = {

  "Système d'alarme": () =>
    champ("Système d'alarme - Présence", ["Présent","Absent"]) +
    champ("Système d'alarme - Fonctionnalité", ["Fonctionnel","Défectueux"]),

  "Détecteur CO2": () =>
    champ("Détecteur CO2 - Présence", ["Présent","Absent"]) +
    champ("Détecteur CO2 - Fonctionnalité", ["Fonctionnel","Défectueux"]),

  "Caméra surveillance": () =>
    champ("Caméra surveillance - Présence", ["Présente","Absente"]) +
    champ("Caméra surveillance - Fonctionnalité", ["Fonctionnelle","Défectueuse"]),

  "Interphone": () =>
    champ("Interphone - Présence", ["Présent","Absent"]) +
    champ("Interphone - Fonctionnalité", ["Fonctionnel","Défectueux"]),

  "Accès handicapé": () =>
    champ("Accès handicapé - Présence", ["Présent","Absent"]) +
    champ("Accès handicapé - Conformité", ["Conforme","Non conforme"]),

  "Thermopompe": () =>
    champ("Thermopompe - Présence", ["Présente","Absente"]) +
    champ("Thermopompe - Type", ["Murale","Centrale"]) +
    champ("Thermopompe - Fonctionnalité", ["Fonctionnelle","Défectueuse"]),

  "Échangeur d'air": () =>
    champ("Échangeur d'air - Présence", ["Présent","Absent"]) +
    champ("Échangeur d'air - Fonctionnalité", ["Fonctionnel","Défectueux"]),

  "Panneau secondaire": () =>
    champ("Panneau secondaire - Présence", ["Présent","Absent"]) +
    champ("Panneau secondaire - État", ["Bon","Non conforme"]),

  "Compteur électrique": () =>
    champ("Compteur électrique - Présence", ["Présent","Absent"]) +
    champ("Compteur électrique - État", ["Bon","Endommagé"]),

  "Valve principale eau": () =>
    champ("Valve principale eau - Présence", ["Présente","Absente"]) +
    champ("Valve principale eau - État", ["Bonne","Fuite"]),

  "Compteur eau": () =>
    champ("Compteur eau - Présence", ["Présent","Absent"]) +
    champ("Compteur eau - État", ["Bon","Défectueux"]),

  "Sortie extérieure": () =>
    champ("Sortie extérieure - Présence", ["Présente","Absente"]) +
    champ("Sortie extérieure - État", ["Bonne","Endommagée"]),

  "Balcon": () =>
    champ("Balcon - Présence", ["Présent","Absent"]) +
    champ("Balcon - État", ["Bon","Instable","Endommagé"]) +
    champ("Garde-corps balcon - État", ["Bon","Instable","Non conforme"])

};

// ======================================================
// MODULE 4
// AJOUT ÉQUIPEMENT
// ======================================================

function ajouterEquipement(pieceId) {

  const piece = document.getElementById(pieceId);
  if (!piece) return;

  const select = document.getElementById("equipement-" + pieceId);
  const type = select.value;

  if (!type) return;

  const zone = piece.querySelector(".liste-equipements");

  const bloc = document.createElement("div");
  bloc.className = "bloc-equipement";

  bloc.innerHTML =
  `<strong>${type}</strong>
   <button type="button" onclick="this.parentElement.remove()">Supprimer</button>
   ${equipementsTechniques[type]()}
  `;

  zone.appendChild(bloc);

  select.value = "";

}

// ======================================================
// MODULE 5.1
// MODÈLES DE PIÈCES – COMPLÉTÉES ET DÉTAILLÉES
// ======================================================

const modelesPieces = {

  "Cuisine": function() {
    let html = "";

   html += champ("Plafond - Type", ["Gypsum","Bois","Suspendu","Béton"]);
    html += champ("Plafond - État", ["Bon","Fissuré","Taché","Endommagé"]);
    html += champ("Plafond - Matériau", ["Plâtre","PVC","Bois","Métal"]);
    html += champ("Plafond - Esthétique", ["Esthétique OK", "Taches visibles", "Fissures importantes"]);

    // Vérification des murs
    html += champ("Mur - Type", ["Cloison sèche","Brique","Bois","Béton"]);
    html += champ("Mur - État", ["Bon","Fissuré","Humidité"]);
    html += champ("Mur - Matériau", ["Peinture","Papier peint","Carrelage","Bois"]);
    html += champ("Mur - Esthétique", ["Esthétique OK", "Peinture écaillée", "Humidité visible"]);

    // Vérification du plancher
    html += champ("Plancher - Type", ["Céramique","Vinyle","Bois"]);
    html += champ("Plancher - État", ["Bon","Usé","Endommagé"]);
    html += champ("Plancher - Matériau", ["Bois franc","Stratifié","Vinyle","Céramique"]);
    html += champ("Plancher - Esthétique", ["Esthétique OK", "Rayures visibles", "Moins stable"]);

    // Vérification des fenêtres
    html += champ("Fenêtre - Présence", ["Présente","Absente"]);
    html += champ("Fenêtre - Type", ["Coulissante","À battant","Fixe"]);
    html += champ("Fenêtre - État", ["Bonne","À réparer","Brisée"]);
    html += champ("Fenêtre - Matériau", ["PVC","Aluminium","Bois"]);
    html += champ("Fenêtre - Étanchéité", ["Bonne","Air","Infiltration"]);
    html += champ("Fenêtre - Mécanisme", ["Coulissant","Oscillo-battant","Fixe"]);
    html += champ("Fenêtre - Quantité", ["1","2","3+"]);
    html += champ("Fenêtre - Moustiquaire", ["Présente","Absente"]);
    html += champ("Fenêtre - Esthétique", ["Esthétique OK", "Condensation", "Encrassée"]);

    // Vérification des armoires
    html += champ("Armoires supérieures - Type", ["Standard","Modulaire","Sur mesure"]);
    html += champ("Armoires supérieures - État", ["Bonnes","Endommagées","Gondolées"]);
    html += champ("Armoires supérieures - Matériau", ["Bois","Mélamine","PVC"]);
    html += champ("Armoires supérieures - Esthétique", ["Esthétique OK", "Portes gondolées", "Gros éraflures"]);

    html += champ("Armoires inférieures - Type", ["Standard","Modulaire","Sur mesure"]);
    html += champ("Armoires inférieures - État", ["Bonnes","Endommagées","Humidité"]);
    html += champ("Armoires inférieures - Matériau", ["Bois","Mélamine","PVC"]);
    html += champ("Armoires inférieures - Esthétique", ["Esthétique OK", "Humidité visible", "Portes déformées"]);

    // Vérification des éviers
    html += champ("Évier - Type", ["Simple","Double","Commercial"]);
    html += champ("Évier - État", ["Bon","Fissuré","Rouille"]);
    html += champ("Évier - Matériau", ["Inox","Composite","Céramique"]);
    html += champ("Évier - Fonctionnalité", ["Fonctionnel","Défectueux"]);
    html += champ("Évier - Esthétique", ["Esthétique OK", "Fissures", "Taches de rouille"]);

    // Vérification des robinets
    html += champ("Robinetterie - Type", ["Standard","À détecteur","Combinée"]);
    html += champ("Robinetterie - État", ["Bonne","Fuite","Défectueuse"]);
    html += champ("Robinetterie - Matériau", ["Chrome","Noir mat","Inox"]);
    html += champ("Robinetterie - Esthétique", ["Esthétique OK", "Fuite visible", "Corrosion"]);

    // Vérification des hottes
    html += champ("Hotte - Présence", ["Présente","Absente"]);
    html += champ("Hotte - Type", ["Standard","Micro-ondes intégrée","Commerciale"]);
    html += champ("Hotte - État", ["Fonctionnelle","Défectueuse","Bruyante"]);
    html += champ("Hotte - Matériau", ["Inox","Plastique","Aluminium"]);
    html += champ("Hotte - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);
    html += champ("Hotte - Esthétique", ["Esthétique OK", "Bruits anormaux", "Taches visibles"]);

    // Vérification du lave-vaisselle
    html += champ("Lave-vaisselle - Présence", ["Présent","Absent"]);
    html += champ("Lave-vaisselle - Fonctionnalité", ["Fonctionnel","Défectueux"]);
    html += champ("Lave-vaisselle - Esthétique", ["Esthétique OK", "Usure sur les bords", "Encrassé"]);

    // Commentaires de la cuisine
    html += texte("Commentaires cuisine");
    return html;
  },
  
  "Porte": function() {
  let html = "";

  // Présence
  html += champ("Porte - Présence", [
    "Présente",
    "Absente"
  ]);

  // Type
  html += champ("Porte - Type", [
    "Intérieure",
    "Extérieure",
    "Coulissante",
    "Française",
    "Pliante"
  ]);

  // Matériau
  html += champ("Porte - Matériau", [
    "Bois",
    "PVC",
    "Aluminium",
    "Métal",
    "Verre",
    "Composite"
  ]);

  // État général
  html += champ("Porte - État général", [
    "Bon",
    "Usure normale",
    "Endommagée"
  ]);

  // Alignement
  html += champ("Porte - Alignement", [
    "Correct",
    "Légèrement décalé",
    "Mal aligné"
  ]);

  // Charnières
  html += champ("Charnières - État", [
    "Bon",
    "Grincement",
    "Desserrées",
    "Endommagées"
  ]);

  // Poignée
  html += champ("Poignée - Fonctionnement", [
    "Fonctionnelle",
    "Légèrement dure",
    "Défectueuse"
  ]);

  // Serrure
  html += champ("Serrure - Fonctionnement", [
    "Fonctionnelle",
    "Difficile",
    "Défectueuse",
    "Absente"
  ]);

  // Coupe-froid
  html += champ("Coupe-froid - État", [
    "Bon",
    "Usé",
    "Absent"
  ]);

  // Étanchéité
  html += champ("Étanchéité - État", [
    "Bonne",
    "Air présent",
    "Infiltration possible"
  ]);

  // Esthétique
  html += champ("Porte - Esthétique", [
    "Esthétique OK",
    "Égratignures",
    "Peinture écaillée",
    "Endommagée"
  ]);

  html += texte("Commentaires porte");

  return html;
},

"Salle de bain": function() {
  let html = "";

  // Vérification du plafond
  html += champ("Plafond - Type", ["Gypsum","Bois","Suspendu","Béton"]);
  html += champ("Plafond - État", ["Bon","Taché","Fissuré","Moisissure"]);
  html += champ("Plafond - Matériau", ["Plâtre","PVC","Bois"]);
  html += champ("Plafond - Esthétique", ["Esthétique OK","Taches visibles","Moisissure"]);

  // Vérification des murs
  html += champ("Mur - Type", ["Cloison sèche","Carrelage","Brique"]);
  html += champ("Mur - État", ["Bon","Humidité","Fissuré","Moisissure"]);
  html += champ("Mur - Matériau", ["Peinture","Carrelage","Bois"]);
  html += champ("Mur - Esthétique", ["Esthétique OK","Peinture écaillée","Humidité visible"]);

  // Vérification du plancher
  html += champ("Plancher - Type", ["Céramique","Vinyle","Bois"]);
  html += champ("Plancher - État", ["Bon","Usé","Endommagé"]);
  html += champ("Plancher - Matériau", ["Céramique","Vinyle","Bois"]);
  html += champ("Plancher - Esthétique", ["Esthétique OK","Rayures","Instable"]);

  // Vérification des fenêtres
  html += champ("Fenêtre - Présence", ["Présente","Absente"]);
  html += champ("Fenêtre - Type", ["Coulissante","À battant","Fixe"]);
  html += champ("Fenêtre - État", ["Bonne","À réparer","Brisée"]);
  html += champ("Fenêtre - Matériau", ["PVC","Aluminium","Bois"]);
  html += champ("Fenêtre - Étanchéité", ["Bonne","Air","Infiltration"]);
  html += champ("Fenêtre - Quantité", ["1","2","3+"]);
  html += champ("Fenêtre - Moustiquaire", ["Présente","Absente"]);

  // Vérification du lavabo
  html += champ("Lavabo - Type", ["Simple","Double","Suspendu"]);
  html += champ("Lavabo - État", ["Bon","Fissuré","Endommagé"]);
  html += champ("Lavabo - Matériau", ["Céramique","Composite","Verre"]);
  html += champ("Lavabo - Fonctionnalité", ["Fonctionnel","Drain lent","Défectueux"]);
  html += champ("Lavabo - Esthétique", ["Esthétique OK","Taches","Fissures"]);

  // Vérification de la vanité
  html += champ("Vanité - Type", ["Sur pied","Suspendue","Modulaire"]);
  html += champ("Vanité - État", ["Bonne","Endommagée","Humidité"]);
  html += champ("Vanité - Matériau", ["Bois","Mélamine","PVC"]);
  html += champ("Vanité - Esthétique", ["Esthétique OK","Portes gonflées","Éraflures"]);

  // Vérification toilette
  html += champ("Toilette - Type", ["Standard","Suspendue","Double chasse"]);
  html += champ("Toilette - État", ["Bonne","Fuite","Instable"]);
  html += champ("Toilette - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);
  html += champ("Toilette - Étanchéité", ["Bonne","Fuite base","Fuite réservoir"]);
  html += champ("Toilette - Esthétique", ["Esthétique OK","Taches","Jaunissement"]);

  // Vérification douche
  html += champ("Douche - Type", ["Coin","Murale","Walk-in"]);
  html += champ("Douche - État", ["Bonne","Fuite","Moisissure"]);
  html += champ("Douche - Matériau", ["Fibre de verre","Céramique","Acrylique"]);
  html += champ("Douche - Étanchéité", ["Bonne","Infiltration","Joint dégradé"]);
  html += champ("Douche - Esthétique", ["Esthétique OK","Joints noirs","Calcaire"]);

  // Vérification baignoire
  html += champ("Baignoire - Type", ["Encastrée","Autoportante"]);
  html += champ("Baignoire - État", ["Bonne","Fissurée","Endommagée"]);
  html += champ("Baignoire - Matériau", ["Acrylique","Fonte","Composite"]);
  html += champ("Baignoire - Étanchéité", ["Bonne","Joint dégradé","Fuite"]);
  html += champ("Baignoire - Esthétique", ["Esthétique OK","Rayures","Calcaire"]);

  // Vérification robinetterie
  html += champ("Robinetterie bain - Type", ["Standard","Thermostatique","Combinée"]);
  html += champ("Robinetterie bain - État", ["Bonne","Fuite","Défectueuse"]);
  html += champ("Robinetterie bain - Matériau", ["Chrome","Noir mat","Inox"]);
  html += champ("Robinetterie bain - Esthétique", ["Esthétique OK","Corrosion","Calcaire"]);

  // Ventilation
  html += champ("Ventilation - Type", ["Mécanique","Naturelle"]);
  html += champ("Ventilation - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);
  html += champ("Ventilation - Bruit", ["Normal","Bruyant"]);

  // Électricité
  html += champ("Prise GFCI - Présence", ["Présente","Absente"]);
  html += champ("Prise GFCI - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

  html += champ("Éclairage - Type", ["Plafonnier","Encastré","Applique murale"]);
  html += champ("Éclairage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  // Chauffage
  html += champ("Chauffage - Type", ["Plinthe","Radiateur","Convecteur"]);
  html += champ("Chauffage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  html += texte("Commentaires salle de bain");

  return html;
},

"Salle d'eau": function() {
  let html = "";

  // Vérification du plafond
  html += champ("Plafond - Type", ["Gypsum","Bois","Suspendu","Béton"]);
  html += champ("Plafond - État", ["Bon","Taché","Fissuré","Moisissure"]);
  html += champ("Plafond - Matériau", ["Plâtre","PVC","Bois"]);
  html += champ("Plafond - Esthétique", ["Esthétique OK","Taches visibles","Moisissure"]);

  // Vérification des murs
  html += champ("Mur - Type", ["Cloison sèche","Carrelage","Brique"]);
  html += champ("Mur - État", ["Bon","Humidité","Fissuré","Moisissure"]);
  html += champ("Mur - Matériau", ["Peinture","Carrelage","Bois"]);
  html += champ("Mur - Esthétique", ["Esthétique OK","Peinture écaillée","Humidité visible"]);

  // Vérification du plancher
  html += champ("Plancher - Type", ["Céramique","Vinyle","Bois"]);
  html += champ("Plancher - État", ["Bon","Usé","Endommagé"]);
  html += champ("Plancher - Matériau", ["Céramique","Vinyle","Bois"]);
  html += champ("Plancher - Esthétique", ["Esthétique OK","Rayures","Instable"]);

  // Vérification du lavabo
  html += champ("Lavabo - Type", ["Simple","Suspendu"]);
  html += champ("Lavabo - État", ["Bon","Fissuré","Endommagé"]);
  html += champ("Lavabo - Matériau", ["Céramique","Composite","Verre"]);
  html += champ("Lavabo - Fonctionnalité", ["Fonctionnel","Drain lent","Défectueux"]);
  html += champ("Lavabo - Esthétique", ["Esthétique OK","Taches","Fissures"]);

  // Vérification de la vanité
  html += champ("Vanité - Type", ["Sur pied","Suspendue"]);
  html += champ("Vanité - État", ["Bonne","Endommagée","Humidité"]);
  html += champ("Vanité - Matériau", ["Bois","Mélamine","PVC"]);
  html += champ("Vanité - Esthétique", ["Esthétique OK","Portes gonflées","Éraflures"]);

  // Vérification toilette
  html += champ("Toilette - Type", ["Standard","Suspendue","Double chasse"]);
  html += champ("Toilette - État", ["Bonne","Fuite","Instable"]);
  html += champ("Toilette - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);
  html += champ("Toilette - Étanchéité", ["Bonne","Fuite base","Fuite réservoir"]);
  html += champ("Toilette - Esthétique", ["Esthétique OK","Taches","Jaunissement"]);

  // Ventilation
  html += champ("Ventilation - Type", ["Mécanique","Naturelle"]);
  html += champ("Ventilation - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

  // Électricité
  html += champ("Prise GFCI - Présence", ["Présente","Absente"]);
  html += champ("Prise GFCI - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

  html += champ("Éclairage - Type", ["Plafonnier","Applique murale"]);
  html += champ("Éclairage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  html += texte("Commentaires salle d'eau");

  return html;
},

"Salle à manger": function() {
  let html = "";

  // Vérification du plafond
  html += champ("Plafond - Type", ["Gypsum","Bois","Suspendu","Béton"]);
  html += champ("Plafond - État", ["Bon","Fissuré","Taché","Endommagé"]);
  html += champ("Plafond - Matériau", ["Plâtre","PVC","Bois"]);
  html += champ("Plafond - Esthétique", ["Esthétique OK","Taches visibles","Fissures importantes"]);

  // Vérification des murs
  html += champ("Mur - Type", ["Cloison sèche","Brique","Bois"]);
  html += champ("Mur - État", ["Bon","Fissuré","Humidité"]);
  html += champ("Mur - Matériau", ["Peinture","Papier peint","Bois","Pierre"]);
  html += champ("Mur - Esthétique", ["Esthétique OK","Peinture écaillée","Humidité visible"]);

  // Vérification du plancher
  html += champ("Plancher - Type", ["Bois","Céramique","Vinyle"]);
  html += champ("Plancher - État", ["Bon","Usé","Endommagé"]);
  html += champ("Plancher - Matériau", ["Bois franc","Stratifié","Vinyle","Céramique"]);
  html += champ("Plancher - Esthétique", ["Esthétique OK","Rayures visibles","Moins stable"]);

  // Vérification des fenêtres
  html += champ("Fenêtre - Présence", ["Présente","Absente"]);
  html += champ("Fenêtre - Type", ["Coulissante","À battant","Fixe"]);
  html += champ("Fenêtre - État", ["Bonne","À réparer","Brisée"]);
  html += champ("Fenêtre - Matériau", ["PVC","Aluminium","Bois"]);
  html += champ("Fenêtre - Étanchéité", ["Bonne","Air","Infiltration"]);
  html += champ("Fenêtre - Quantité", ["1","2","3+"]);
  html += champ("Fenêtre - Moustiquaire", ["Présente","Absente"]);

  // Vérification des portes
  html += champ("Porte intérieure - Présence", ["Présente","Absente"]);
  html += champ("Porte intérieure - Type", ["Standard","Française","Coulissante"]);
  html += champ("Porte intérieure - État", ["Bonne","À réparer","Endommagée"]);
  html += champ("Porte intérieure - Poignée", ["Fonctionnelle","Défectueuse"]);
  html += champ("Porte intérieure - Esthétique", ["Esthétique OK","Égratignures","Peinture écaillée"]);

  // Vérification éclairage
  html += champ("Éclairage - Type", ["Plafonnier","Suspension","Encastré"]);
  html += champ("Éclairage - Fonctionnalité", ["Fonctionnel","Défectueux"]);
  html += champ("Éclairage - Esthétique", ["Esthétique OK","Luminaire endommagé"]);

  // Vérification prises électriques
  html += champ("Prises électriques - Quantité", ["1","2","3","4+"]);
  html += champ("Prises électriques - Type", ["Standard","GFCI","USB"]);
  html += champ("Prises électriques - Fonctionnalité", ["Fonctionnelles","Défectueuses"]);

  // Chauffage
  html += champ("Chauffage - Type", ["Plinthe","Radiateur","Convecteur"]);
  html += champ("Chauffage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  html += texte("Commentaires salle à manger");

  return html;
},

"Salon": function() {
  let html = "";

  // Vérification du plafond
  html += champ("Plafond - Type", ["Gypsum","Bois","Suspendu","Béton"]);
  html += champ("Plafond - État", ["Bon","Fissuré","Taché","Endommagé"]);
  html += champ("Plafond - Matériau", ["Plâtre","PVC","Bois","Métal"]);
  html += champ("Plafond - Esthétique", ["Esthétique OK","Taches visibles","Fissures importantes"]);

  // Vérification des murs
  html += champ("Mur - Type", ["Cloison sèche","Brique","Bois","Béton"]);
  html += champ("Mur - État", ["Bon","Fissuré","Humidité"]);
  html += champ("Mur - Matériau", ["Peinture","Papier peint","Bois","Pierre"]);
  html += champ("Mur - Esthétique", ["Esthétique OK","Peinture écaillée","Humidité visible"]);

  // Vérification du plancher
  html += champ("Plancher - Type", ["Bois","Céramique","Vinyle","Tapis"]);
  html += champ("Plancher - État", ["Bon","Usé","Endommagé"]);
  html += champ("Plancher - Matériau", ["Bois franc","Stratifié","Vinyle","Céramique"]);
  html += champ("Plancher - Esthétique", ["Esthétique OK","Rayures visibles","Moins stable"]);

  // Vérification des fenêtres
  html += champ("Fenêtre - Présence", ["Présente","Absente"]);
  html += champ("Fenêtre - Type", ["Coulissante","À battant","Fixe"]);
  html += champ("Fenêtre - État", ["Bonne","À réparer","Brisée"]);
  html += champ("Fenêtre - Matériau", ["PVC","Aluminium","Bois"]);
  html += champ("Fenêtre - Étanchéité", ["Bonne","Air","Infiltration"]);
  html += champ("Fenêtre - Mécanisme", ["Coulissant","Oscillo-battant","Fixe"]);
  html += champ("Fenêtre - Quantité", ["1","2","3+"]);
  html += champ("Fenêtre - Moustiquaire", ["Présente","Absente"]);
  html += champ("Fenêtre - Esthétique", ["Esthétique OK","Condensation","Encrassée"]);

  // Vérification des portes
  html += champ("Porte intérieure - Présence", ["Présente","Absente"]);
  html += champ("Porte intérieure - Type", ["Standard","Française","Coulissante"]);
  html += champ("Porte intérieure - État", ["Bonne","À réparer","Endommagée"]);
  html += champ("Porte intérieure - Matériau", ["Bois","MDF","Verre"]);
  html += champ("Porte intérieure - Poignée", ["Fonctionnelle","Défectueuse"]);
  html += champ("Porte intérieure - Esthétique", ["Esthétique OK","Égratignures","Peinture écaillée"]);

  // Vérification foyer
  html += champ("Foyer - Présence", ["Présent","Absent"]);
  html += champ("Foyer - Type", ["Bois","Gaz","Électrique"]);
  html += champ("Foyer - État", ["Bon","Endommagé","Non fonctionnel"]);
  html += champ("Foyer - Esthétique", ["Esthétique OK","Suie visible","Briques fissurées"]);

  // Vérification électrique
  html += champ("Prises électriques - Quantité", ["1","2","3","4+"]);
  html += champ("Prises électriques - Type", ["Standard","GFCI","USB"]);
  html += champ("Prises électriques - Fonctionnalité", ["Fonctionnelles","Défectueuses"]);

  html += champ("Interrupteurs - Quantité", ["1","2","3+"]);
  html += champ("Interrupteurs - Fonctionnalité", ["Fonctionnels","Défectueux"]);

  // Vérification éclairage
  html += champ("Éclairage - Type", ["Plafonnier","Encastré","Applique murale"]);
  html += champ("Éclairage - Fonctionnalité", ["Fonctionnel","Défectueux"]);
  html += champ("Éclairage - Esthétique", ["Esthétique OK","Ampoule manquante","Luminaire endommagé"]);

  // Vérification chauffage
  html += champ("Chauffage - Type", ["Plinthe","Radiateur","Convecteur"]);
  html += champ("Chauffage - Fonctionnalité", ["Fonctionnel","Défectueux"]);
  html += champ("Chauffage - Esthétique", ["Esthétique OK","Rouille","Peinture écaillée"]);

  // Sortie média
  html += champ("Sortie câble / internet - Présence", ["Présente","Absente"]);
  html += champ("Sortie câble / internet - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

  html += texte("Commentaires salon");

  return html;
},

"Vide sanitaire": function() {
  let html = "";

  // Accès
  html += champ("Accès au vide sanitaire", [
    "Trappe intérieure",
    "Trappe extérieure",
    "Accès direct",
    "Accès difficile"
  ]);

  html += champ("Trappe d'accès - État", [
    "Bonne",
    "Endommagée",
    "Absente"
  ]);

  // Hauteur
  html += champ("Hauteur du vide sanitaire", [
    "Moins de 60 cm",
    "60 à 90 cm",
    "90 cm à 1.5 m",
    "Plus de 1.5 m"
  ]);

  // Sol
  html += champ("Sol - Type", [
    "Terre battue",
    "Gravier",
    "Béton",
    "Membrane pare-vapeur"
  ]);

  html += champ("Sol - État", [
    "Sec",
    "Humide",
    "Accumulation d'eau"
  ]);

  // Humidité
  html += champ("Humidité - Niveau", [
    "Aucune",
    "Faible",
    "Élevée"
  ]);

  html += champ("Odeur d'humidité", [
    "Aucune",
    "Légère",
    "Forte"
  ]);

  // Isolation
  html += champ("Isolation - Présence", [
    "Présente",
    "Absente"
  ]);

  html += champ("Isolation - État", [
    "Bonne",
    "Humide",
    "Endommagée"
  ]);

  // Structure
  html += champ("Poutres / solives - État", [
    "Bon",
    "Usure normale",
    "Humidité",
    "Endommagé"
  ]);

  // Ventilation
  html += champ("Ventilation - Présence", [
    "Présente",
    "Absente"
  ]);

  html += champ("Ventilation - État", [
    "Bonne",
    "Obstruée",
    "Insuffisante"
  ]);

  // Tuyauterie
  html += champ("Tuyauterie - Présence", [
    "Présente",
    "Absente"
  ]);

  html += champ("Tuyauterie - État", [
    "Bon",
    "Condensation",
    "Fuite possible"
  ]);

  // Câblage
  html += champ("Câblage électrique - Présence", [
    "Présent",
    "Absent"
  ]);

  html += champ("Câblage électrique - État", [
    "Bon",
    "À vérifier",
    "Non conforme"
  ]);

  html += texte("Commentaires vide sanitaire");

  return html;
},

"Bureau": function() {
  let html = "";

  // Vérification du plafond
  html += champ("Plafond - Type", ["Gypsum","Bois","Suspendu","Béton"]);
  html += champ("Plafond - État", ["Bon","Fissuré","Taché","Endommagé"]);
  html += champ("Plafond - Matériau", ["Plâtre","PVC","Bois"]);
  html += champ("Plafond - Esthétique", ["Esthétique OK","Taches visibles","Fissures importantes"]);

  // Vérification des murs
  html += champ("Mur - Type", ["Cloison sèche","Brique","Bois"]);
  html += champ("Mur - État", ["Bon","Fissuré","Humidité"]);
  html += champ("Mur - Matériau", ["Peinture","Papier peint","Bois","Pierre"]);
  html += champ("Mur - Esthétique", ["Esthétique OK","Peinture écaillée","Humidité visible"]);

  // Vérification du plancher
  html += champ("Plancher - Type", ["Bois","Céramique","Vinyle","Tapis"]);
  html += champ("Plancher - État", ["Bon","Usé","Endommagé"]);
  html += champ("Plancher - Matériau", ["Bois franc","Stratifié","Vinyle","Céramique","Tapis"]);
  html += champ("Plancher - Esthétique", ["Esthétique OK","Rayures visibles","Moins stable"]);

  // Vérification des fenêtres
  html += champ("Fenêtre - Présence", ["Présente","Absente"]);
  html += champ("Fenêtre - Type", ["Coulissante","À battant","Fixe"]);
  html += champ("Fenêtre - État", ["Bonne","À réparer","Brisée"]);
  html += champ("Fenêtre - Matériau", ["PVC","Aluminium","Bois"]);
  html += champ("Fenêtre - Étanchéité", ["Bonne","Air","Infiltration"]);
  html += champ("Fenêtre - Quantité", ["1","2","3+"]);
  html += champ("Fenêtre - Moustiquaire", ["Présente","Absente"]);

  // Vérification des portes
  html += champ("Porte intérieure - Présence", ["Présente","Absente"]);
  html += champ("Porte intérieure - Type", ["Standard","Française","Coulissante"]);
  html += champ("Porte intérieure - État", ["Bonne","À réparer","Endommagée"]);
  html += champ("Porte intérieure - Poignée", ["Fonctionnelle","Défectueuse"]);
  html += champ("Porte intérieure - Esthétique", ["Esthétique OK","Égratignures","Peinture écaillée"]);

  // Vérification éclairage
  html += champ("Éclairage - Type", ["Plafonnier","Suspension","Encastré","Lampe bureau"]);
  html += champ("Éclairage - Fonctionnalité", ["Fonctionnel","Défectueux"]);
  html += champ("Éclairage - Esthétique", ["Esthétique OK","Luminaire endommagé"]);

  // Vérification prises électriques
  html += champ("Prises électriques - Quantité", ["1","2","3","4+"]);
  html += champ("Prises électriques - Type", ["Standard","GFCI","USB","Réseau"]);
  html += champ("Prises électriques - Fonctionnalité", ["Fonctionnelles","Défectueuses"]);

  // Vérification sorties internet
  html += champ("Sortie internet - Présence", ["Présente","Absente"]);
  html += champ("Sortie internet - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

  // Chauffage
  html += champ("Chauffage - Type", ["Plinthe","Radiateur","Convecteur"]);
  html += champ("Chauffage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  html += texte("Commentaires bureau");

  return html;
},

  "Chambre": function() {
    let html = "";
    html += champ("Plafond - Type", ["Gypsum","Bois","Béton"]);
    html += champ("Plafond - État", ["Bon","Fissuré"]);
    html += champ("Plafond - Matériau", ["Plâtre","Bois","PVC"]);

    html += champ("Mur - Type", ["Cloison sèche","Brique","Bois"]);
    html += champ("Mur - État", ["Bon","Taché"]);
    html += champ("Mur - Matériau", ["Peinture","Bois","Carrelage"]);

    html += champ("Plancher - Type", ["Bois","Céramique","Vinyle"]);
    html += champ("Plancher - État", ["Bon","Usé"]);
    html += champ("Plancher - Matériau", ["Bois","Céramique","Vinyle"]);

    html += champ("Fenêtre - Type", ["Coulissante","À battant","Fixe"]);
    html += champ("Fenêtre - État", ["Bonne","Air","Condensation"]);
    html += champ("Fenêtre - Matériau", ["PVC","Aluminium","Bois"]);
    html += champ("Fenêtre - Mécanisme", ["Coulissant","Oscillo-battant","Fixe"]);
    html += champ("Fenêtre - Quantité", ["1","2","3+"]);

    html += champ("Garde-robe - Présence", ["Présent","Absent"]);
    html += champ("Garde-robe - Type", ["Standard","Walk-in","Porte coulissante"]);
    html += champ("Garde-robe - État", ["Bon","Endommagé","Portes défectueuses"]);

    html += champ("Sortie TV - Présence", ["Présente","Absente"]);
    html += champ("Sortie TV - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Sortie téléphone - Présence", ["Présente","Absente"]);
    html += champ("Sortie téléphone - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Détecteur fumée - Présence", ["Présent","Absent"]);
    html += champ("Détecteur fumée - Fonctionnalité", ["Fonctionnel","Défectueux"]);

    html += texte("Commentaires chambre");

    return html;
  },
  
  "Corridor": function() {
  let html = "";

  // Vérification du plafond
  html += champ("Plafond - Type", ["Gypsum","Bois","Suspendu","Béton"]);
  html += champ("Plafond - État", ["Bon","Fissuré","Taché","Endommagé"]);
  html += champ("Plafond - Matériau", ["Plâtre","PVC","Bois"]);
  html += champ("Plafond - Esthétique", ["Esthétique OK","Taches visibles","Fissures importantes"]);

  // Vérification des murs
  html += champ("Mur - Type", ["Cloison sèche","Brique","Bois","Pierre"]);
  html += champ("Mur - État", ["Bon","Fissuré","Humidité"]);
  html += champ("Mur - Matériau", ["Peinture","Papier peint","Bois","Pierre"]);
  html += champ("Mur - Esthétique", ["Esthétique OK","Peinture écaillée","Humidité visible"]);

  // Vérification du plancher
  html += champ("Plancher - Type", ["Bois","Céramique","Vinyle","Tapis"]);
  html += champ("Plancher - État", ["Bon","Usé","Endommagé"]);
  html += champ("Plancher - Matériau", ["Bois franc","Stratifié","Vinyle","Céramique","Tapis"]);
  html += champ("Plancher - Esthétique", ["Esthétique OK","Rayures visibles","Moins stable"]);

  // Vérification des portes
  html += champ("Porte intérieure - Présence", ["Présente","Absente"]);
  html += champ("Porte intérieure - Type", ["Standard","Française","Coulissante"]);
  html += champ("Porte intérieure - État", ["Bonne","À réparer","Endommagée"]);
  html += champ("Porte intérieure - Poignée", ["Fonctionnelle","Défectueuse"]);
  html += champ("Porte intérieure - Esthétique", ["Esthétique OK","Égratignures","Peinture écaillée"]);

  // Vérification éclairage
  html += champ("Éclairage - Type", ["Plafonnier","Encastré","Applique murale"]);
  html += champ("Éclairage - Fonctionnalité", ["Fonctionnel","Défectueux"]);
  html += champ("Éclairage - Esthétique", ["Esthétique OK","Luminaire endommagé"]);

  // Vérification prises électriques
  html += champ("Prises électriques - Quantité", ["1","2","3","4+"]);
  html += champ("Prises électriques - Type", ["Standard","GFCI","USB"]);
  html += champ("Prises électriques - Fonctionnalité", ["Fonctionnelles","Défectueuses"]);

  // Chauffage
  html += champ("Chauffage - Type", ["Plinthe","Radiateur","Convecteur"]);
  html += champ("Chauffage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  html += texte("Commentaires corridor");

  return html;
},

"Escalier": function() {
  let html = "";

  // Vérification du plafond
  html += champ("Plafond - Type", ["Gypsum","Bois","Béton"]);
  html += champ("Plafond - État", ["Bon","Fissuré","Taché","Endommagé"]);
  html += champ("Plafond - Matériau", ["Plâtre","Bois","PVC"]);
  html += champ("Plafond - Esthétique", ["Esthétique OK","Taches visibles","Fissures importantes"]);

  // Vérification des murs
  html += champ("Mur - Type", ["Cloison sèche","Brique","Bois","Béton"]);
  html += champ("Mur - État", ["Bon","Fissuré","Humidité"]);
  html += champ("Mur - Matériau", ["Peinture","Bois","Pierre","Carrelage"]);
  html += champ("Mur - Esthétique", ["Esthétique OK","Peinture écaillée","Humidité visible"]);

  // Vérification de la structure de l'escalier
  html += champ("Escalier - Type", ["Bois","Métal","Béton"]);
  html += champ("Escalier - État", ["Bon","Usé","Endommagé"]);
  html += champ("Escalier - Stabilité", ["Stable","Instable"]);

  // Vérification des marches
  html += champ("Marches - Matériau", ["Bois","Métal","Béton","Céramique"]);
  html += champ("Marches - État", ["Bon","Usé","Endommagé"]);
  html += champ("Marches - Antidérapant", ["Présent","Absent"]);

  // Vérification de la rampe
  html += champ("Rampe - Présence", ["Présente","Absente"]);
  html += champ("Rampe - Matériau", ["Bois","Métal","Verre"]);
  html += champ("Rampe - Stabilité", ["Stable","Instable"]);
  html += champ("Rampe - État", ["Bonne","Endommagée"]);

  // Vérification du garde-corps
  html += champ("Garde-corps - Présence", ["Présent","Absent"]);
  html += champ("Garde-corps - Matériau", ["Bois","Métal","Verre"]);
  html += champ("Garde-corps - État", ["Bon","Endommagé"]);
  html += champ("Garde-corps - Stabilité", ["Stable","Instable"]);

  // Vérification de l'éclairage
  html += champ("Éclairage - Type", ["Plafonnier","Applique murale","Encastré"]);
  html += champ("Éclairage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  // Vérification prises électriques
  html += champ("Prises électriques - Présence", ["Présentes","Absentes"]);
  html += champ("Prises électriques - Fonctionnalité", ["Fonctionnelles","Défectueuses"]);

  html += texte("Commentaires escalier");

  return html;
},

"Hall d'entrée": function() {
  let html = "";

  // Vérification du plafond
  html += champ("Plafond - Type", ["Gypsum","Bois","Suspendu","Béton"]);
  html += champ("Plafond - État", ["Bon","Fissuré","Taché","Endommagé"]);
  html += champ("Plafond - Matériau", ["Plâtre","PVC","Bois"]);
  html += champ("Plafond - Esthétique", ["Esthétique OK","Taches visibles","Fissures importantes"]);

  // Vérification des murs
  html += champ("Mur - Type", ["Cloison sèche","Brique","Bois","Pierre"]);
  html += champ("Mur - État", ["Bon","Fissuré","Humidité"]);
  html += champ("Mur - Matériau", ["Peinture","Papier peint","Bois","Pierre"]);
  html += champ("Mur - Esthétique", ["Esthétique OK","Peinture écaillée","Humidité visible"]);

  // Vérification du plancher
  html += champ("Plancher - Type", ["Céramique","Bois","Vinyle","Tapis"]);
  html += champ("Plancher - État", ["Bon","Usé","Endommagé"]);
  html += champ("Plancher - Matériau", ["Céramique","Bois franc","Stratifié","Vinyle","Tapis"]);
  html += champ("Plancher - Esthétique", ["Esthétique OK","Rayures visibles","Moins stable"]);

  // Vérification de la porte principale
  html += champ("Porte principale - Type", ["Bois","Acier","Fibre de verre","Vitrée"]);
  html += champ("Porte principale - État", ["Bonne","À réparer","Endommagée"]);
  html += champ("Porte principale - Serrure", ["Fonctionnelle","Défectueuse"]);
  html += champ("Porte principale - Poignée", ["Fonctionnelle","Défectueuse"]);
  html += champ("Porte principale - Étanchéité", ["Bonne","Air","Infiltration"]);
  html += champ("Porte principale - Esthétique", ["Esthétique OK","Égratignures","Peinture écaillée"]);

  // Vérification des fenêtres
  html += champ("Fenêtre - Présence", ["Présente","Absente"]);
  html += champ("Fenêtre - Type", ["Coulissante","À battant","Fixe"]);
  html += champ("Fenêtre - État", ["Bonne","À réparer","Brisée"]);
  html += champ("Fenêtre - Étanchéité", ["Bonne","Air","Infiltration"]);

  // Vérification éclairage
  html += champ("Éclairage - Type", ["Plafonnier","Applique murale","Encastré"]);
  html += champ("Éclairage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  // Vérification prises électriques
  html += champ("Prises électriques - Quantité", ["1","2","3","4+"]);
  html += champ("Prises électriques - Type", ["Standard","GFCI","USB"]);
  html += champ("Prises électriques - Fonctionnalité", ["Fonctionnelles","Défectueuses"]);

  // Vérification garde-robe d'entrée
  html += champ("Garde-robe d'entrée - Présence", ["Présente","Absente"]);
  html += champ("Garde-robe d'entrée - Type", ["Standard","Walk-in","Porte coulissante"]);
  html += champ("Garde-robe d'entrée - État", ["Bon","Endommagé"]);

  // Chauffage
  html += champ("Chauffage - Type", ["Plinthe","Radiateur","Convecteur"]);
  html += champ("Chauffage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  html += texte("Commentaires hall d'entrée");

  return html;
},

"Sous-sol": function() {
  let html = "";

  // Vérification du plafond
  html += champ("Plafond - Type", ["Gypsum","Bois","Suspendu","Béton","Ouvert"]);
  html += champ("Plafond - État", ["Bon","Fissuré","Taché","Endommagé"]);
  html += champ("Plafond - Matériau", ["Plâtre","Bois","PVC","Métal"]);
  html += champ("Plafond - Esthétique", ["Esthétique OK","Taches visibles","Fissures importantes"]);

  // Vérification des murs
  html += champ("Mur - Type", ["Béton","Bloc de béton","Cloison sèche","Bois"]);
  html += champ("Mur - État", ["Bon","Fissuré","Humidité","Efflorescence"]);
  html += champ("Mur - Matériau", ["Peinture","Bois","Béton brut","Panneau"]);
  html += champ("Mur - Esthétique", ["Esthétique OK","Humidité visible","Peinture écaillée"]);

  // Vérification du plancher
  html += champ("Plancher - Type", ["Béton","Céramique","Vinyle","Bois"]);
  html += champ("Plancher - État", ["Bon","Usé","Endommagé","Humidité"]);
  html += champ("Plancher - Matériau", ["Béton","Céramique","Vinyle","Bois"]);
  html += champ("Plancher - Esthétique", ["Esthétique OK","Taches visibles","Fissures visibles"]);

  // Vérification des fenêtres
  html += champ("Fenêtre - Présence", ["Présente","Absente"]);
  html += champ("Fenêtre - Type", ["Coulissante","À battant","Fixe","Sous-sol"]);
  html += champ("Fenêtre - État", ["Bonne","À réparer","Brisée"]);
  html += champ("Fenêtre - Étanchéité", ["Bonne","Air","Infiltration"]);
  html += champ("Fenêtre - Puits de fenêtre", ["Présent","Absent"]);

  // Vérification éclairage
  html += champ("Éclairage - Type", ["Plafonnier","Encastré","Tube fluorescent"]);
  html += champ("Éclairage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  // Vérification prises électriques
  html += champ("Prises électriques - Quantité", ["1","2","3","4+"]);
  html += champ("Prises électriques - Type", ["Standard","GFCI"]);
  html += champ("Prises électriques - Fonctionnalité", ["Fonctionnelles","Défectueuses"]);

  // Vérification humidité
  html += champ("Humidité - Présence", ["Aucune","Faible","Modérée","Élevée"]);
  html += champ("Humidité - Odeur", ["Aucune","Humidité légère","Humidité forte"]);

  // Vérification drainage
  html += champ("Drain de plancher - Présence", ["Présent","Absent"]);
  html += champ("Drain de plancher - État", ["Bon","Obstrué","Endommagé"]);

  // Chauffage
  html += champ("Chauffage - Type", ["Plinthe","Radiateur","Convecteur"]);
  html += champ("Chauffage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  html += texte("Commentaires sous-sol");

  return html;
},

"Salle mécanique": function() {
  let html = "";

  // Vérification du plafond
  html += champ("Plafond - Type", ["Gypsum","Bois","Béton","Ouvert"]);
  html += champ("Plafond - État", ["Bon","Fissuré","Taché","Endommagé"]);
  html += champ("Plafond - Matériau", ["Plâtre","Bois","PVC","Métal"]);

  // Vérification des murs
  html += champ("Mur - Type", ["Béton","Bloc de béton","Cloison sèche"]);
  html += champ("Mur - État", ["Bon","Fissuré","Humidité"]);
  html += champ("Mur - Matériau", ["Peinture","Béton brut","Panneau"]);

  // Vérification du plancher
  html += champ("Plancher - Type", ["Béton","Céramique","Époxy"]);
  html += champ("Plancher - État", ["Bon","Fissuré","Humidité"]);
  html += champ("Plancher - Drain", ["Présent","Absent"]);

  // Vérification chauffe-eau
  html += champ("Chauffe-eau - Présence", ["Présent","Absent"]);
  html += champ("Chauffe-eau - Type", ["Électrique","Gaz"]);
  html += champ("Chauffe-eau - État", ["Bon","Rouille","Fuite"]);
  html += champ("Chauffe-eau - Année approximative", ["0-5 ans","5-10 ans","10+ ans"]);

  // Vérification fournaise / système chauffage
  html += champ("Système chauffage - Type", ["Fournaise","Chaudière","Thermopompe"]);
  html += champ("Système chauffage - État", ["Bon","À vérifier","Défectueux"]);
  html += champ("Système chauffage - Entretien", ["Récent","Ancien","Inconnu"]);

  // Vérification échangeur d'air
  html += champ("Échangeur d'air - Présence", ["Présent","Absent"]);
  html += champ("Échangeur d'air - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  // Vérification tuyauterie
  html += champ("Tuyauterie - Matériau", ["Cuivre","PEX","PVC","Mixte"]);
  html += champ("Tuyauterie - État", ["Bon","Corrosion","Fuite"]);

  // Vérification valve principale
  html += champ("Valve principale eau - Présence", ["Présente","Absente"]);
  html += champ("Valve principale eau - État", ["Bonne","Bloquée","Fuite"]);

  // Vérification pompe (si présente)
  html += champ("Pompe puisard - Présence", ["Présente","Absente"]);
  html += champ("Pompe puisard - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

  // Vérification ventilation
  html += champ("Ventilation mécanique - Présence", ["Présente","Absente"]);
  html += champ("Ventilation mécanique - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

  // Vérification humidité
  html += champ("Humidité - Présence", ["Aucune","Faible","Modérée","Élevée"]);

  html += texte("Commentaires salle mécanique");

  return html;
},

"Salle électrique": function() {
  let html = "";

  // Vérification du plafond
  html += champ("Plafond - Type", ["Gypsum","Bois","Béton","Ouvert"]);
  html += champ("Plafond - État", ["Bon","Fissuré","Taché","Endommagé"]);
  html += champ("Plafond - Matériau", ["Plâtre","Bois","PVC","Métal"]);

  // Vérification des murs
  html += champ("Mur - Type", ["Béton","Bloc de béton","Cloison sèche"]);
  html += champ("Mur - État", ["Bon","Fissuré","Humidité"]);
  html += champ("Mur - Matériau", ["Peinture","Béton brut","Panneau"]);

  // Vérification du plancher
  html += champ("Plancher - Type", ["Béton","Céramique","Époxy"]);
  html += champ("Plancher - État", ["Bon","Fissuré","Humidité"]);

  // Vérification du panneau électrique principal
  html += champ("Panneau électrique principal - Présence", ["Présent","Absent"]);
  html += champ("Panneau électrique principal - Type", ["Disjoncteurs","Fusibles"]);
  html += champ("Panneau électrique principal - État", ["Bon","Rouille","Endommagé"]);
  html += champ("Panneau électrique principal - Identification", ["Bien identifiés","Partiellement identifiés","Non identifiés"]);

  // Vérification panneau secondaire
  html += champ("Panneau secondaire - Présence", ["Présent","Absent"]);
  html += champ("Panneau secondaire - État", ["Bon","Rouille","Endommagé"]);

  // Vérification câblage apparent
  html += champ("Câblage apparent - Présence", ["Présent","Absent"]);
  html += champ("Câblage apparent - État", ["Bon","Endommagé","Non conforme"]);

  // Vérification prises électriques
  html += champ("Prises électriques - Présence", ["Présentes","Absentes"]);
  html += champ("Prises électriques - Type", ["Standard","GFCI"]);
  html += champ("Prises électriques - Fonctionnalité", ["Fonctionnelles","Défectueuses"]);

  // Vérification éclairage
  html += champ("Éclairage - Type", ["Plafonnier","Tube fluorescent","Encastré"]);
  html += champ("Éclairage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  // Vérification mise à la terre
  html += champ("Mise à la terre - Présence", ["Présente","Absente"]);
  html += champ("Mise à la terre - État", ["Bonne","À vérifier","Non conforme"]);

  // Vérification accès panneau
  html += champ("Accès au panneau - Dégagement", ["Conforme","Obstrué"]);

  html += texte("Commentaires salle électrique");

  return html;
},

"Éclairage": function() {
  let html = "";

  // Présence
  html += champ("Éclairage - Présence", ["Présent","Absent"]);

  // Type de luminaire
  html += champ("Luminaire - Type", [
    "Plafonnier",
    "Encastré",
    "Suspension",
    "Applique murale",
    "Rail lumineux",
    "Tube fluorescent",
    "DEL intégré"
  ]);

  // Quantité
  html += champ("Éclairage - Quantité", ["1","2","3","4+"]);

  // Fonctionnement
  html += champ("Éclairage - Fonctionnement", [
    "Fonctionnel",
    "Intermittent",
    "Ne fonctionne pas"
  ]);

  // Intensité lumineuse
  html += champ("Éclairage - Intensité", [
    "Bonne",
    "Faible",
    "Très faible"
  ]);

  // Fixation
  html += champ("Luminaire - Fixation", [
    "Stable",
    "Légèrement instable",
    "Instable"
  ]);

  // État esthétique
  html += champ("Luminaire - Esthétique", [
    "Esthétique OK",
    "Usure visible",
    "Endommagé"
  ]);

  // Interrupteur
  html += champ("Interrupteur - Présence", ["Présent","Absent"]);
  html += champ("Interrupteur - Fonctionnement", [
    "Fonctionnel",
    "Défectueux"
  ]);

  // Type d'ampoule
  html += champ("Ampoule - Type", [
    "DEL",
    "Halogène",
    "Fluocompacte",
    "Incandescente"
  ]);

  html += texte("Commentaires éclairage");

  return html;
},

"Salle lavage": function() {
  let html = "";

  // Vérification du plafond
  html += champ("Plafond - Type", ["Gypsum","Bois","Suspendu","Béton"]);
  html += champ("Plafond - État", ["Bon","Fissuré","Taché","Endommagé"]);
  html += champ("Plafond - Matériau", ["Plâtre","PVC","Bois","Métal"]);
  html += champ("Plafond - Esthétique", ["Esthétique OK","Taches visibles","Fissures importantes"]);

  // Vérification des murs
  html += champ("Mur - Type", ["Cloison sèche","Brique","Bois","Béton"]);
  html += champ("Mur - État", ["Bon","Fissuré","Humidité","Moisissure"]);
  html += champ("Mur - Matériau", ["Peinture","Carrelage","Bois","PVC"]);
  html += champ("Mur - Esthétique", ["Esthétique OK","Peinture écaillée","Humidité visible"]);

  // Vérification du plancher
  html += champ("Plancher - Type", ["Céramique","Vinyle","Béton","Bois"]);
  html += champ("Plancher - État", ["Bon","Usé","Endommagé","Humidité"]);
  html += champ("Plancher - Matériau", ["Céramique","Vinyle","Béton","Bois"]);
  html += champ("Plancher - Esthétique", ["Esthétique OK","Taches visibles","Fissures visibles"]);

  // Vérification des fenêtres
  html += champ("Fenêtre - Présence", ["Présente","Absente"]);
  html += champ("Fenêtre - Type", ["Coulissante","À battant","Fixe"]);
  html += champ("Fenêtre - État", ["Bonne","À réparer","Brisée"]);
  html += champ("Fenêtre - Étanchéité", ["Bonne","Air","Infiltration"]);

  // Vérification plomberie
  html += champ("Entrée eau chaude - Présence", ["Présente","Absente"]);
  html += champ("Entrée eau froide - Présence", ["Présente","Absente"]);
  html += champ("Drain laveuse - Présence", ["Présent","Absent"]);
  html += champ("Drain laveuse - État", ["Bon","Obstrué","Fuite"]);

  // Vérification laveuse
  html += champ("Laveuse - Présence", ["Présente","Absente"]);
  html += champ("Laveuse - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

  // Vérification sécheuse
  html += champ("Sécheuse - Présence", ["Présente","Absente"]);
  html += champ("Sécheuse - Type", ["Électrique","Gaz"]);
  html += champ("Sécheuse - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);
  html += champ("Sortie sécheuse - Présence", ["Présente","Absente"]);
  html += champ("Sortie sécheuse - État", ["Bonne","Obstruée","Endommagée"]);

  // Vérification prises électriques
  html += champ("Prise 110V - Présence", ["Présente","Absente"]);
  html += champ("Prise 220V - Présence", ["Présente","Absente"]);
  html += champ("Prises électriques - Fonctionnalité", ["Fonctionnelles","Défectueuses"]);

  // Vérification ventilation
  html += champ("Ventilation - Présence", ["Présente","Absente"]);
  html += champ("Ventilation - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

  // Vérification humidité
  html += champ("Humidité - Présence", ["Aucune","Faible","Modérée","Élevée"]);

  html += texte("Commentaires salle lavage");

  return html;
},

"Réservoir eau chaude": function() {
  let html = "";

  // Présence
  html += champ("Réservoir eau chaude - Présence", ["Présent","Absent"]);

  // Type
  html += champ("Réservoir eau chaude - Type", [
    "Électrique",
    "Gaz",
    "Thermopompe",
    "Instantané"
  ]);

  // Capacité
  html += champ("Réservoir eau chaude - Capacité", [
    "30 gallons",
    "40 gallons",
    "50 gallons",
    "60 gallons",
    "80 gallons",
    "100 gallons",
    "Autre"
  ]);

  // Année approximative
  html += champ("Réservoir eau chaude - Âge approximatif", [
    "0-5 ans",
    "5-10 ans",
    "10-15 ans",
    "15 ans +",
    "Inconnu"
  ]);

  // État général
  html += champ("Réservoir eau chaude - État général", [
    "Bon",
    "Usure normale",
    "Corrosion",
    "Endommagé"
  ]);

  // Fonctionnement
  html += champ("Réservoir eau chaude - Fonctionnement", [
    "Fonctionnel",
    "Température instable",
    "Défectueux"
  ]);

  // Fuite
  html += champ("Réservoir eau chaude - Fuite", [
    "Aucune",
    "Soupçon de fuite",
    "Fuite visible"
  ]);

  // Valve de sécurité
  html += champ("Valve de sécurité - Présence", [
    "Présente",
    "Absente"
  ]);

  html += champ("Valve de sécurité - État", [
    "Bonne",
    "À vérifier",
    "Défectueuse"
  ]);

  // Bac de récupération
  html += champ("Bac de récupération - Présence", [
    "Présent",
    "Absent"
  ]);

  html += champ("Bac de récupération - État", [
    "Bon",
    "Endommagé"
  ]);

  // Drain
  html += champ("Drain de sécurité - Présence", [
    "Présent",
    "Absent"
  ]);

  html += champ("Drain de sécurité - État", [
    "Bon",
    "Obstrué",
    "Endommagé"
  ]);

  // Isolation
  html += champ("Isolation du réservoir - Présence", [
    "Présente",
    "Absente"
  ]);

  html += champ("Isolation du réservoir - État", [
    "Bonne",
    "Usée",
    "Endommagée"
  ]);

  html += texte("Commentaires réservoir eau chaude");

  return html;
},

"Stationnement": function() {
  let html = "";

  // Type de stationnement
  html += champ("Stationnement - Type", [
    "Extérieur",
    "Intérieur",
    "Garage intégré",
    "Garage détaché",
    "Stationnement couvert"
  ]);

  // Nombre de places
  html += champ("Stationnement - Nombre de places", [
    "1",
    "2",
    "3",
    "4+"
  ]);

  // Type de surface
  html += champ("Surface - Type", [
    "Asphalte",
    "Béton",
    "Gravier",
    "Pavé uni"
  ]);

  // État de la surface
  html += champ("Surface - État", [
    "Bon",
    "Fissures mineures",
    "Fissures importantes",
    "Affaissement",
    "Endommagé"
  ]);

  // Drainage
  html += champ("Drainage - État", [
    "Bon",
    "Accumulation d'eau",
    "Drainage insuffisant"
  ]);

  // Marquage au sol
  html += champ("Marquage au sol - Présence", [
    "Présent",
    "Absent"
  ]);

  html += champ("Marquage au sol - État", [
    "Visible",
    "Effacé",
    "Non applicable"
  ]);

  // Éclairage
  html += champ("Éclairage stationnement - Présence", [
    "Présent",
    "Absent"
  ]);

  html += champ("Éclairage stationnement - Fonctionnement", [
    "Fonctionnel",
    "Défectueux",
    "Non applicable"
  ]);

  // Accessibilité
  html += champ("Accessibilité - Accès", [
    "Facile",
    "Restreint",
    "Obstrué"
  ]);

  // Signalisation
  html += champ("Signalisation - Présence", [
    "Présente",
    "Absente"
  ]);

  html += champ("Signalisation - État", [
    "Bonne",
    "Usée",
    "Endommagée",
    "Non applicable"
  ]);

  html += texte("Commentaires stationnement");

  return html;
},

"Porte patio": function() {
  let html = "";

  // Présence
  html += champ("Porte patio - Présence", ["Présente","Absente"]);

  // Type
  html += champ("Porte patio - Type", ["Coulissante","Battante","Française"]);

  // Matériau
  html += champ("Porte patio - Matériau", ["PVC","Aluminium","Bois","Hybride"]);

  // État général
  html += champ("Porte patio - État", ["Bonne","À réparer","Endommagée"]);

  // Vitrage
  html += champ("Vitrage - Type", ["Simple","Double","Triple"]);
  html += champ("Vitrage - État", ["Bon","Fissuré","Brisé","Condensation"]);

  // Mécanisme
  html += champ("Mécanisme coulissant - Fonctionnement", ["Fluide","Difficile","Bloqué"]);

  // Poignée
  html += champ("Poignée - Fonctionnement", ["Fonctionnelle","Défectueuse"]);

  // Serrure
  html += champ("Serrure - Fonctionnement", ["Fonctionnelle","Défectueuse"]);

  // Étanchéité
  html += champ("Étanchéité - État", ["Bonne","Infiltration d'air","Infiltration d'eau"]);

  // Coupe-froid
  html += champ("Coupe-froid - État", ["Bon","Usé","Absent"]);

  // Rail
  html += champ("Rail - État", ["Bon","Usé","Endommagé"]);

  // Moustiquaire
  html += champ("Moustiquaire - Présence", ["Présente","Absente"]);
  html += champ("Moustiquaire - État", ["Bonne","Déchirée","Endommagée"]);

  html += texte("Commentaires porte patio");

  return html;
},

"Balcon": function() {
  let html = "";

  // Vérification de la structure
  html += champ("Structure du balcon - Matériau", ["Bois","Béton","Métal","Composite"]);
  html += champ("Structure du balcon - État", ["Bon","Usé","Endommagé"]);
  html += champ("Structure du balcon - Stabilité", ["Stable","Instable"]);

  // Vérification du plancher du balcon
  html += champ("Plancher balcon - Type", ["Bois","Composite","Béton","Céramique"]);
  html += champ("Plancher balcon - État", ["Bon","Usé","Endommagé"]);
  html += champ("Plancher balcon - Drainage", ["Bon","Accumulation d'eau"]);

  // Vérification du garde-corps
  html += champ("Garde-corps - Présence", ["Présent","Absent"]);
  html += champ("Garde-corps - Matériau", ["Bois","Métal","Verre","Aluminium"]);
  html += champ("Garde-corps - État", ["Bon","Instable","Endommagé"]);
  html += champ("Garde-corps - Conformité", ["Conforme","Non conforme"]);

  // Vérification de la rampe
  html += champ("Rampe - Présence", ["Présente","Absente"]);
  html += champ("Rampe - État", ["Bonne","Instable","Endommagée"]);

  // Vérification accès balcon
  html += champ("Porte patio - Fonctionnement", ["Fonctionnelle","Défectueuse"]);
  html += champ("Porte patio - Étanchéité", ["Bonne","Air","Infiltration"]);

  // Vérification drainage
  html += champ("Drainage balcon - État", ["Bon","Obstrué","Accumulation d'eau"]);

  // Vérification fixations
  html += champ("Fixations et ancrages - État", ["Bon","Rouille","Desserrés"]);

  html += texte("Commentaires balcon");

  return html;
},

"Terrasse": function() {
  let html = "";

  // Vérification de la structure
  html += champ("Structure terrasse - Matériau", ["Bois","Composite","Béton","Métal"]);
  html += champ("Structure terrasse - État", ["Bon","Usé","Endommagé"]);
  html += champ("Structure terrasse - Stabilité", ["Stable","Instable"]);

  // Vérification du plancher de la terrasse
  html += champ("Plancher terrasse - Type", ["Bois traité","Composite","Béton","Céramique"]);
  html += champ("Plancher terrasse - État", ["Bon","Usé","Endommagé"]);
  html += champ("Plancher terrasse - Drainage", ["Bon","Accumulation d'eau"]);

  // Vérification du garde-corps
  html += champ("Garde-corps - Présence", ["Présent","Absent"]);
  html += champ("Garde-corps - Matériau", ["Bois","Métal","Verre","Aluminium","Composite"]);
  html += champ("Garde-corps - État", ["Bon","Instable","Endommagé"]);
  html += champ("Garde-corps - Conformité", ["Conforme","Non conforme"]);

  // Vérification des marches d'accès
  html += champ("Escalier terrasse - Présence", ["Présent","Absent"]);
  html += champ("Escalier terrasse - Matériau", ["Bois","Métal","Béton"]);
  html += champ("Escalier terrasse - État", ["Bon","Usé","Endommagé"]);
  html += champ("Escalier terrasse - Stabilité", ["Stable","Instable"]);

  // Vérification de la rampe
  html += champ("Rampe - Présence", ["Présente","Absente"]);
  html += champ("Rampe - État", ["Bonne","Instable","Endommagée"]);

  // Vérification drainage
  html += champ("Drainage terrasse - État", ["Bon","Obstrué","Accumulation d'eau"]);

  // Vérification fixations
  html += champ("Fixations et ancrages - État", ["Bon","Rouille","Desserrés"]);

  html += texte("Commentaires terrasse");

  return html;
},

"Piscine": function() {
  let html = "";

  // Type de piscine
  html += champ("Piscine - Type", ["Hors terre","Creusée","Semi-creusée"]);
  html += champ("Piscine - Matériau structure", ["Acier","Résine","Béton","Fibre de verre"]);
  html += champ("Piscine - État général", ["Bon","Usé","Endommagé"]);

  // Revêtement intérieur
  html += champ("Revêtement - Type", ["Toile vinyle","Fibre de verre","Béton peint"]);
  html += champ("Revêtement - État", ["Bon","Plis","Déchirure","Usé"]);
  html += champ("Revêtement - Étanchéité", ["Bonne","Fuite possible"]);

  // Margelle
  html += champ("Margelle - Matériau", ["Aluminium","Pierre","Composite"]);
  html += champ("Margelle - État", ["Bon","Usé","Endommagé"]);

  // Échelle / escalier
  html += champ("Échelle / Escalier - Présence", ["Présent","Absent"]);
  html += champ("Échelle / Escalier - Matériau", ["Acier inoxydable","Plastique","Composite"]);
  html += champ("Échelle / Escalier - État", ["Bon","Instable","Endommagé"]);

  // Système de filtration
  html += champ("Filtre piscine - Type", ["Sable","Cartouche","Diatomée"]);
  html += champ("Filtre piscine - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  // Pompe
  html += champ("Pompe piscine - Présence", ["Présente","Absente"]);
  html += champ("Pompe piscine - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);
  html += champ("Pompe piscine - Bruit", ["Normal","Bruit anormal"]);

  // Skimmer
  html += champ("Skimmer - Présence", ["Présent","Absent"]);
  html += champ("Skimmer - État", ["Bon","Fissuré","Endommagé"]);

  // Retour d'eau
  html += champ("Retour d'eau - Fonctionnement", ["Normal","Faible débit","Défectueux"]);

  // Drain de fond
  html += champ("Drain de fond - Présence", ["Présent","Absent"]);
  html += champ("Drain de fond - État", ["Bon","À vérifier"]);

  // Système de sécurité
  html += champ("Clôture piscine - Présence", ["Présente","Absente"]);
  html += champ("Clôture piscine - Conformité", ["Conforme","Non conforme"]);
  html += champ("Porte clôture - Verrouillage", ["Fonctionnel","Défectueux"]);

  // Chauffe-piscine
  html += champ("Chauffe-piscine - Présence", ["Présent","Absent"]);
  html += champ("Chauffe-piscine - Type", ["Électrique","Gaz","Thermopompe"]);
  html += champ("Chauffe-piscine - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  // Éclairage
  html += champ("Éclairage piscine - Présence", ["Présent","Absent"]);
  html += champ("Éclairage piscine - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  html += texte("Commentaires piscine");

  return html;
},

"Verrière": function() {
  let html = "";

  // Vérification de la structure
  html += champ("Structure verrière - Matériau", ["Aluminium","Bois","PVC","Acier"]);
  html += champ("Structure verrière - État", ["Bon","Usé","Endommagé"]);
  html += champ("Structure verrière - Stabilité", ["Stable","Instable"]);

  // Vérification du plafond vitré
  html += champ("Plafond vitré - Type", ["Verre simple","Verre double","Polycarbonate"]);
  html += champ("Plafond vitré - État", ["Bon","Fissuré","Endommagé"]);
  html += champ("Plafond vitré - Étanchéité", ["Bonne","Air","Infiltration"]);
  html += champ("Plafond vitré - Propreté", ["Propre","Encrassé"]);

  // Vérification des panneaux vitrés
  html += champ("Panneaux vitrés - Type", ["Fixes","Coulissants","Battants"]);
  html += champ("Panneaux vitrés - État", ["Bon","Fissuré","Brisé"]);
  html += champ("Panneaux vitrés - Étanchéité", ["Bonne","Air","Infiltration"]);
  html += champ("Panneaux vitrés - Mécanisme", ["Fonctionnel","Défectueux"]);

  // Vérification du plancher
  html += champ("Plancher verrière - Type", ["Bois","Céramique","Vinyle","Composite","Béton"]);
  html += champ("Plancher verrière - État", ["Bon","Usé","Endommagé"]);
  html += champ("Plancher verrière - Drainage", ["Bon","Accumulation d'eau"]);

  // Vérification des portes
  html += champ("Porte verrière - Présence", ["Présente","Absente"]);
  html += champ("Porte verrière - Type", ["Coulissante","Battante","Française"]);
  html += champ("Porte verrière - État", ["Bonne","À réparer","Endommagée"]);
  html += champ("Porte verrière - Serrure", ["Fonctionnelle","Défectueuse"]);

  // Vérification ventilation
  html += champ("Ventilation - Présence", ["Présente","Absente"]);
  html += champ("Ventilation - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

  // Vérification chauffage (si présent)
  html += champ("Chauffage - Présence", ["Présent","Absent"]);
  html += champ("Chauffage - Type", ["Plinthe","Radiateur","Convecteur"]);
  html += champ("Chauffage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  html += texte("Commentaires verrière");

  return html;
},

"Climatisation": function() {
  let html = "";

  // Vérification du type de climatisation
  html += champ("Climatisation - Type", ["Murale","Centrale","Portable","Fenêtre"]);
  html += champ("Climatisation - Présence", ["Présente","Absente"]);

  // Vérification unité intérieure
  html += champ("Unité intérieure - État", ["Bon","Usé","Endommagé"]);
  html += champ("Unité intérieure - Propreté", ["Propre","Encrassée"]);
  html += champ("Unité intérieure - Fixation", ["Stable","Instable"]);

  // Vérification unité extérieure
  html += champ("Unité extérieure - Présence", ["Présente","Absente"]);
  html += champ("Unité extérieure - État", ["Bon","Usé","Endommagé"]);
  html += champ("Unité extérieure - Fixation", ["Stable","Instable"]);
  html += champ("Unité extérieure - Bruit", ["Normal","Bruit anormal"]);

  // Vérification fonctionnement
  html += champ("Climatisation - Fonctionnement", ["Fonctionnelle","Défectueuse"]);
  html += champ("Climatisation - Refroidissement", ["Normal","Faible","Aucun"]);
  html += champ("Climatisation - Télécommande", ["Présente","Absente"]);

  // Vérification drainage
  html += champ("Drain condensation - Présence", ["Présent","Absent"]);
  html += champ("Drain condensation - État", ["Bon","Obstrué","Fuite"]);

  // Vérification alimentation électrique
  html += champ("Alimentation électrique - Type", ["Prise standard","Circuit dédié"]);
  html += champ("Alimentation électrique - État", ["Bon","Défectueux"]);

  html += texte("Commentaires climatisation");

  return html;
},

"Borne de recharge": function() {
  let html = "";

  // Présence de la borne
  html += champ("Borne de recharge - Présence", [
    "Présente",
    "Absente"
  ]);

  // Type de borne
  html += champ("Borne de recharge - Type", [
    "Niveau 1 (120V)",
    "Niveau 2 (240V)",
    "Charge rapide DC",
    "Inconnu"
  ]);

  // Marque
  html += champ("Borne de recharge - Marque", [
    "Flo",
    "Tesla",
    "ChargePoint",
    "EVduty",
    "Autre",
    "Inconnue"
  ]);

  // État général
  html += champ("Borne de recharge - État général", [
    "Bon",
    "Usure normale",
    "Endommagée"
  ]);

  // Fonctionnement
  html += champ("Borne de recharge - Fonctionnement", [
    "Fonctionnelle",
    "Intermittente",
    "Défectueuse"
  ]);

  // Fixation
  html += champ("Fixation de la borne", [
    "Murale",
    "Sur poteau",
    "Autre"
  ]);

  html += champ("Fixation - État", [
    "Solide",
    "Instable",
    "Endommagée"
  ]);

  // Câble
  html += champ("Câble de recharge - Présence", [
    "Présent",
    "Absent"
  ]);

  html += champ("Câble de recharge - État", [
    "Bon",
    "Usé",
    "Endommagé"
  ]);

  // Connecteur
  html += champ("Connecteur - Type", [
    "J1772",
    "Tesla",
    "CCS",
    "CHAdeMO",
    "Autre"
  ]);

  html += champ("Connecteur - État", [
    "Bon",
    "Usé",
    "Endommagé"
  ]);

  // Circuit électrique
  html += champ("Circuit dédié - Présence", [
    "Présent",
    "Absent"
  ]);

  html += champ("Disjoncteur - État", [
    "Bon",
    "À vérifier",
    "Défectueux"
  ]);

  // Protection météo
  html += champ("Protection contre intempéries", [
    "Adéquate",
    "Partielle",
    "Aucune"
  ]);

  html += texte("Commentaires borne de recharge");

  return html;
},

"Clôture": function() {
  let html = "";

  // Présence
  html += champ("Clôture - Présence", [
    "Présente",
    "Absente"
  ]);

  // Type de clôture
  html += champ("Clôture - Type", [
    "Bois",
    "Frost (mailles métalliques)",
    "PVC",
    "Composite",
    "Fer forgé",
    "Aluminium"
  ]);

  // Hauteur
  html += champ("Clôture - Hauteur", [
    "Moins de 1 m",
    "1 m à 1.5 m",
    "1.5 m à 2 m",
    "Plus de 2 m"
  ]);

  // État général
  html += champ("Clôture - État général", [
    "Bon",
    "Usure normale",
    "Endommagée"
  ]);

  // Stabilité
  html += champ("Clôture - Stabilité", [
    "Stable",
    "Légèrement instable",
    "Instable"
  ]);

  // Poteaux
  html += champ("Poteaux - Matériau", [
    "Bois",
    "Métal",
    "Béton",
    "Composite"
  ]);

  html += champ("Poteaux - État", [
    "Bon",
    "Usé",
    "Endommagé"
  ]);

  // Portail
  html += champ("Portail - Présence", [
    "Présent",
    "Absent"
  ]);

  html += champ("Portail - Fonctionnement", [
    "Fonctionnel",
    "Difficile à ouvrir",
    "Défectueux"
  ]);

  html += champ("Portail - Serrure", [
    "Fonctionnelle",
    "Défectueuse",
    "Aucune"
  ]);

  // Alignement
  html += champ("Alignement clôture", [
    "Droit",
    "Légèrement incliné",
    "Fortement incliné"
  ]);

  // Conformité
  html += champ("Clôture - Conformité apparente", [
    "Conforme",
    "À vérifier",
    "Non conforme"
  ]);

  html += texte("Commentaires clôture");

  return html;
},

"Cabanon": function() {
  let html = "";

  // Type de cabanon
  html += champ("Cabanon - Type", [
    "Bois",
    "Résine / PVC",
    "Métal",
    "Composite"
  ]);

  // Fondation
  html += champ("Fondation - Type", [
    "Béton",
    "Blocs",
    "Gravier",
    "Direct au sol"
  ]);

  html += champ("Fondation - État", [
    "Bonne",
    "Affaissement",
    "Instable"
  ]);

  // Structure
  html += champ("Structure - État", [
    "Bonne",
    "Usée",
    "Endommagée"
  ]);

  html += champ("Structure - Stabilité", [
    "Stable",
    "Légèrement instable",
    "Instable"
  ]);

  // Plancher
  html += champ("Plancher - Type", [
    "Bois",
    "Béton",
    "Composite",
    "Absent"
  ]);

  html += champ("Plancher - État", [
    "Bon",
    "Usé",
    "Endommagé"
  ]);

  // Murs
  html += champ("Murs - Matériau", [
    "Bois",
    "PVC",
    "Métal",
    "Composite"
  ]);

  html += champ("Murs - État", [
    "Bon",
    "Usé",
    "Endommagé"
  ]);

  // Toiture
  html += champ("Toiture - Type", [
    "Bardeaux d'asphalte",
    "Tôle",
    "Membrane",
    "PVC"
  ]);

  html += champ("Toiture - État", [
    "Bonne",
    "Usure normale",
    "Fuite possible",
    "Endommagée"
  ]);

  // Porte
  html += champ("Porte cabanon - Présence", [
    "Présente",
    "Absente"
  ]);

  html += champ("Porte cabanon - Fonctionnement", [
    "Fonctionnelle",
    "Difficile",
    "Défectueuse"
  ]);

  html += champ("Porte cabanon - Serrure", [
    "Présente",
    "Absente",
    "Défectueuse"
  ]);

  // Fenêtre
  html += champ("Fenêtre cabanon - Présence", [
    "Présente",
    "Absente"
  ]);

  html += champ("Fenêtre cabanon - État", [
    "Bonne",
    "Brisée",
    "Endommagée"
  ]);

  // Ventilation
  html += champ("Ventilation - Présence", [
    "Présente",
    "Absente"
  ]);

  html += champ("Ventilation - État", [
    "Bonne",
    "Obstruée",
    "Endommagée"
  ]);

  html += texte("Commentaires cabanon");

  return html;
},

 "Garage": function() {
  let html = "";

  // Vérification du plafond
  html += champ("Plafond - Type", ["Gypsum","Bois","Béton","Ouvert"]);
  html += champ("Plafond - État", ["Bon","Fissuré","Taché","Endommagé"]);
  html += champ("Plafond - Matériau", ["Plâtre","Bois","PVC","Métal"]);
  html += champ("Plafond - Esthétique", ["Esthétique OK","Taches visibles","Fissures importantes"]);

  // Vérification des murs
  html += champ("Mur - Type", ["Béton","Bloc de béton","Cloison sèche","Bois"]);
  html += champ("Mur - État", ["Bon","Fissuré","Humidité","Endommagé"]);
  html += champ("Mur - Matériau", ["Peinture","Béton brut","Bois","Panneau"]);
  html += champ("Mur - Esthétique", ["Esthétique OK","Peinture écaillée","Humidité visible"]);

  // Vérification du plancher
  html += champ("Plancher - Type", ["Béton brut","Béton scellé","Époxy"]);
  html += champ("Plancher - État", ["Bon","Fissuré","Taché huile","Endommagé"]);
  html += champ("Plancher - Drain", ["Présent","Absent"]);

  // Vérification de la porte de garage
  html += champ("Porte de garage - Type", ["Manuelle","Motorisée"]);
  html += champ("Porte de garage - Matériau", ["Acier","Aluminium","Bois","Composite"]);
  html += champ("Porte de garage - État", ["Bonne","À réparer","Endommagée"]);
  html += champ("Porte de garage - Étanchéité", ["Bonne","Air","Infiltration"]);

  // Vérification moteur de porte
  html += champ("Moteur porte garage - Présence", ["Présent","Absent"]);
  html += champ("Moteur porte garage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  // Vérification porte extérieure
  html += champ("Porte extérieure - Présence", ["Présente","Absente"]);
  html += champ("Porte extérieure - État", ["Bonne","À réparer","Endommagée"]);
  html += champ("Porte extérieure - Serrure", ["Fonctionnelle","Défectueuse"]);

  // Vérification éclairage
  html += champ("Éclairage - Type", ["Plafonnier","Tube fluorescent","Encastré"]);
  html += champ("Éclairage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  // Vérification prises électriques
  html += champ("Prises électriques - Quantité", ["1","2","3","4+"]);
  html += champ("Prises électriques - Type", ["Standard","GFCI","240V"]);
  html += champ("Prises électriques - Fonctionnalité", ["Fonctionnelles","Défectueuses"]);

  // Vérification ventilation
  html += champ("Ventilation - Présence", ["Présente","Absente"]);
  html += champ("Ventilation - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

  // Vérification humidité
  html += champ("Humidité - Présence", ["Aucune","Faible","Modérée","Élevée"]);

  html += texte("Commentaires garage");

return html;
  }
}; 

// ======================================================
// MODULE 5
// MOTEUR DES PIÈCES – BOUTONS À GAUCHE + CSS INTÉGRÉ
// ======================================================

function ajouterPiece() {

  const type = document.getElementById("type-piece").value;
  if (!type) { alert("Veuillez sélectionner une pièce."); return; }

  const id = "piece-" + Date.now();
  const div = document.createElement("div");
  div.className = "piece-container";
  div.id = id;

  // HEADER : Titre + boutons alignés à gauche
  let html = `
  <div class="piece-header">
    <span class="piece-titre">${type}</span>
    <div class="piece-actions">
      <button type="button" onclick="retracterPiece('${id}')">Terminer</button>
      <button type="button" onclick="document.getElementById('${id}').remove()">Retirer</button>
    </div>
  </div>
  `;

  // Équipements techniques
  html += `
  <div class="equipement-technique">
    <h4>Équipements techniques</h4>
    <select id="equipement-${id}">
      <option value="">Sélectionnez</option>
      ${typeof equipementsTechniques !== "undefined" 
        ? Object.keys(equipementsTechniques).map(e => `<option>${e}</option>`).join("")
        : ""}
    </select>
    <button type="button" onclick="ajouterEquipement('${id}')">Ajouter</button>
    <div class="liste-equipements"></div>
  </div>
  `;

  // Modèle spécifique
  if (modelesPieces[type]) { html += modelesPieces[type](); } 
  else { html += texte("Commentaires"); }

  // Photos
  html += `
  <label>Photo générale 1
    <input type="file" accept="image/*" onchange="previewImage(event,this)">
    <img style="max-width:200px; display:none; margin-top:5px;">
  </label>
  <label>Photo générale 2
    <input type="file" accept="image/*" onchange="previewImage(event,this)">
    <img style="max-width:200px; display:none; margin-top:5px;">
  </label>
  <label>Photo défaut spécifique
    <input type="file" accept="image/*" onchange="previewImage(event,this)">
    <img style="max-width:200px; display:none; margin-top:5px;">
  </label>
  `;

  // Validation visuelle
  html += `
  <label>Validation visuelle pièce
    <select>
      <option value="">Sélectionnez</option>
      <option>Conforme</option>
      <option>Non conforme</option>
    </select>
  </label>
  `;

  // Commentaire final
  html += texte("Résumé technique final de la pièce");

  // Injection dans DOM
  div.innerHTML = html;
  document.getElementById("liste-pieces").appendChild(div);
  document.getElementById("type-piece").value = "";

  // ===== CSS intégré pour boutons et rétractable =====
  const style = document.createElement("style");
  style.innerHTML = `
  .piece-container {
    border:1px solid #ccc; border-radius:6px; padding:10px; margin-bottom:10px; background:#fff;
  }
  .piece-header {
    display:flex; align-items:center; gap:10px; justify-content:flex-start;
  }
  .piece-actions {
    display:flex; gap:5px;
  }
  .piece-container.retractable .equipement-technique,
  .piece-container.retractable label,
  .piece-container.retractable textarea,
  .piece-container.retractable select,
  .piece-container.retractable .liste-equipements {
    display:none;
  }
  .piece-container.retractable { opacity:0.8; border:2px solid #4CAF50; }
  .piece-header button {
    background-color:#4CAF50; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;
  }
  .piece-header button:hover { background-color:#45a049; }
  `;
  document.head.appendChild(style);
}

// ======================================================
// MODULE RÉTRACTABLE
// ======================================================

function retracterPiece(id) {
  const piece = document.getElementById(id);
  if (!piece) return;

  piece.classList.add("retractable");

  const header = piece.querySelector(".piece-header");
  if (header) {
    header.querySelector(".piece-actions").innerHTML =
      `<button type="button" onclick="deployerPiece('${id}')">Réouvrir</button>`;
  }

  const suivante = piece.nextElementSibling;
  if (suivante) suivante.scrollIntoView({ behavior: "smooth" });
}

function deployerPiece(id) {
  const piece = document.getElementById(id);
  if (!piece) return;

  piece.classList.remove("retractable");

  const header = piece.querySelector(".piece-header");
  if (header) {
    header.querySelector(".piece-actions").innerHTML =
      `<button type="button" onclick="retracterPiece('${id}')">Terminer</button>
       <button type="button" onclick="document.getElementById('${id}').remove()">Retirer</button>`;
  }
}

// ======================================================
// MODULE 6
// PRÉVISUALISATION DES IMAGES
// ======================================================

function previewImage(event, input) {

  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  const img = input.nextElementSibling;

  reader.onload = function(e) {

    img.src = e.target.result;

    img.style.display = "block";

  };

  reader.readAsDataURL(file);

}

// ======================================================
// MODULE 7
// GÉNÉRATION DU RAPPORT COMPLET AVEC FACTURE
// ======================================================

function genererRapportImpression() {

  const valeursConformes = [
    "Bon","Bonne","Bons","Bonnes",
    "Fonctionnel","Fonctionnelle","Fonctionnels","Fonctionnelles",
    "Présent","Présente","Présents","Présentes",
    "Oui","Conforme"
  ];

  let defectueux = "";
  let conformes = "";

  const pieces = document.querySelectorAll(".piece-container");

  pieces.forEach(piece => {
    const titreElement = piece.querySelector(".piece-header .piece-titre");
    const titre = titreElement ? titreElement.textContent.trim() : "Pièce";

    piece.querySelectorAll("label").forEach(label => {
      const select = label.querySelector("select");
      if (!select) return;
      if (!select.value || select.value === "Sélectionnez") return;

      const nomChamp = label.childNodes[0].textContent.trim();

      const ligne = `<div style="margin-bottom:4px;">
        <strong>${titre}</strong><br>
        ${nomChamp} : ${select.value}
      </div>`;

      if (valeursConformes.includes(select.value)) {
        conformes += ligne;
      } else {
        defectueux += ligne;
      }
    });
  });

  const zone = document.getElementById("zone-impression");
  if (!zone) return;

  // Récupération des infos client
  const dossier = document.getElementById("numeroDossier")?.value || "";
  const locataire = document.getElementById("locataire")?.value || "";
  const telephone = document.getElementById("telephone")?.value || "";
  const appartement = document.getElementById("numeroAppartement")?.value || "";
  const adresse = document.getElementById("adresse")?.value || "";
  const ville = document.getElementById("ville")?.value || "";

  // Calcul facture
  const heures = tempsTotalSecondes / 3600;
  const sousTotal = heures * tauxHoraire;
  const tps = sousTotal * 0.05;
  const tvq = sousTotal * 0.09975;
  const total = sousTotal + tps + tvq;

  zone.innerHTML = `
    <div style="text-align:center; margin-bottom:20px;">
      <img src="logo_jlr.png" alt="Logo JLR" style="max-height:80px;">
      <h1>Vérification Préventive Immobilière</h1>
      <h2>Jean-Louis Raymond</h2>
      <p>Consultant en vérification préventive</p>
      <p>📧 jlouisraymond@hotmail.com | 📞 438-220-6511</p>
      <p>NEQ : 2268876952</p>
      <p>TPS : 771362471 RT 0001 | TVQ : 1227894560 TQ 0001</p>
    </div>

    <div style="margin-bottom:20px;">
      <h2>Informations client</h2>
      <p><strong>Numéro de dossier:</strong> ${dossier}</p>
      <p><strong>Locataire:</strong> ${locataire}</p>
      <p><strong>Téléphone:</strong> ${telephone}</p>
      <p><strong>Adresse:</strong> ${adresse}, ${appartement}, ${ville}</p>
    </div>

    <div style="page-break-after:always;">
      <h2>Éléments défectueux</h2>
      ${defectueux || "<p>Aucun problème détecté.</p>"}
    </div>

    <div style="page-break-after:always;">
      <h2>Éléments conformes</h2>
      ${conformes || "<p>Aucun élément conforme détecté.</p>"}
    </div>

    <div>
      <h2>Facturation</h2>
      <p>Temps travaillé : ${heures.toFixed(2)} heures</p>
      <p>Taux horaire : ${tauxHoraire.toFixed(2)} $ / heure</p>
      <p>Sous-total : ${sousTotal.toFixed(2)} $</p>
      <p>TPS (5%) : ${tps.toFixed(2)} $</p>
      <p>TVQ (9.975%) : ${tvq.toFixed(2)} $</p>
      <h3>Total à payer : ${total.toFixed(2)} $</h3>
    </div>
  `;
}

window.addEventListener("beforeprint", genererRapportImpression);

// ======================================================
// MODULE 8
// TERMINER UNE PIÈCE
// ======================================================

function terminerPiece(id) {

  const piece = document.getElementById(id);
  if (!piece) return;

  piece.querySelectorAll("select, textarea, input").forEach(el => {
    el.disabled = true;
  });

  let resume = "";

  piece.querySelectorAll("label").forEach(label => {

    const select = label.querySelector("select");
    if (!select) return;

    if (!select.value || select.value === "Sélectionnez") return;

    const nomChamp = label.childNodes[0].textContent.trim();

    resume += `<div>${nomChamp} : ${select.value}</div>`;

  });

  const blocResume = document.createElement("div");
  blocResume.className = "resume-piece";

  blocResume.innerHTML = `
  <div style="margin-top:10px;padding:10px;background:#f0f0f0;border-radius:6px;">
  <strong>Résumé rapide :</strong>
  ${resume || "<div>Aucune donnée sélectionnée</div>"}
  </div>
  `;

  piece.appendChild(blocResume);

  const actions = piece.querySelector(".piece-actions");

  if (actions) {

    actions.innerHTML = `
    <button type="button" onclick="rouvrirPiece('${id}')">
    Réouvrir
    </button>
    `;

  }

  piece.style.opacity = "0.85";
  piece.style.border = "2px solid #4CAF50";

  piece.classList.add("piece-fermee");

  const suivante = piece.nextElementSibling;

  if (suivante) {
    suivante.scrollIntoView({behavior:"smooth"});
  }

}

// ======================================================
// MODULE 9
// RÉOUVRIR UNE PIÈCE
// ======================================================

function rouvrirPiece(id) {

  const piece = document.getElementById(id);
  if (!piece) return;

  piece.querySelectorAll("select, textarea, input").forEach(el => {
    el.disabled = false;
  });

  const resume = piece.querySelector(".resume-piece");
  if (resume) resume.remove();

  const actions = piece.querySelector(".piece-actions");

  if (actions) {

    actions.innerHTML = `
    <button type="button" onclick="terminerPiece('${id}')">
    Terminer
    </button>

    <button type="button" onclick="document.getElementById('${id}').remove()">
    Retirer
    </button>
    `;

  }

  piece.style.opacity = "1";
  piece.style.border = "1px solid #ccc";

  piece.classList.remove("piece-fermee");

}

// ======================================================
// MODULE 10
// SIGNATURES
// ======================================================

function activerSignature(canvasId){

const canvas = document.getElementById(canvasId);
if(!canvas) return;

const ctx = canvas.getContext("2d");

let dessin = false;

canvas.dataset.locked = "false";

ctx.lineWidth = 2;
ctx.lineCap = "round";
ctx.strokeStyle = "#000";

function position(event){

const rect = canvas.getBoundingClientRect();

return {
x:event.clientX - rect.left,
y:event.clientY - rect.top
};

}

canvas.addEventListener("pointerdown",function(e){

if(canvas.dataset.locked === "true") return;

dessin = true;

canvas.setPointerCapture(e.pointerId);

const pos = position(e);

ctx.beginPath();
ctx.moveTo(pos.x,pos.y);

});


canvas.addEventListener("pointermove",function(e){

if(!dessin || canvas.dataset.locked === "true") return;

const pos = position(e);

ctx.lineTo(pos.x,pos.y);
ctx.stroke();

});



canvas.addEventListener("pointerup",function(e){

dessin = false;

canvas.releasePointerCapture(e.pointerId);

ctx.beginPath();

});



canvas.addEventListener("pointerleave",function(){

dessin = false;
ctx.beginPath();

});

}


// ======================================================
// INITIALISATION SIGNATURES
// ======================================================

document.addEventListener("DOMContentLoaded",function(){

activerSignature("signature-client");
activerSignature("signature-verificateur");

});


// ======================================================
// EFFACER SIGNATURES
// ======================================================

function effacerSignatureLocataire(){

const canvas = document.getElementById("signature-client");
if(!canvas) return;

const ctx = canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

}



function effacerSignatureConsultant(){

const canvas = document.getElementById("signature-verificateur");
if(!canvas) return;

const ctx = canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

}


function effacerSignatureLocataire(){

const canvas = document.getElementById("signature-client");
if(!canvas) return;

const ctx = canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

}



function effacerSignatureConsultant(){

const canvas = document.getElementById("signature-verificateur");
if(!canvas) return;

const ctx = canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

}

// ======================================================
// MODULE 11
// MINUTEUR DE VÉRIFICATION
// ======================================================

let tempsTotalSecondes = 0;
let intervalMinuteur = null;
let minuteurEnCours = false;

const tauxHoraire = 125;

function formaterTemps(secondes) {

  const h = Math.floor(secondes / 3600);
  const m = Math.floor((secondes % 3600) / 60);
  const s = secondes % 60;

  return (
    String(h).padStart(2, "0") + ":" +
    String(m).padStart(2, "0") + ":" +
    String(s).padStart(2, "0")
  );

}

function mettreAJourAffichage() {

  const tempsElement = document.getElementById("temps-affiche");
  const montantElement = document.getElementById("montant-affiche");

  if (!tempsElement || !montantElement) return;

  tempsElement.textContent = formaterTemps(tempsTotalSecondes);

  const heures = tempsTotalSecondes / 3600;
  const montant = heures * tauxHoraire;

  montantElement.textContent = montant.toFixed(2) + " $";

}

function demarrerMinuteur() {

  if (minuteurEnCours) return;

  minuteurEnCours = true;

  intervalMinuteur = setInterval(function() {

    tempsTotalSecondes++;

    mettreAJourAffichage();

  }, 1000);

}

function pauseMinuteur() {

  minuteurEnCours = false;

  clearInterval(intervalMinuteur);

}

function reinitialiserMinuteur() {

  pauseMinuteur();

  tempsTotalSecondes = 0;

  mettreAJourAffichage();

}

function basculerVisibiliteMinuteur() {

  const affichage = document.getElementById("affichage-minuteur");
  const montant = document.getElementById("affichage-montant");

  if (!affichage || !montant) return;

  if (affichage.style.display === "none") {

    affichage.style.display = "block";
    montant.style.display = "block";

  } else {

    affichage.style.display = "none";
    montant.style.display = "none";

  }

}

// ======================================================
// MODULE 12
// ENVOI DU RAPPORT PAR COURRIEL
// ======================================================

function genererMailto() {

  const emailProprietaire = document.getElementById("emailProprietaire")?.value || "";
  const dossier = document.getElementById("numeroDossier")?.value || "";
  const locataire = document.getElementById("locataire")?.value || "";
  const telephone = document.getElementById("telephone")?.value || "";
  const appartement = document.getElementById("numeroAppartement")?.value || "";
  const adresse = document.getElementById("adresse")?.value || "";
  const ville = document.getElementById("ville")?.value || "";

  const heures = tempsTotalSecondes / 3600;

  const sousTotal = heures * tauxHoraire;
  const tps = sousTotal * 0.05;
  const tvq = sousTotal * 0.09975;
  const total = sousTotal + tps + tvq;

  let contenu = "";

  // 🟢 À GARDER
  contenu += "VÉRIFICATION PRÉVENTIVE IMMOBILIÈRE\n";
  contenu += "Jean-Louis Raymond\n";
  contenu += "Consultant en vérification préventive\n\n";

  contenu += "Courriel : jlouisraymond@hotmail.com\n";
  contenu += "Téléphone : 438-220-6511\n";
  contenu += "NEQ : 2268876952\n";
  contenu += "TPS : 771362471 RT 0001\n";
  contenu += "TVQ : 1227894560 TQ 0001\n";
  contenu += "====================================================\n\n";

  contenu += "Numéro de dossier : " + dossier + "\n";
  contenu += "Locataire : " + locataire + "\n";
  contenu += "Téléphone : " + telephone + "\n";
  contenu += "Adresse : " + adresse + ", " + appartement + ", " + ville + "\n\n";

  const pieces = document.querySelectorAll(".piece-container");

  pieces.forEach(piece => {

    const titre = piece.querySelector("h3")?.textContent
      .replace("Terminer","")
      .replace("Retirer","")
      .trim() || "Pièce";

    contenu += ">>> " + titre + "\n";

    piece.querySelectorAll("label").forEach(label => {

      const select = label.querySelector("select");
      if (!select) return;

      if (!select.value || select.value === "Sélectionnez") return;

      const nomChamp = label.childNodes[0].textContent.trim();

      contenu += nomChamp + " : " + select.value + "\n";

    });

    contenu += "\n";

  });

  // 🟢 À GARDER
  contenu += "FACTURATION\n";
  contenu += "----------------------------------------\n";
  contenu += "Temps travaillé : " + heures.toFixed(2) + " heures\n";
  contenu += "Taux horaire : " + tauxHoraire + " $ / heure\n\n";

  contenu += "Sous-total : " + sousTotal.toFixed(2) + " $\n";
  contenu += "TPS (5%) : " + tps.toFixed(2) + " $\n";
  contenu += "TVQ (9.975%) : " + tvq.toFixed(2) + " $\n";
  contenu += "TOTAL À PAYER : " + total.toFixed(2) + " $\n\n";

  const sujet = "Rapport et facture - " + dossier;

  const mailtoUrl =
    "mailto:" + emailProprietaire +
    "?subject=" + encodeURIComponent(sujet) +
    "&body=" + encodeURIComponent(contenu);

  window.location.href = mailtoUrl;

}

// 🟢 À GARDER
document.addEventListener("DOMContentLoaded", function() {

  mettreAJourAffichage();

});

