// ======================================================
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

  // Date active du jour (YYYYMMDD)
  const aujourdHui = new Date();
  const dateActive =
    aujourdHui.getFullYear().toString() +
    String(aujourdHui.getMonth() + 1).padStart(2, "0") +
    String(aujourdHui.getDate()).padStart(2, "0");

  // Nettoyage nom
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


// ======================================================
// MISE À JOUR EN TEMPS RÉEL
// ======================================================

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

  // Génération initiale
  genererNumeroDossier();

});
// ======================================================
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
// AJOUT PIÈCE — MOTEUR GLOBAL
// ======================================================

function ajouterPiece() {

  const type = document.getElementById("type-piece").value;
  if (!type) {
    alert("Veuillez sélectionner une pièce.");
    return;
  }

  const id = "piece-" + Date.now();
  const div = document.createElement("div");
  div.className = "piece-container";
  div.id = id;

  let html = `<h3 class="piece-header">
  ${type}
  <button type="button" onclick="terminerPiece('${id}')">Terminer</button>
  <button type="button" onclick="document.getElementById('${id}').remove()">Retirer</button>
</h3>`;

  // ===== STRUCTURE UNIVERSELLE =====

  html += champ("Plafond - Type", ["Gypsum","Bois","Suspendu","Béton"]);
  html += champ("Plafond - État", ["Bon","Fissuré","Taché","Endommagé"]);
  html += champ("Plafond - Matériau", ["Plâtre","PVC","Bois","Métal"]);

  html += champ("Mur - Type", ["Cloison sèche","Brique","Bois","Béton"]);
  html += champ("Mur - État", ["Bon","Fissuré","Taché","Humidité"]);
  html += champ("Mur - Matériau", ["Peinture","Papier peint","Carrelage","Bois"]);

  html += champ("Plancher - Type", ["Bois","Céramique","Vinyle","Béton","Tapis"]);
  html += champ("Plancher - État", ["Bon","Usé","Fissuré","Endommagé"]);
  html += champ("Plancher - Matériau", ["Bois franc","Flottant","Stratifié","Béton"]);

  html += champ("Fenêtre - Type", ["Coulissante","À battant","Fixe"]);
  html += champ("Fenêtre - État", ["Bonne","À réparer","Brisée"]);
  html += champ("Fenêtre - Matériau", ["PVC","Aluminium","Bois"]);

  html += champ("Porte - Type", ["Bois","Métal","Vitrée"]);
  html += champ("Porte - État", ["Bonne","À réparer","Endommagée"]);

  html += champ("Éclairage - Type", ["Encastré","Plafonnier","Rail","Murale"]);
  html += champ("Éclairage - État", ["Fonctionnel","Défectueux"]);
  html += champ("Éclairage - Fonctionnalité", ["Normal","Gradateur"]);

  html += champ("Prises - Type", ["Standard","GFCI","USB"]);
  html += champ("Prises - Quantité", ["1","2","3+"]);
  html += champ("Prises - Fonctionnalité", ["Fonctionnelles","Défectueuses"]);

  html += champ("Chauffage - Type", ["Plinthe","Radiateur","Unité murale"]);
  html += champ("Chauffage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  html += champ("Climatisation - Type", ["Murale","Fenêtre","Centrale"]);
  html += champ("Climatisation - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

  html += champ("Thermostat - Type", ["Numérique","Mécanique"]);
  html += champ("Thermostat - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  html += champ("Interrupteurs - État", ["Fonctionnels","Défectueux"]);

  // ===== SPÉCIFIQUE SERA DANS PARTIE 2 → 7 =====
  // ======================================================
// ====================== CUISINE =======================
// ======================================================

  if (type === "Cuisine") {

    html += champ("Hotte - Type", ["Standard","Micro-ondes intégrée","Commerciale"]);
    html += champ("Hotte - État", ["Fonctionnelle","Défectueuse","Bruyante"]);
    html += champ("Hotte - Matériau", ["Inox","Plastique","Aluminium"]);

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
    html += champ("Évier - Fonctionnalité", ["Fonctionnel","Défectueux"]);
    html += champ("Évier - Matériau", ["Inox","Composite","Céramique"]);

    html += champ("Robinetterie - Type", ["Standard","À détecteur","Combinée"]);
    html += champ("Robinetterie - État", ["Bonne","Fuite","Défectueuse"]);
    html += champ("Robinetterie - Matériau", ["Chrome","Noir mat","Inox"]);

    html += champ("Plomberie - Type", ["Cuivre","PEX","ABS","PVC"]);
    html += champ("Plomberie - État", ["Bon","Fuite","Bouchée","Corrosion"]);
    html += champ("Plomberie - Fonctionnalité", ["Fonctionnelle","Non fonctionnelle"]);

    html += champ("Sortie gaz - Présence", ["Présente","Absente"]);
    html += champ("Sortie gaz - Conformité", ["Conforme","Non conforme"]);

    html += champ("Détecteur fumée - Présence", ["Présent","Absent"]);
    html += champ("Détecteur fumée - Fonctionnalité", ["Fonctionnel","Défectueux"]);

    html += champ("Ventilation cuisine - Type", ["Naturelle","Mécanique"]);
    html += champ("Ventilation cuisine - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += texte("Commentaires spécifiques cuisine");
  }

// ======================================================
// ================= SALLE DE BAIN ======================
// ======================================================

  if (type === "Salle de bain") {

    html += champ("Lavabo - Type", ["Simple","Double","Suspendu"]);
    html += champ("Lavabo - État", ["Bon","Fissuré","Endommagé"]);
    html += champ("Lavabo - Fonctionnalité", ["Fonctionnel","Défectueux"]);
    html += champ("Lavabo - Matériau", ["Porcelaine","Céramique","Composite"]);

    html += champ("Vanité - Type", ["Suspendue","Sur pied","Modulaire"]);
    html += champ("Vanité - État", ["Bonne","Endommagée","Humidité"]);
    html += champ("Vanité - Matériau", ["Bois","Mélamine","PVC"]);

    html += champ("Toilette - Type", ["Standard","Ultra-flux","Suspendue"]);
    html += champ("Toilette - État", ["Bonne","Fuite","Instable"]);
    html += champ("Toilette - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Douche - Type", ["Coin","Murale","Walk-in"]);
    html += champ("Douche - État", ["Bon","Fuite","Moisissure"]);
    html += champ("Douche - Matériau", ["Fibre de verre","Céramique","Acrylique"]);

    html += champ("Baignoire - Type", ["Encastrée","Autoportante"]);
    html += champ("Baignoire - État", ["Bonne","Fissurée","Endommagée"]);
    html += champ("Baignoire - Matériau", ["Acrylique","Fonte","Composite"]);

    html += champ("Robinetterie bain - État", ["Bonne","Fuite","Défectueuse"]);
    html += champ("Robinetterie douche - État", ["Bonne","Fuite","Défectueuse"]);

    html += champ("Ventilation - Type", ["Mécanique","Naturelle"]);
    html += champ("Ventilation - État", ["Fonctionnelle","Bruyante","Défectueuse"]);

    html += champ("Prise GFCI - Présence", ["Présente","Absente"]);
    html += champ("Prise GFCI - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Chauffage salle bain - Type", ["Plinthe","Radiateur"]);
    html += champ("Chauffage salle bain - Fonctionnalité", ["Fonctionnel","Défectueux"]);

    html += texte("Commentaires spécifiques salle de bain");
  }

// ======================================================
// ==================== SALLE D’EAU =====================
// ======================================================

  if (type === "Salle d'eau") {

    html += champ("Lavabo - Type", ["Simple","Suspendu"]);
    html += champ("Lavabo - État", ["Bon","Fissuré","Endommagé"]);
    html += champ("Lavabo - Fonctionnalité", ["Fonctionnel","Défectueux"]);

    html += champ("Toilette - Type", ["Standard","Suspendue"]);
    html += champ("Toilette - État", ["Bonne","Fuite","Instable"]);
    html += champ("Toilette - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Ventilation - Type", ["Mécanique","Naturelle"]);
    html += champ("Ventilation - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Prise GFCI - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += texte("Commentaires spécifiques salle d'eau");
  }
  // ======================================================
// ======================== SALON =======================
// ======================================================

  if (type === "Salon") {

    html += champ("Foyer - Présence", ["Présent","Absent"]);
    html += champ("Foyer - Type", ["Bois","Gaz","Électrique"]);
    html += champ("Foyer - État", ["Bon","Endommagé","Non fonctionnel"]);

    html += champ("Moulures - Présence", ["Présentes","Absentes"]);
    html += champ("Moulures - État", ["Bon","Endommagé"]);

    html += champ("Colonnes décoratives - Présence", ["Présentes","Absentes"]);
    html += champ("Colonnes décoratives - État", ["Bon","Endommagé"]);

    html += champ("Plafond cathédrale - Présence", ["Oui","Non"]);
    html += champ("Plafond cathédrale - État", ["Bon","Fissuré","Taché"]);

    html += champ("Isolation sonore - Présence", ["Présente","Absente"]);
    html += champ("Isolation sonore - État", ["Bonne","Insuffisante"]);

    html += champ("Sortie câble / internet - Présence", ["Présente","Absente"]);
    html += champ("Sortie câble / internet - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Détecteur fumée - Présence", ["Présent","Absent"]);
    html += champ("Détecteur fumée - Fonctionnalité", ["Fonctionnel","Défectueux"]);

    html += texte("Commentaires spécifiques salon");
  }

// ======================================================
// ======================= CHAMBRE ======================
// ======================================================

  if (type === "Chambre") {

    html += champ("Garde-robe - Présence", ["Présent","Absent"]);
    html += champ("Garde-robe - Type", ["Standard","Walk-in","Porte coulissante"]);
    html += champ("Garde-robe - État", ["Bon","Endommagé","Portes défectueuses"]);

    html += champ("Détecteur fumée - Présence", ["Présent","Absent"]);
    html += champ("Détecteur fumée - Fonctionnalité", ["Fonctionnel","Défectueux"]);

    html += champ("Isolation - Type", ["Laine minérale","Cellulose","Autre"]);
    html += champ("Isolation - État", ["Bonne","Insuffisante"]);

    html += champ("Sortie TV - Présence", ["Présente","Absente"]);
    html += champ("Sortie TV - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Sortie téléphone - Présence", ["Présente","Absente"]);
    html += champ("Sortie téléphone - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += texte("Commentaires spécifiques chambre");
  }

// ======================================================
// ======================== ENTRÉE ======================
// ======================================================

  if (type === "Entrée") {

    html += champ("Porte principale - Type", ["Bois","Acier","Fibre de verre"]);
    html += champ("Porte principale - État", ["Bonne","Endommagée","Mal ajustée"]);
    html += champ("Porte principale - Fonctionnalité", ["Fonctionnelle","Difficile à ouvrir"]);

    html += champ("Serrure - Type", ["Standard","Électronique","Multipoint"]);
    html += champ("Serrure - État", ["Bonne","Défectueuse"]);

    html += champ("Judasse / Oeil magique - Présence", ["Présent","Absent"]);
    html += champ("Judasse / Oeil magique - État", ["Bon","Défectueux"]);

    html += champ("Tapis d'entrée - Présence", ["Présent","Absent"]);
    html += champ("Tapis d'entrée - État", ["Bon","Usé"]);

    html += champ("Vestiaire - Présence", ["Présent","Absent"]);
    html += champ("Vestiaire - État", ["Bon","Endommagé"]);

    html += texte("Commentaires spécifiques entrée");
  }

// ======================================================
// ======================== PASSAGE =====================
// ======================================================

  if (type === "Passage") {

    html += champ("Garde-corps - Présence", ["Présent","Absent"]);
    html += champ("Garde-corps - État", ["Bon","Instable","Endommagé"]);
    html += champ("Garde-corps - Matériau", ["Bois","Métal","Verre"]);

    html += champ("Escalier - Présence", ["Présent","Absent"]);
    html += champ("Escalier - État", ["Bon","Craque","Instable"]);
    html += champ("Escalier - Matériau", ["Bois","Béton","Métal"]);

    html += champ("Main courante - Présence", ["Présente","Absente"]);
    html += champ("Main courante - État", ["Bonne","Instable"]);

    html += champ("Éclairage corridor - Type", ["Plafonnier","Encastré"]);
    html += champ("Éclairage corridor - Fonctionnalité", ["Fonctionnel","Défectueux"]);

    html += texte("Commentaires spécifiques passage");
  }
  // ======================================================
// ================== SALLE DE LAVAGE ===================
// ======================================================

  if (type === "Salle de lavage") {

    html += champ("Entrée laveuse - Présence", ["Présente","Absente"]);
    html += champ("Entrée laveuse - État", ["Bonne","Fuite","Corrosion"]);

    html += champ("Entrée sécheuse - Présence", ["Présente","Absente"]);
    html += champ("Entrée sécheuse - État", ["Bonne","Défectueuse"]);

    html += champ("Sortie sécheuse - Type", ["Murale","Plafond"]);
    html += champ("Sortie sécheuse - État", ["Bonne","Obstruée"]);

    html += champ("Drain de plancher - Présence", ["Présent","Absent"]);
    html += champ("Drain de plancher - État", ["Bon","Bouché"]);

    html += champ("Bac de lavage - Présence", ["Présent","Absent"]);
    html += champ("Bac de lavage - État", ["Bon","Fissuré"]);

    html += champ("Réservoir eau chaude - Présence", ["Présent","Absent"]);
    html += champ("Réservoir eau chaude - État", ["Bon","Corrosion","Fuite"]);
    html += champ("Réservoir eau chaude - Type", ["Électrique","Gaz"]);

    html += champ("Plomberie générale - Matériau", ["Cuivre","PEX","ABS"]);
    html += champ("Plomberie générale - État", ["Bonne","Fuite","Corrosion"]);

    html += texte("Commentaires spécifiques salle de lavage");
  }

// ======================================================
// ======================== SOUS-SOL ====================
// ======================================================

  if (type === "Sous-sol") {

    html += champ("Fondation - Type", ["Béton coulé","Bloc béton"]);
    html += champ("Fondation - État", ["Bonne","Fissure mineure","Fissure majeure"]);

    html += champ("Isolation - Présence", ["Présente","Absente"]);
    html += champ("Isolation - État", ["Bonne","Humidité","Moisissure"]);

    html += champ("Pompe de puisard - Présence", ["Présente","Absente"]);
    html += champ("Pompe de puisard - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Drain français - Présence", ["Présent","Absent"]);
    html += champ("Drain français - État", ["Bon","Obstrué"]);

    html += champ("Humidité générale - Niveau", ["Faible","Modéré","Élevé"]);

    html += champ("Poutres apparentes - État", ["Bon","Fissuré","Affaissé"]);
    html += champ("Colonnes de soutien - État", ["Bon","Rouille","Instable"]);

    html += texte("Commentaires spécifiques sous-sol");
  }

// ======================================================
// ================== CHAMBRE FROIDE ====================
// ======================================================

  if (type === "Chambre froide") {

    html += champ("Isolation chambre froide - Type", ["Mousse","Laine","Autre"]);
    html += champ("Isolation chambre froide - État", ["Bonne","Humide","Endommagée"]);

    html += champ("Ventilation chambre froide - Présence", ["Présente","Absente"]);
    html += champ("Ventilation chambre froide - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Humidité - Niveau", ["Faible","Modéré","Élevé"]);
    html += champ("Moisissure - Présence", ["Présente","Absente"]);

    html += champ("Tablettes - Présence", ["Présentes","Absentes"]);
    html += champ("Tablettes - État", ["Bon","Endommagé"]);

    html += texte("Commentaires spécifiques chambre froide");
  }

// ======================================================
// ========================= GARAGE =====================
// ======================================================

  if (type === "Garage") {

    html += champ("Porte de garage - Type", ["Manuelle","Motorisée"]);
    html += champ("Porte de garage - État", ["Bonne","Défectueuse","Mal alignée"]);
    html += champ("Porte de garage - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Moteur porte garage - Présence", ["Présent","Absent"]);
    html += champ("Moteur porte garage - État", ["Bon","Défectueux"]);

    html += champ("Plancher garage - Type", ["Béton brut","Époxy"]);
    html += champ("Plancher garage - État", ["Bon","Fissuré","Taché huile"]);

    html += champ("Drain garage - Présence", ["Présent","Absent"]);
    html += champ("Drain garage - État", ["Bon","Obstrué"]);

    html += champ("Panneau électrique - Présence", ["Présent","Absent"]);
    html += champ("Panneau électrique - État", ["Bon","Non conforme"]);

    html += champ("Prise 240V - Présence", ["Présente","Absente"]);
    html += champ("Prise 240V - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += texte("Commentaires spécifiques garage");
  }
  // ======================================================
// ======================= VÉRANDA ======================
// ======================================================

  if (type === "Véranda") {

    html += champ("Structure véranda - Type", ["Bois","Aluminium","PVC"]);
    html += champ("Structure véranda - État", ["Bonne","Instable","Endommagée"]);

    html += champ("Fenêtres véranda - Type", ["Simple vitrage","Double vitrage"]);
    html += champ("Fenêtres véranda - État", ["Bon","Fissuré","Condensation"]);

    html += champ("Toiture véranda - Type", ["Polycarbonate","Verre","Bardeau"]);
    html += champ("Toiture véranda - État", ["Bonne","Fuite","Endommagée"]);

    html += champ("Plancher véranda - Type", ["Bois traité","Composite","Céramique"]);
    html += champ("Plancher véranda - État", ["Bon","Usé","Pourriture"]);

    html += champ("Isolation véranda - Présence", ["Présente","Absente"]);
    html += champ("Isolation véranda - État", ["Bonne","Insuffisante"]);

    html += champ("Chauffage véranda - Présence", ["Présent","Absent"]);
    html += champ("Chauffage véranda - Fonctionnalité", ["Fonctionnel","Défectueux"]);

    html += texte("Commentaires spécifiques véranda");
  }

// ======================================================
// ======================= VERRIÈRE =====================
// ======================================================

  if (type === "Verrière") {

    html += champ("Structure verrière - Matériau", ["Aluminium","Acier","Bois"]);
    html += champ("Structure verrière - État", ["Bon","Corrosion","Instable"]);

    html += champ("Panneaux vitrés - Type", ["Simple","Double","Triple vitrage"]);
    html += champ("Panneaux vitrés - État", ["Bon","Fissuré","Condensation"]);

    html += champ("Étanchéité verrière - État", ["Bonne","Fuite","Joint usé"]);

    html += champ("Ouverture verrière - Fonctionnalité", ["Fonctionnelle","Bloquée"]);

    html += champ("Drainage verrière - Présence", ["Présent","Absent"]);
    html += champ("Drainage verrière - État", ["Bon","Obstrué"]);

    html += texte("Commentaires spécifiques verrière");
  }

// ======================================================
// ================= CHAMBRE DE RANGEMENT ===============
// ======================================================

  if (type === "Chambre de rangement") {

    html += champ("Tablettes - Présence", ["Présentes","Absentes"]);
    html += champ("Tablettes - Matériau", ["Bois","Métal","Plastique"]);
    html += champ("Tablettes - État", ["Bon","Instable","Endommagé"]);

    html += champ("Ventilation rangement - Présence", ["Présente","Absente"]);
    html += champ("Ventilation rangement - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Humidité rangement - Niveau", ["Faible","Modéré","Élevé"]);
    html += champ("Moisissure rangement - Présence", ["Présente","Absente"]);

    html += champ("Éclairage rangement - Type", ["Ampoule","DEL","Néon"]);
    html += champ("Éclairage rangement - Fonctionnalité", ["Fonctionnel","Défectueux"]);

    html += texte("Commentaires spécifiques chambre de rangement");
  }

// ======================================================
// ============== ÉLÉMENTS TECHNIQUES GÉNÉRAUX =========
// ======================================================

  html += champ("Système d'alarme - Présence", ["Présent","Absent"]);
  html += champ("Système d'alarme - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  html += champ("Détecteur CO2 - Présence", ["Présent","Absent"]);
  html += champ("Détecteur CO2 - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  html += champ("Caméra surveillance - Présence", ["Présente","Absente"]);
  html += champ("Caméra surveillance - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

  html += champ("Interphone - Présence", ["Présent","Absent"]);
  html += champ("Interphone - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  html += champ("Accès handicapé - Présence", ["Présent","Absent"]);
  html += champ("Accès handicapé - Conformité", ["Conforme","Non conforme"]);

  html += champ("Conformité générale électrique", ["Conforme","Non conforme"]);
  html += champ("Conformité générale plomberie", ["Conforme","Non conforme"]);
  html += champ("Conformité générale structure", ["Conforme","Non conforme"]);

  html += texte("Commentaires techniques globaux");
  // ======================================================
// ================= ÉQUIPEMENTS AVANCÉS ================
// ======================================================

  html += champ("Thermopompe - Présence", ["Présente","Absente"]);
  html += champ("Thermopompe - Type", ["Murale","Centrale"]);
  html += champ("Thermopompe - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

  html += champ("Échangeur d'air - Présence", ["Présent","Absent"]);
  html += champ("Échangeur d'air - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  html += champ("Panneau secondaire - Présence", ["Présent","Absent"]);
  html += champ("Panneau secondaire - État", ["Bon","Non conforme"]);

  html += champ("Compteur électrique - Présence", ["Présent","Absent"]);
  html += champ("Compteur électrique - État", ["Bon","Endommagé"]);

  html += champ("Valve principale eau - Présence", ["Présente","Absente"]);
  html += champ("Valve principale eau - État", ["Bonne","Fuite"]);

  html += champ("Compteur eau - Présence", ["Présent","Absent"]);
  html += champ("Compteur eau - État", ["Bon","Défectueux"]);

  html += champ("Sortie extérieure - Présence", ["Présente","Absente"]);
  html += champ("Sortie extérieure - État", ["Bonne","Endommagée"]);

  html += champ("Balcon - Présence", ["Présent","Absent"]);
  html += champ("Balcon - État", ["Bon","Instable","Endommagé"]);

  html += champ("Garde-corps balcon - État", ["Bon","Instable","Non conforme"]);

// ======================================================
// ===================== PHOTOS =========================
// ======================================================

  html += `
  <label>Photo générale 1
    <input type="file" accept="image/*" onchange="previewImage(event,this)">
    <img style="max-width:200px; display:none; margin-top:5px;">
  </label>`;

  html += `
  <label>Photo générale 2
    <input type="file" accept="image/*" onchange="previewImage(event,this)">
    <img style="max-width:200px; display:none; margin-top:5px;">
  </label>`;

  html += `
  <label>Photo défaut spécifique
    <input type="file" accept="image/*" onchange="previewImage(event,this)">
    <img style="max-width:200px; display:none; margin-top:5px;">
  </label>`;

// ======================================================
// ================= SIGNATURE PIÈCE ====================
// ======================================================

  html += `
  <label>Validation visuelle pièce
    <select>
      <option value="">Sélectionnez</option>
      <option>Conforme</option>
      <option>Non conforme</option>
    </select>
  </label>`;

// ======================================================
// ================= COMMENTAIRES FINAUX =================
// ======================================================

  html += texte("Résumé technique final de la pièce");

  div.innerHTML = html;
  document.getElementById("liste-pieces").appendChild(div);
  document.getElementById("type-piece").value = "";

}
// ======================================================
// ================== PRÉVISUALISATION IMAGE ============
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
// ===================== IMPRESSION ======================
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
// ================= INITIALISATION ======================
// ======================================================

document.addEventListener("DOMContentLoaded", function() {

  genererNumeroDossier();

});
// ======================================================
// ================= TERMINER PIÈCE =====================
// ======================================================

function terminerPiece(id) {

  const piece = document.getElementById(id);
  if (!piece) return;

  // Désactiver tous les champs
  piece.querySelectorAll("select, textarea, input").forEach(el => {
    el.disabled = true;
  });

  // Créer résumé compact
  let resume = "";
  piece.querySelectorAll("label").forEach(label => {

    const select = label.querySelector("select");
    if (!select) return;

    if (!select.value || select.value === "Sélectionnez") return;

    const nomChamp = label.childNodes[0].textContent.trim();
    resume += `<div>${nomChamp} : ${select.value}</div>`;
  });

  // Créer bloc résumé
  const blocResume = document.createElement("div");
  blocResume.className = "resume-piece";
  blocResume.innerHTML = `
    <div style="margin-top:10px; padding:10px; background:#f0f0f0; border-radius:6px;">
      <strong>Résumé rapide :</strong>
      ${resume || "<div>Aucune donnée sélectionnée</div>"}
    </div>
  `;

  piece.appendChild(blocResume);

  // Remplacer boutons
  const header = piece.querySelector(".piece-header");
  if (header) {
    header.innerHTML = `
      ${header.textContent.replace("Terminer","").replace("Retirer","").trim()}
      <button type="button" onclick="rouvrirPiece('${id}')">Réouvrir</button>
    `;
  }

  // Mode compact visuel
  piece.style.opacity = "0.85";
  piece.style.border = "2px solid #4CAF50";
}

// ======================================================
// ================= RÉOUVRIR PIÈCE =====================
// ======================================================

function rouvrirPiece(id) {

  const piece = document.getElementById(id);
  if (!piece) return;

  // Réactiver champs
  piece.querySelectorAll("select, textarea, input").forEach(el => {
    el.disabled = false;
  });

  // Supprimer résumé
  const resume = piece.querySelector(".resume-piece");
  if (resume) resume.remove();

  // Restaurer boutons
  const header = piece.querySelector(".piece-header");
  if (header) {
    const titre = header.textContent.replace("Réouvrir","").trim();
    header.innerHTML = `
      ${titre}
      <button type="button" onclick="terminerPiece('${id}')">Terminer</button>
      <button type="button" onclick="document.getElementById('${id}').remove()">Retirer</button>
    `;
  }

  // Retirer style compact
  piece.style.opacity = "1";
  piece.style.border = "1px solid #ccc";
}
// ======================================================
// CONFIGURATION MÉTIER
// ======================================================

const REGLES_METIER = {

  conformes: [
    "Bon","Bonne","Bons","Bonnes",
    "Fonctionnel","Fonctionnelle","Fonctionnels","Fonctionnelles",
    "Présent","Présente","Présents","Présentes",
    "Oui","Conforme","Normale"
  ],

  mineurs: [
    "Taché","Usé","Craque","Gondolé","Bruyant",
    "Condensation","Instable léger","Insuffisante"
  ],

  fonctionnels: [
    "Défectueux","Défectueuse","Bloqué",
    "Bouché","Obstrué","À réparer",
    "Fuite légère"
  ],

  majeurs: [
    "Non conforme","Fuite","Brisée",
    "Fissure majeure","Corrosion","Rouille",
    "Instable","Affaissé","Moisissure",
    "Humidité élevée"
  ],

  penalites: {
    mineur: 5,
    fonctionnel: 10,
    majeur: 20,
    critique: 30
  }

};

// ======================================================
// ANALYSE D’UNE PIÈCE
// ======================================================

function analyserPiece(piece) {

  let score = 100;
  let mineurs = 0;
  let fonctionnels = 0;
  let majeurs = 0;
  let critique = false;

  const selects = piece.querySelectorAll("select");

  selects.forEach(select => {

    const valeur = select.value;
    if (!valeur || valeur === "Sélectionnez") return;

    if (REGLES_METIER.conformes.includes(valeur)) return;

    if (REGLES_METIER.mineurs.includes(valeur)) {
      score -= REGLES_METIER.penalites.mineur;
      mineurs++;
      return;
    }

    if (REGLES_METIER.fonctionnels.includes(valeur)) {
      score -= REGLES_METIER.penalites.fonctionnel;
      fonctionnels++;
      return;
    }

    if (REGLES_METIER.majeurs.includes(valeur)) {
      score -= REGLES_METIER.penalites.majeur;
      majeurs++;
      critique = true;
      return;
    }

  });

  if (score < 0) score = 0;

  const statut = determinerStatut(score, critique);

  piece.dataset.score = score;
  piece.dataset.statut = statut;

  appliquerCouleur(piece, statut);

  genererResumePiece(piece, score, mineurs, fonctionnels, majeurs, statut);

  analyserBatimentGlobal();

}

// ======================================================
// DÉTERMINATION DU STATUT
// ======================================================

function determinerStatut(score, critique) {

  if (critique) return "Non conforme majeur";
  if (score >= 90) return "Conforme";
  if (score >= 75) return "Conforme avec recommandations";
  if (score >= 50) return "Non conforme mineur";
  return "Non conforme majeur";

}

// ======================================================
// COULEUR VISUELLE AUTOMATIQUE
// ======================================================

function appliquerCouleur(piece, statut) {

  piece.style.borderWidth = "3px";

  switch (statut) {

    case "Conforme":
      piece.style.borderColor = "#2ecc71";
      break;

    case "Conforme avec recommandations":
      piece.style.borderColor = "#f39c12";
      break;

    case "Non conforme mineur":
      piece.style.borderColor = "#e67e22";
      break;

    case "Non conforme majeur":
      piece.style.borderColor = "#e74c3c";
      break;

  }

}

// ======================================================
// RÉSUMÉ INTELLIGENT PAR PIÈCE
// ======================================================

function genererResumePiece(piece, score, mineurs, fonctionnels, majeurs, statut) {

  let resumeBloc = piece.querySelector(".resume-intelligent");
  if (resumeBloc) resumeBloc.remove();

  resumeBloc = document.createElement("div");
  resumeBloc.className = "resume-intelligent";

  resumeBloc.innerHTML = `
    <div style="margin-top:15px; padding:10px; background:#f9f9f9; border-radius:6px;">
      <strong>Analyse automatique :</strong><br>
      Score : ${score}/100<br>
      Défauts mineurs : ${mineurs}<br>
      Défauts fonctionnels : ${fonctionnels}<br>
      Défauts majeurs : ${majeurs}<br>
      <strong>Statut : ${statut}</strong>
    </div>
  `;

  piece.appendChild(resumeBloc);

}

// ======================================================
// ANALYSE GLOBALE DU BÂTIMENT
// ======================================================

function analyserBatimentGlobal() {

  const pieces = document.querySelectorAll(".piece-container");
  if (pieces.length === 0) return;

  let total = 0;
  let majeurDetecte = false;

  pieces.forEach(piece => {

    const score = parseInt(piece.dataset.score || 100);
    total += score;

    if (piece.dataset.statut === "Non conforme majeur") {
      majeurDetecte = true;
    }

  });

  const moyenne = Math.round(total / pieces.length);

  let statutGlobal;

  if (majeurDetecte) {
    statutGlobal = "Inspection corrective requise";
  } else if (moyenne >= 90) {
    statutGlobal = "Bâtiment conforme";
  } else if (moyenne >= 75) {
    statutGlobal = "Recommandations générales";
  } else {
    statutGlobal = "Correction nécessaire";
  }

  afficherResumeGlobal(moyenne, statutGlobal);

}

// ======================================================
// RÉSUMÉ GLOBAL BÂTIMENT
// ======================================================

function afficherResumeGlobal(score, statut) {

  let zone = document.getElementById("resume-global");

  if (!zone) {
    zone = document.createElement("div");
    zone.id = "resume-global";
    document.body.appendChild(zone);
  }

  zone.innerHTML = `
    <div style="padding:15px; margin-top:20px; background:#ffffff; border-radius:8px; border:2px solid #333;">
      <h3>Résumé global du bâtiment</h3>
      Score moyen : ${score}/100<br>
      <strong>Statut général : ${statut}</strong>
    </div>
  `;

}

// ======================================================
// DÉCLENCHEMENT AUTOMATIQUE
// ======================================================

document.addEventListener("change", function(e) {

  const piece = e.target.closest(".piece-container");
  if (!piece) return;

  analyserPiece(piece);

});
// ======================================================
// ================= SIGNATURES GLOBALES =================
// ======================================================

function activerSignature(canvasId) {

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let dessin = false;

  canvas.addEventListener("mousedown", () => dessin = true);

  canvas.addEventListener("mouseup", () => {
    dessin = false;
    ctx.beginPath();
  });

  canvas.addEventListener("mousemove", e => {

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

// ======================================================
// ================= EFFACER =============================
// ======================================================

function effacerSignatureLocataire() {

  const canvas = document.getElementById("signature-client");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

}

function effacerSignatureConsultant() {

  const canvas = document.getElementById("signature-verificateur");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

}

// ======================================================
// ================= FIGER ===============================
// ======================================================

function figerSignature(canvasId) {

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  canvas.dataset.locked = "true";
  canvas.style.opacity = "0.6";

}

// ======================================================
// ================= RÉOUVRIR ============================
// ======================================================

function deverrouillerSignature(canvasId) {

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  canvas.dataset.locked = "false";
  canvas.style.opacity = "1";

}

// ======================================================
// ================= INITIALISATION ======================
// ======================================================

document.addEventListener("DOMContentLoaded", function() {

  activerSignature("signature-client");
  activerSignature("signature-verificateur");

});
