// === MINUTEUR + FACTURATION DYNAMIQUE ===
let timerInterval, startTime, isRunning = false;

function startTimer() {
  if (isRunning) return;
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
  isRunning = true;
  const stopBtn = document.getElementById("btn-stop");
  if (stopBtn) stopBtn.style.display = "inline-block";
}

function stopTimer() {
  clearInterval(timerInterval);
  updateTimer();
  isRunning = false;
}

function updateTimer() {
  const now = Date.now();
  const elapsed = Math.floor((now - startTime) / 1000);
  const h = Math.floor(elapsed / 3600);
  const m = Math.floor((elapsed % 3600) / 60);
  const s = elapsed % 60;
  const total = (elapsed / 3600) * 125;

  // Chrono visible
  const timerGlobal = document.getElementById("timer-global");
  if (timerGlobal)
    timerGlobal.textContent = `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  // Chrono et montant dans la facture
  const timerFacture = document.getElementById("timer-facture");
  if (timerFacture)
    timerFacture.textContent = `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  const facture = document.getElementById("facture-total");
  if (facture) facture.textContent = `$${total.toFixed(2)}`;
}

function toggleFacture() {
  const section = document.getElementById("section-facturation");
  if (section.style.display === "none") {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
}

// === SIGNATURES ===
function initSignature(id) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let drawing = false;
  canvas.onmousedown = () => (drawing = true);
  canvas.onmouseup = () => {
    drawing = false;
    ctx.beginPath();
  };
  canvas.onmouseout = () => (drawing = false);
  canvas.onmousemove = (e) => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
}

