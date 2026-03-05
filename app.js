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
// MODÈLES DE PIÈCES
// ======================================================

const modelesPieces = {

  "Cuisine": function() {

    let html = "";

    html += champ("Plafond - Type", ["Gypsum","Bois","Suspendu","Béton"]);
    html += champ("Plafond - État", ["Bon","Fissuré","Taché","Endommagé"]);

    html += champ("Mur - Type", ["Cloison sèche","Brique","Bois","Béton"]);
    html += champ("Mur - État", ["Bon","Fissuré","Humidité"]);

    html += champ("Plancher - Type", ["Céramique","Vinyle","Bois"]);
    html += champ("Plancher - État", ["Bon","Usé","Endommagé"]);

    html += champ("Fenêtre - Présence", ["Présente","Absente"]);
    html += champ("Fenêtre - Étanchéité", ["Bonne","Air","Infiltration"]);

    html += champ("Porte patio - Présence", ["Présente","Absente"]);

    html += champ("Armoires supérieures - État", ["Bon","Endommagé"]);
    html += champ("Armoires inférieures - État", ["Bon","Endommagé"]);

    html += champ("Comptoir - Matériau", ["Stratifié","Quartz","Granite","Bois"]);
    html += champ("Comptoir - État", ["Bon","Fissuré","Endommagé"]);

    html += champ("Évier - Type", ["Simple","Double"]);
    html += champ("Évier - Fonctionnalité", ["Fonctionnel","Défectueux"]);

    html += champ("Robinetterie - État", ["Bonne","Fuite"]);

    html += champ("Hotte - Présence", ["Présente","Absente"]);
    html += champ("Hotte - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Prises GFCI - Présence", ["Présentes","Absentes"]);

    html += texte("Commentaires cuisine");

    return html;

  },

  "Salle de bain": function() {

    let html = "";

    html += champ("Plafond - État", ["Bon","Taché","Moisissure"]);
    html += champ("Mur - État", ["Bon","Humidité","Moisissure"]);
    html += champ("Plancher - État", ["Bon","Usé","Endommagé"]);

    html += champ("Lavabo - Type", ["Simple","Double"]);
    html += champ("Lavabo - Fonctionnalité", ["Fonctionnel","Défectueux"]);

    html += champ("Vanité - État", ["Bon","Humidité"]);

    html += champ("Toilette - Fonctionnalité", ["Fonctionnelle","Fuite","Instable"]);

    html += champ("Douche - État", ["Bon","Fuite","Moisissure"]);
    html += champ("Baignoire - État", ["Bonne","Fissurée"]);

    html += champ("Ventilation - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Prise GFCI - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += texte("Commentaires salle de bain");

    return html;

  },

  "Salon": function() {

    let html = "";

    html += champ("Plafond - État", ["Bon","Fissuré"]);
    html += champ("Mur - État", ["Bon","Taché"]);
    html += champ("Plancher - État", ["Bon","Usé"]);

    html += champ("Fenêtres - État", ["Bon","Air","Condensation"]);

    html += champ("Porte patio - Présence", ["Présente","Absente"]);

    html += champ("Foyer - Présence", ["Présent","Absent"]);

    html += champ("Sortie câble / internet - Présence", ["Présente","Absente"]);

    html += champ("Prises - Fonctionnalité", ["Fonctionnelles","Défectueuses"]);

    html += texte("Commentaires salon");

    return html;

  },

  "Chambre": function() {

    let html = "";

    html += champ("Plafond - État", ["Bon","Fissuré"]);
    html += champ("Mur - État", ["Bon","Taché"]);
    html += champ("Plancher - État", ["Bon","Usé"]);

    html += champ("Fenêtre - État", ["Bonne","Air","Condensation"]);

    html += champ("Garde-robe - Présence", ["Présent","Absent"]);
    html += champ("Garde-robe - État", ["Bon","Endommagé"]);

    html += champ("Sortie TV - Présence", ["Présente","Absente"]);

    html += champ("Détecteur fumée - Fonctionnalité", ["Fonctionnel","Défectueux"]);

    html += texte("Commentaires chambre");

    return html;

  },

  "Garage": function() {

    let html = "";

    html += champ("Plancher garage - État", ["Bon","Fissuré","Taché huile"]);

    html += champ("Porte de garage - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Moteur porte garage - État", ["Bon","Défectueux"]);

    html += champ("Panneau électrique - Présence", ["Présent","Absent"]);

    html += champ("Prise 240V - Présence", ["Présente","Absente"]);

    html += champ("Drain garage - État", ["Bon","Obstrué"]);

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
// GÉNÉRATION DU RAPPORT D’IMPRESSION
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

    const titreElement = piece.querySelector("h3");
    let titre = "Pièce";

    if (titreElement) {

      const clone = titreElement.cloneNode(true);
      clone.querySelectorAll("button").forEach(btn => btn.remove());
      titre = clone.textContent.trim();

    }

    piece.querySelectorAll("label").forEach(label => {

      const select = label.querySelector("select");

      if (!select) return;

      const valeur = select.value;

      if (!valeur || valeur === "Sélectionnez") return;

      const nomChamp = label.childNodes[0].textContent.trim();

      const ligne =
        `<div style="margin-bottom:8px;">
           <strong>${titre}</strong><br>
           ${nomChamp} : ${valeur}
         </div>`;

      if (valeursConformes.includes(valeur)) {

        conformes += ligne;

      } else {

        defectueux += ligne;

      }

    });

  });

  const zone = document.getElementById("zone-impression");

  if (!zone) return;

  zone.innerHTML = `
    <div style="page-break-after:always;">
      <h1>ÉLÉMENTS DÉFECTUEUX</h1>
      ${defectueux || "<p>Aucun problème détecté.</p>"}
    </div>
    <div>
      <h1>ÉLÉMENTS CONFORMES</h1>
      ${conformes || "<p>Aucun élément conforme détecté.</p>"}
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


