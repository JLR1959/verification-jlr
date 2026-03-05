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

    html += champ("Mur - Type", ["Cloison sèche","Brique","Bois","Béton"]);
    html += champ("Mur - État", ["Bon","Fissuré","Humidité"]);
    html += champ("Mur - Matériau", ["Peinture","Papier peint","Carrelage","Bois"]);

    html += champ("Plancher - Type", ["Céramique","Vinyle","Bois"]);
    html += champ("Plancher - État", ["Bon","Usé","Endommagé"]);
    html += champ("Plancher - Matériau", ["Bois franc","Stratifié","Vinyle","Céramique"]);

    html += champ("Fenêtre - Présence", ["Présente","Absente"]);
    html += champ("Fenêtre - Type", ["Coulissante","À battant","Fixe"]);
    html += champ("Fenêtre - État", ["Bonne","À réparer","Brisée"]);
    html += champ("Fenêtre - Matériau", ["PVC","Aluminium","Bois"]);
    html += champ("Fenêtre - Étanchéité", ["Bonne","Air","Infiltration"]);
    html += champ("Fenêtre - Mécanisme", ["Coulissant","Oscillo-battant","Fixe"]);
    html += champ("Fenêtre - Quantité", ["1","2","3+"]);
    html += champ("Fenêtre - Moustiquaire", ["Présente","Absente"]);

    html += champ("Porte patio - Présence", ["Présente","Absente"]);
    html += champ("Porte patio - Type", ["Coulissante","Vitrée"]);
    html += champ("Porte patio - État", ["Bonne","À réparer","Endommagée"]);
    html += champ("Porte patio - Matériau", ["Bois","PVC","Aluminium"]);
    html += champ("Porte patio - Vitrage", ["Simple","Double"]);
    html += champ("Porte patio - Mécanisme", ["Coulissant","Oscillo-battant"]);
    html += champ("Porte patio - Poignée", ["Fonctionnelle","Défectueuse"]);
    html += champ("Porte patio - Serrure", ["Fonctionnelle","Défectueuse"]);
    html += champ("Porte patio - Étanchéité", ["Bonne","Air","Fuite"]);

    html += champ("Armoires supérieures - Type", ["Standard","Modulaire","Sur mesure"]);
    html += champ("Armoires supérieures - État", ["Bonnes","Endommagées","Gondolées"]);
    html += champ("Armoires supérieures - Matériau", ["Bois","Mélamine","PVC"]);

    html += champ("Armoires inférieures - Type", ["Standard","Modulaire","Sur mesure"]);
    html += champ("Armoires inférieures - État", ["Bonnes","Endommagées","Humidité"]);
    html += champ("Armoires inférieures - Matériau", ["Bois","Mélamine","PVC"]);

    html += champ("Comptoir - Type", ["Standard","Îlot","Linéaire"]);
    html += champ("Comptoir - État", ["Bon","Endommagé","Fissuré"]);
    html += champ("Comptoir - Matériau", ["Stratifié","Quartz","Granite","Bois"]);

    html += champ("Îlot - Présence", ["Présent","Absent"]);
    html += champ("Îlot - État", ["Bon","Endommagé","Instable"]);

    html += champ("Évier - Type", ["Simple","Double","Commercial"]);
    html += champ("Évier - État", ["Bon","Fissuré","Rouille"]);
    html += champ("Évier - Matériau", ["Inox","Composite","Céramique"]);
    html += champ("Évier - Fonctionnalité", ["Fonctionnel","Défectueux"]);

    html += champ("Robinetterie - Type", ["Standard","À détecteur","Combinée"]);
    html += champ("Robinetterie - État", ["Bonne","Fuite","Défectueuse"]);
    html += champ("Robinetterie - Matériau", ["Chrome","Noir mat","Inox"]);

    html += champ("Hotte - Présence", ["Présente","Absente"]);
    html += champ("Hotte - Type", ["Standard","Micro-ondes intégrée","Commerciale"]);
    html += champ("Hotte - État", ["Fonctionnelle","Défectueuse","Bruyante"]);
    html += champ("Hotte - Matériau", ["Inox","Plastique","Aluminium"]);
    html += champ("Hotte - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Lave-vaisselle - Présence", ["Présent","Absent"]);
    html += champ("Lave-vaisselle - Fonctionnalité", ["Fonctionnel","Défectueux"]);

    html += champ("Entrée eau chaude - Présence", ["Oui","Non"]);
    html += champ("Entrée eau froide - Présence", ["Oui","Non"]);
    html += champ("Drain - Présence", ["Oui","Non"]);
    html += champ("Prise 110V - Présence", ["Oui","Non"]);
    html += champ("Sortie sécheuse - Présence", ["Oui","Non"]);
    html += champ("Prise 220V - Présence", ["Oui","Non"]);

    html += texte("Commentaires cuisine");

    return html;
  },

  "Salle de bain": function() {
    let html = "";
    html += champ("Plafond - Type", ["Gypsum","Bois","Béton"]);
    html += champ("Plafond - État", ["Bon","Taché","Moisissure"]);
    html += champ("Plafond - Matériau", ["Plâtre","Bois","PVC"]);

    html += champ("Mur - Type", ["Cloison sèche","Brique","Carrelage"]);
    html += champ("Mur - État", ["Bon","Humidité","Moisissure"]);
    html += champ("Mur - Matériau", ["Peinture","Carrelage","Bois"]);

    html += champ("Plancher - Type", ["Céramique","Vinyle","Bois"]);
    html += champ("Plancher - État", ["Bon","Usé","Endommagé"]);
    html += champ("Plancher - Matériau", ["Céramique","Vinyle","Bois"]);

    html += champ("Lavabo - Type", ["Simple","Double","Suspendu"]);
    html += champ("Lavabo - État", ["Bon","Fissuré","Endommagé"]);
    html += champ("Lavabo - Fonctionnalité", ["Fonctionnel","Défectueux"]);

    html += champ("Vanité - Type", ["Sur pied","Suspendue","Modulaire"]);
    html += champ("Vanité - État", ["Bonne","Endommagée","Humidité"]);
    html += champ("Vanité - Matériau", ["Bois","Mélamine","PVC"]);

    html += champ("Toilette - Type", ["Standard","Suspendue","Ultra-flux"]);
    html += champ("Toilette - État", ["Bonne","Fuite","Instable"]);
    html += champ("Toilette - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Douche - Type", ["Coin","Murale","Walk-in"]);
    html += champ("Douche - État", ["Bon","Fuite","Moisissure"]);
    html += champ("Douche - Matériau", ["Fibre de verre","Céramique","Acrylique"]);

    html += champ("Baignoire - Type", ["Encastrée","Autoportante"]);
    html += champ("Baignoire - État", ["Bonne","Fissurée","Endommagée"]);
    html += champ("Baignoire - Matériau", ["Acrylique","Fonte","Composite"]);

    html += champ("Robinetterie bain - Type", ["Standard","Combinée"]);
    html += champ("Robinetterie bain - État", ["Bonne","Fuite","Défectueuse"]);

    html += champ("Ventilation - Type", ["Mécanique","Naturelle"]);
    html += champ("Ventilation - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Prise GFCI - Présence", ["Présente","Absente"]);
    html += champ("Prise GFCI - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Chauffage - Type", ["Plinthe","Radiateur"]);
    html += champ("Chauffage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

    html += texte("Commentaires salle de bain");

    return html;
  },

  "Salon": function() {
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

    html += champ("Fenêtres - Type", ["Coulissante","À battant","Fixe"]);
    html += champ("Fenêtres - État", ["Bon","Air","Condensation"]);
    html += champ("Fenêtres - Matériau", ["PVC","Aluminium","Bois"]);
    html += champ("Fenêtres - Mécanisme", ["Coulissant","Oscillo-battant","Fixe"]);
    html += champ("Fenêtres - Quantité", ["1","2","3+"]);

    html += champ("Porte patio - Présence", ["Présente","Absente"]);
    html += champ("Porte patio - Type", ["Coulissante","Vitrée"]);
    html += champ("Porte patio - État", ["Bonne","À réparer","Endommagée"]);

    html += champ("Foyer - Présence", ["Présent","Absent"]);
    html += champ("Foyer - Type", ["Bois","Gaz","Électrique"]);
    html += champ("Foyer - État", ["Bon","Endommagé","Non fonctionnel"]);

    html += champ("Sortie câble / internet - Présence", ["Présente","Absente"]);
    html += champ("Sortie câble / internet - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Prises - Type", ["Standard","GFCI","USB"]);
    html += champ("Prises - Quantité", ["1","2","3+"]);
    html += champ("Prises - Fonctionnalité", ["Fonctionnelles","Défectueuses"]);

    html += texte("Commentaires salon");

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

  "Garage": function() {
    let html = "";
    html += champ("Plancher - Type", ["Béton brut","Époxy"]);
    html += champ("Plancher - État", ["Bon","Fissuré","Taché huile"]);
    html += champ("Porte de garage - Type", ["Manuelle","Motorisée"]);
    html += champ("Porte de garage - État", ["Bonne","Défectueuse","Mal alignée"]);
    html += champ("Porte de garage - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);
    html += champ("Moteur porte garage - Présence", ["Présent","Absent"]);
    html += champ("Moteur porte garage - État", ["Bon","Défectueux"]);
    html += champ("Panneau électrique - Présence", ["Présent","Absent"]);
    html += champ("Panneau électrique - État", ["Bon","Non conforme"]);
    html += champ("Prise 240V - Présence", ["Présente","Absente"]);
    html += champ("Prise 240V - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);
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

function activerSignature(canvasId) {

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let dessin = false;

  canvas.dataset.locked = "false";

  canvas.addEventListener("mousedown", function(e) {

    if (canvas.dataset.locked === "true") return;

    dessin = true;

    const rect = canvas.getBoundingClientRect();

    ctx.beginPath();

    ctx.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );

  });

  canvas.addEventListener("mouseup", function() {

    dessin = false;
    ctx.beginPath();

  });

  canvas.addEventListener("mousemove", function(e) {

    if (!dessin || canvas.dataset.locked === "true") return;

    const rect = canvas.getBoundingClientRect();

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";

    ctx.lineTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );

  });

}

function effacerSignatureLocataire() {

  const canvas = document.getElementById("signature-client");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

}

function effacerSignatureConsultant() {

  const canvas = document.getElementById("signature-verificateur");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

}

function figerSignature(canvasId) {

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  canvas.dataset.locked = "true";
  canvas.style.opacity = "0.6";

}

function deverrouillerSignature(canvasId) {

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  canvas.dataset.locked = "false";
  canvas.style.opacity = "1";

}

document.addEventListener("DOMContentLoaded", function() {

  activerSignature("signature-client");
  activerSignature("signature-verificateur");

});

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

document.addEventListener("DOMContentLoaded", function() {

  mettreAJourAffichage();

});