// === PDF + COURRIEL ===
function sauvegarderPDF() {
  const element = document.body;
  html2pdf()
    .from(element)
    .set({
      margin: 0.5,
      filename: "rapport_inspection_jlr.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    })
    .save();
}

function envoyerCourriel() {
  const email =
    document.getElementById("email-responsable").value ||
    "jlouisraymond@hotmail.com";
  const sujet = encodeURIComponent("Rapport d’inspection JLR");
  const corps = encodeURIComponent(
    "Bonjour,\n\nVeuillez trouver ci-joint le rapport de vérification.\n\nCordialement,\nService JLR"
  );
  window.location.href = `mailto:${email}?subject=${sujet}&body=${corps}`;
}

// === CHAMPS DYNAMIQUES ===
function champ(label, options) {
  let html = `<label>${label}<select><option>Sélectionnez</option>`;
  options.forEach((opt) => (html += `<option>${opt}</option>`));
  html += `</select></label><br>`;
  return html;
}

function texte(label, placeholder = "") {
  return `<label>${label}<br><textarea placeholder="${placeholder}" rows="3" style="width:100%;"></textarea></label><br>`;
}

function previewImage(event, input) {
  const img = input.nextElementSibling;
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
      img.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}

// === AJOUT D’UNE PIÈCE (VERSION COMPLÈTE) ===
function ajouterPiece() {
  const type = document.getElementById("type-piece").value;
  if (!type) return alert("Veuillez sélectionner une pièce.");

  const id = Date.now();
  const div = document.createElement("div");
  div.id = `piece-${id}`;
  div.className = "piece-container";

  let html = `<h3>${type} <button onclick="document.getElementById('piece-${id}').remove()">Retirer cette pièce</button></h3>`;
  html += `<div>`;

  // Champs communs de base étendus
  html += champ("Plafond - Type", ["Gypsum", "Plafond suspendu", "Bois"]);
  html += champ("Plafond - État", ["Bon", "Fissuré", "Taché"]);
  html += champ("Plafond - Matériau", ["Plâtre", "PVC", "Autre"]);

  html += champ("Mur - Type", ["Cloison sèche", "Brique", "Bois"]);
  html += champ("Mur - État", ["Bon", "Fissuré", "Taché"]);
  html += champ("Mur - Matériau", ["Peinture", "Papier peint", "Carrelage"]);

  html += champ("Plancher - Type", ["Bois", "Céramique", "Vinyle", "Béton"]);
  html += champ("Plancher - État", ["Bon", "Usé", "Endommagé"]);
  html += champ("Plancher - Matériau", ["Bois franc", "Flottant", "Tapis"]);

  html += champ("Fenêtre - Type", ["Coulissante", "À battant", "Fixe"]);
  html += champ("Fenêtre - État", ["Bonne", "À réparer", "Brisée"]);
  html += champ("Fenêtre - Matériau", ["PVC", "Aluminium", "Bois"]);

  html += champ("Câblodistribution", ["Oui", "Non"]);

  html += champ("Interrupteurs - État", ["Fonctionnels", "Défectueux"]);
  html += champ("Thermostat - Type", ["Numérique", "Mécanique"]);
  html += champ("Thermostat - Fonctionnalité", ["Fonctionnel", "Défectueux"]);
  html += champ("Chauffage - Type", ["Plinthe", "Unité murale", "Radiateur"]);
  html += champ("Chauffage - Fonctionnalité", ["Fonctionnel", "Défectueux"]);
  html += champ("Climatisation - Type", ["Murale", "Fenêtre", "Centrale"]);
  html += champ("Climatisation - Fonctionnalité", ["Fonctionnelle", "Défectueuse"]);
  html += champ("Unité murale - Type", ["Thermopompe", "Ventilation", "AC seulement"]);
  html += champ("Unité murale - État", ["Fonctionnelle", "Défectueuse"]);
  html += champ("Unité murale - Fonctionnalité", ["Chauffe seulement", "Clim seulement", "2 fonctions"]);

  html += champ("Éclairage - Type", ["Encastré", "Plafonnier", "Sur rail"]);
  html += champ("Éclairage - État", ["Fonctionnel", "Défectueux"]);
  html += champ("Éclairage - Matériau", ["Métal", "Plastique", "Verre"]);
  html += champ("Éclairage - Fonctionnalité", ["Marche/arrêt normal", "Gradateur"]);

  html += champ("Prise de courant - Type", ["Standard", "GFCI", "USB"]);
  html += champ("Prise de courant - Quantité", ["1", "2", "3+"]);
  html += champ("Prise de courant - Fonctionnalité", ["Fonctionnelle", "Défectueuse"]);

  // Champs spécifiques par type
  if (type === "Cuisine") {
    html += champ("Hotte - Fonctionnalité", ["Fonctionnelle", "Défectueuse"]);
    html += champ("Hotte - Type", ["Standard", "Micro-ondes intégrée"]);
    html += champ("Hotte - Matériau", ["Acier inoxydable", "Plastique"]);
    html += champ("Plomberie - État général", ["Bon", "Fuite", "Bouchée"]);
    html += champ("Plomberie - Fonctionnalité", ["Fonctionnelle", "Non fonctionnelle"]);
    html += champ("Plomberie - Type", ["Cuivre", "PEX", "ABS"]);
    html += champ("Plomberie - Matériau", ["Métal", "Plastique"]);
    html += champ("Armoire - Type", ["Standard", "Modulaire"]);
    html += champ("Armoire - État", ["Bonne", "Endommagée"]);
    html += champ("Armoire - Matériau", ["Bois", "Mélamine", "Autre"]);
    html += champ("Armoire - Fonctionnalité", ["Fonctionnelle", "À réparer"]);
    html += champ("Comptoir - Type", ["Standard", "Îlot"]);
    html += champ("Comptoir - État", ["Bon", "Endommagé"]);
    html += champ("Comptoir - Matériau", ["Stratifié", "Quartz", "Bois"]);
    html += champ("Comptoir - Fonctionnalité", ["Fonctionnel", "À réparer"]);
    html += champ("Îlot - Présence", ["Oui", "Non"]);
    html += champ("Évier - Type", ["Simple", "Double"]);
    html += champ("Évier - Fonctionnalité", ["Fonctionnel", "Défectueux"]);
    html += champ("Évier - Matériau", ["Inox", "Céramique", "Composite"]);
    html += champ("Robinetterie - Type", ["Standard", "À détecteur", "Combinée"]);
    html += champ("Robinetterie - Matériau", ["Chrome", "Inox", "Noir mat"]);
  } else if (type === "Salle de bain") {
    html += champ("Lavabo - Type", ["Simple", "Double"]);
    html += champ("Lavabo - Matériau", ["Porcelaine", "Céramique"]);
    html += champ("Toilette - Type", ["Standard", "Ultra-flux"]);
    html += champ("Toilette - Matériau", ["Porcelaine"]);
    html += champ("Vanité - Type", ["Suspendue", "Sur pied"]);
    html += champ("Vanité - Matériau", ["Bois", "Mélamine"]);
    html += champ("Baignoire - Type", ["Encastrée", "Autoportante"]);
    html += champ("Baignoire - Matériau", ["Acrylique", "Fonte"]);
    html += champ("Douche - Type", ["Coin", "Murale"]);
    html += champ("Douche - Matériau", ["Fibre de verre", "Céramique"]);
    html += champ("Ventilation - Type", ["Mécanique", "Naturelle"]);
    html += champ("Robinetterie lavabo", ["Chrome", "Noir mat"]);
    html += champ("Robinetterie bain", ["Chrome", "Noir mat"]);
    html += champ("Robinetterie douche", ["Chrome", "Noir mat"]);
  } else if (type === "Salle de lavage") {
    html += champ("Entrée laveuse/sécheuse", ["Oui", "Non"]);
    html += champ("Réservoir eau chaude", ["Présent", "Absent"]);
  } else if (type === "Chambre de rangement") {
    html += champ("Plomberie", ["Fonctionnelle", "Non fonctionnelle"]);
    html += champ("Réservoir eau chaude", ["Présent", "Absent"]);
    html += champ("Tablette", ["Présente", "Absente"]);
    html += champ("Panneau électrique", ["Présent", "Absent"]);
  } else if (type === "Passage") {
    html += champ("Éclairage", ["Fonctionnel", "Défectueux"]);
    html += champ("Panneau électrique", ["Présent", "Absent"]);
  } else if (type === "Chambre") {
    html += champ("Garde-robe", ["Présent", "Absent"]);
  }

  html += texte("Commentaires");
  html += `<label>Photo : <input type="file" accept="image/*" onchange="previewImage(event, this)"><img class="photo-preview"></label>`;
  html += `</div>`;

  div.innerHTML = html;
  document.getElementById("liste-pieces").appendChild(div);
}

// === GESTION CLIENTS ===
function enregistrerClient() {
  const champs = document.querySelectorAll("#formulaire-client input, #formulaire-client select");
  let clientData = {};
  champs.forEach((champ) => {
    const key = champ.name || champ.previousSibling.textContent.trim();
    clientData[key] = champ.value;
  });

  localStorage.setItem("dossierClientJLR_" + identifiant.trim(), JSON.stringify(clientData));
  alert("Client enregistré localement.");
}

function chargerClient() {
  const identifiant = prompt("Entrez le nom de l'entreprise, le téléphone ou le courriel du client à rechercher :");
  if (!identifiant) return;

  const data = JSON.parse(localStorage.getItem("dossierClientJLR_" + identifiant.trim()));
  if (!data) return alert("Aucun dossier trouvé pour cet identifiant.");

  const champs = document.querySelectorAll("#formulaire-client input, #formulaire-client select");
  champs.forEach((champ) => {
    const key = champ.name || champ.previousSibling.textContent.trim();
    if (data[key] !== undefined) champ.value = data[key];
  });
  alert("Dossier client chargé.");
}

function chargerListeClients() {
  const select = document.getElementById("liste-clients");
  if (!select) return;

  select.innerHTML = '<option value="">-- Sélectionnez un client --</option>';

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("dossierClientJLR_")) {
      const identifiant = key.replace("dossierClientJLR_", "");
      const option = document.createElement("option");
      option.value = identifiant;
      option.textContent = identifiant;
      select.appendChild(option);
    }
  }
}

function chargerClientDepuisListe() {
  const select = document.getElementById("liste-clients");
  if (!select || !select.value) return;

  const data = JSON.parse(localStorage.getItem("dossierClientJLR_" + select.value));
  if (!data) return alert("Aucun dossier trouvé pour cet identifiant.");

  const champs = document.querySelectorAll("#formulaire-client input, #formulaire-client select");
  champs.forEach((champ) => {
    const key = champ.name || champ.previousSibling.textContent.trim();
    if (data[key] !== undefined) champ.value = data[key];
  });

  alert("Dossier client chargé depuis la liste.");
}

function supprimerClient() {
  const select = document.getElementById("liste-clients");
  if (!select || !select.value) return alert("Aucun client sélectionné.");

  const confirmation = confirm("Voulez-vous vraiment supprimer ce client?");
  if (!confirmation) return;

  const key = "dossierClientJLR_" + select.value;
  localStorage.removeItem(key);
  alert("Client supprimé.");

  chargerListeClients();
  select.selectedIndex = 0;
}

// === INIT AU CHARGEMENT ===
window.onload = () => {
  chargerListeClients();
  initSignature("signature-client");
  initSignature("signature-verificateur");
  const dateField = document.getElementById("vérification-date");
  if (dateField) dateField.valueAsDate = new Date();
};
