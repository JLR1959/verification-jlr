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
  html += champ("Plafond - Recouvrement", ["Plâtre","PVC","Bois","Métal"]);

  html += champ("Mur - Type", ["Cloison sèche","Brique","Bois","Béton"]);
  html += champ("Mur - État", ["Bon","Fissuré","Taché","Humidité"]);
  html += champ("Mur - Recouvrement", ["Peinture","Papier peint","Carrelage","Bois"]);

  html += champ("Plancher - Type", ["Bois","Céramique","Vinyle","Béton","Tapis"]);
  html += champ("Plancher - État", ["Bon","Usé","Fissuré","Endommagé"]);
  html += champ("Plancher - Recouvrement", ["Bois franc","Flottant","Stratifié","Béton"]);

  html += champ("Fenêtre - Type", ["Coulissante","À battant","Fixe"]);
  html += champ("Fenêtre - État", ["Bonne","À réparer","Brisée"]);
  html += champ("Fenêtre - Recouvrement", ["PVC","Aluminium","Bois"]);

  html += champ("Porte - Type", ["Bois","Métal","Vitrée"]);
  html += champ("Porte - État", ["Bonne","À réparer","Endommagée"]);

  html += champ("Éclairage - Type", ["Encastré","Plafonnier","Rail","Murale"]);
  html += champ("Éclairage - État", ["Fonctionnel","Défectueux"]);
  html += champ("Éclairage - Interrupteur", ["Normal","Gradateur"]);

  html += champ("Prises - Type", ["Standard"]);
  html += champ("Prises - Quantité", ["1","2","3","4","5", "6","7", "8","9","10+"]);
  
  html += champ("Prises - Type", ["GFCI"]);
  html += champ("Prises - Quantité", ["1","2","3","4","5", "6","7", "8","9","10+"]);
  
  html += champ("Prises - Type", ["USB"]);
  html += champ("Prises - Quantité", ["1","2","3","4","5", "6","7", "8","9","10+"]);
  html += champ("Prises - Fonctionnalité", ["Fonctionnelles","Défectueuses"]);

  html += champ("Chauffage - Type", ["Plinthe","Radiateur","Unité murale"]);
  html += champ("Chauffage - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  html += champ("Climatisation - Type", ["Murale","Fenêtre","Centrale"]);
  html += champ("Climatisation - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

  html += champ("Thermostat - Type", ["Numérique","Mécanique"]);
  html += champ("Thermostat - Fonctionnalité", ["Fonctionnel","Défectueux"]);

  html += champ("Interrupteurs - ", ["Fonctionnels","Défectueux"]);
    // ======================================================
  // ====================== CUISINE =======================
  // ======================================================

  if (type === "Cuisine") {

    html += champ("Hotte - Type", ["Standard","Micro-ondes intégrée","Commerciale","Suspendu"]);
    html += champ("Hotte - État", ["Fonctionnelle","Défectueuse","Bruyante"]);
    html += champ("Hotte - Matériaux", ["Inox","Plastique","Aluminium"]);

    html += champ("Armoires supérieures - Type", ["Standard","Modulaire","Sur mesure"]);
    html += champ("Armoires supérieures - État", ["Bonnes","Endommagées","Gondolées"]);
    html += champ("Armoires supérieures - Matériaux", ["Bois","Mélamine","PVC"]);

    html += champ("Armoires inférieures - Type", ["Standard","Modulaire","Sur mesure"]);
    html += champ("Armoires inférieures - État", ["Bonnes","Endommagées","Humidité"]);
    html += champ("Armoires inférieures - Matériaux", ["Bois","Mélamine","PVC"]);

    html += champ("Comptoir - Type", ["Standard","Îlot","Linéaire"]);
    html += champ("Comptoir - État", ["Bon","Endommagé","Fissuré"]);
    html += champ("Comptoir - Matériaux", ["Stratifié","Quartz","Granite","Bois"]);

    html += champ("Îlot - Présence", ["Présent","Absent"]);
    html += champ("Îlot - État", ["Bon","Endommagé","Instable"]);

    html += champ("Évier - Type", ["Simple","Double","Commercial"]);
    html += champ("Évier - État", ["Bon","Fissuré","Rouille"]);
    html += champ("Évier - Fonctionnalité", ["Fonctionnel","Défectueux"]);
    html += champ("Évier - Matériaux", ["Inox","Composite","Céramique"]);

    html += champ("Robinetterie - Type", ["Standard","À détecteur","Combinée"]);
    html += champ("Robinetterie - État", ["Bonne","Fuite","Défectueuse"]);
    html += champ("Robinetterie - Matériaux", ["Chrome","Noir mat","Inox"]);

    html += champ("Plomberie - Type", ["Cuivre","PEX","ABS","PVC"]);
    html += champ("Plomberie - État", ["Bon","Fuite","Bouchée","Corrosion"]);
    html += champ("Plomberie - Fonctionnalité", ["Fonctionnelle","Non fonctionnelle"]);

    html += champ("Sortie gaz - Présence", ["Présente","Absente"]);
    html += champ("Sortie gaz - Conformité", ["Conforme","Non conforme"]);

    html += champ("Détecteur fumée - Présence", ["Présent","Absent"]);
    html += champ("Détecteur fumée - État", ["Fonctionnel","Défectueux"]);

    html += champ("Ventilation cuisine - Type", ["Naturelle","Mécanique"]);
    html += champ("Ventilation cuisine - État", ["Fonctionnelle","Défectueuse"]);

    html += texte("Commentaires spécifiques cuisine");
  }

  // ======================================================
  // ================= SALLE DE BAIN ======================
  // ======================================================

  if (type === "Salle de bain") {

    html += champ("Lavabo - Type", ["Simple","Double","Suspendu"]);
    html += champ("Lavabo - État", ["Bon","Fissuré","Endommagé"]);
    html += champ("Lavabo - Fonctionnalité", ["Fonctionnel","Défectueux"]);
    html += champ("Lavabo - Matériaux", ["Porcelaine","Céramique","Composite"]);

    html += champ("Vanité - Type", ["Suspendue","Sur pied","Modulaire"]);
    html += champ("Vanité - État", ["Bonne","Endommagée","Humidité"]);
    html += champ("Vanité - Matériaux", ["Bois","Mélamine","PVC"]);

    html += champ("Toilette - Type", ["Standard","Ultra-flux","Suspendue"]);
    html += champ("Toilette - État", ["Bonne","Fuite","Instable"]);
    html += champ("Toilette - Fonctionnalité", ["Fonctionnelle","Défectueuse"]);

    html += champ("Douche - Type", ["Coin","Murale","Walk-in"]);
    html += champ("Douche - État", ["Bon","Fuite","Moisissure"]);
    html += champ("Douche - Matériaux", ["Fibre de verre","Céramique","Acrylique"]);

    html += champ("Baignoire - Type", ["Encastrée","Autoportante"]);
    html += champ("Baignoire - État", ["Bonne","Fissurée","Endommagée"]);
    html += champ("Baignoire - Matériaux", ["Acrylique","Fonte","Composite"]);

    html += champ("Robinetterie bain - État", ["Bonne","Fuite","Défectueuse"]);
    html += champ("Robinetterie douche - État", ["Bonne","Fuite","Défectueuse"]);

    html += champ("Ventilation - Type", ["Mécanique","Naturelle"]);
    html += champ("Ventilation - Fonctionnalité", ["Fonctionnelle","Bruyante","Défectueuse"]);

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
    html += champ("Garde-corps - Matériaux", ["Bois","Métal","Verre"]);

    html += champ("Escalier - Présence", ["Présent","Absent"]);
    html += champ("Escalier - État", ["Bon","Craque","Instable"]);
    html += champ("Escalier - Matériaux", ["Bois","Béton","Métal"]);

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
  
  html += texte("À ajouter dans la pièce seulement si présent");
  
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

  const dossier = document.getElementById("numeroDossier")?.value || "";
  const locataire = document.getElementById("locataire")?.value || "";
  const telephone = document.getElementById("telephone")?.value || "";
  const appartement = document.getElementById("numeroAppartement")?.value || "";
  const adresse = document.getElementById("adresse")?.value || "";
  const ville = document.getElementById("ville")?.value || "";
  const dateVerification = document.getElementById("verification-date")?.value || "";
  const verificateur = document.getElementById("nomVerificateur")?.value || "Jean-Louis Raymond";

  const heures = tempsTotalSecondes / 3600;
  const sousTotal = heures * tauxHoraire;
  const tps = sousTotal * 0.05;
  const tvq = sousTotal * 0.09975;
  const total = sousTotal + tps + tvq;

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

      const ligne = `<div><strong>${titre}</strong> — ${nomChamp} : ${valeur}</div>`;

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
  <div style="position:relative;">

    <!-- FILIGRANE -->
    <div style="
      position:absolute;
      top:40%;
      left:50%;
      transform:translate(-50%,-50%) rotate(-30deg);
      font-size:80px;
      color:rgba(0,0,0,0.05);
      font-weight:bold;
      pointer-events:none;
      z-index:0;">
      JLR
    </div>

    <div style="position:relative; z-index:1;">

      <div style="text-align:center; margin-bottom:20px;">
        <img src="logo_jlr.png" style="max-height:80px;"><br>
        <strong>Vérification Préventive Immobilière</strong><br>
        Jean-Louis Raymond<br>
        Consultant en vérification préventive<br><br>
        📧 jlouisraymond@hotmail.com | 📞 438-220-6511<br>
        NEQ : 2268876952<br>
        TPS : 771362471 RT 0001<br>
        TVQ : 1227894560 TQ 0001
      </div>

      <hr>

      <h2>Informations du client</h2>
      <div>Numéro de dossier : ${dossier}</div>
      <div>Nom du locataire : ${locataire}</div>
      <div>Téléphone : ${telephone}</div>
      <div>Adresse : ${adresse}, ${appartement}, ${ville}</div>
      <div>Date de vérification : ${dateVerification}</div>
      <div>Nom du vérificateur : ${verificateur}</div>

      <hr>

      <h2>Éléments défectueux</h2>
      ${defectueux || "<div>Aucun problème détecté.</div>"}

      <hr>

      <h2>Éléments conformes</h2>
      ${conformes || "<div>Aucun élément conforme détecté.</div>"}

      <hr>

      <h2>Facturation</h2>
      <div>Temps travaillé : ${heures.toFixed(2)} heures</div>
      <div>Taux horaire : ${tauxHoraire} $ / heure</div><br>
      <div>Sous-total : ${sousTotal.toFixed(2)} $</div>
      <div>TPS (5%) : ${tps.toFixed(2)} $</div>
      <div>TVQ (9.975%) : ${tvq.toFixed(2)} $</div>
      <strong>Total à payer : ${total.toFixed(2)} $</strong>

    </div>
  </div>
  `;
}

window.addEventListener("beforeprint", genererRapportImpression);

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
    <div style="margin-top:10px; padding:10px; background:#f0f0f0; border-radius:6px;">
      <strong>Résumé rapide :</strong>
      ${resume || "<div>Aucune donnée sélectionnée</div>"}
    </div>
  `;

  piece.appendChild(blocResume);

  // 🔽 Masquer tout sauf le header et le résumé
  piece.querySelectorAll("label").forEach(el => {
    el.style.display = "none";
  });

  const header = piece.querySelector(".piece-header");
  if (header) {
    header.innerHTML = `
      ${header.textContent.replace("Terminer","").replace("Retirer","").trim()}
      <button type="button" onclick="rouvrirPiece('${id}')">Réouvrir</button>
    `;
  }

  piece.style.border = "2px solid #4CAF50";
}

// ======================================================
// ================= RÉOUVRIR PIÈCE =====================
// ======================================================

function rouvrirPiece(id) {

  const piece = document.getElementById(id);
  if (!piece) return;

  piece.querySelectorAll("select, textarea, input").forEach(el => {
    el.disabled = false;
  });

  // 🔼 Réafficher les champs
  piece.querySelectorAll("label").forEach(el => {
    el.style.display = "";
  });

  const resume = piece.querySelector(".resume-piece");
  if (resume) resume.remove();

  const header = piece.querySelector(".piece-header");
  if (header) {
    const titre = header.textContent.replace("Réouvrir","").trim();
    header.innerHTML = `
      ${titre}
      <button type="button" onclick="terminerPiece('${id}')">Terminer</button>
      <button type="button" onclick="document.getElementById('${id}').remove()">Retirer</button>
    `;
  }

  piece.style.border = "1px solid #ccc";
}

// ======================================================
// ================= SIGNATURES ==========================
// ======================================================
function activerSignature(canvasId) {

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let dessin = false;

  canvas.dataset.locked = "false";
  canvas.style.touchAction = "none";

  function getPosition(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  canvas.addEventListener("pointerdown", function(e) {

    if (canvas.dataset.locked === "true") return;

    dessin = true;
    canvas.setPointerCapture(e.pointerId);

    const pos = getPosition(e);

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  });

  canvas.addEventListener("pointermove", function(e) {

    if (!dessin || canvas.dataset.locked === "true") return;

    const pos = getPosition(e);

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  });

  canvas.addEventListener("pointerup", function(e) {

    dessin = false;
    canvas.releasePointerCapture(e.pointerId);
    ctx.beginPath();
  });

  canvas.addEventListener("pointercancel", function() {

    dessin = false;
    ctx.beginPath();
  });

}

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
// ===================== MINUTEUR ========================
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
    String(h).padStart(2, '0') + ':' +
    String(m).padStart(2, '0') + ':' +
    String(s).padStart(2, '0')
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
// ================= ENVOI COURRIEL TEXTE =================
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
// ======================================================
// ================= RÉINITIALISATION TOTALE ============
// ======================================================

// ======================================================
// ================= RÉINITIALISATION TOTALE ============
// ======================================================

function reinitialiserVerification() {

  if (!confirm("Commencer une nouvelle vérification ?")) {
    return;
  }

  // Champs client
  document.querySelectorAll("#formulaire-client input").forEach(el => {
    if (!el.readOnly) el.value = "";
  });

  const selectVerif = document.getElementById("verificateur");
  if (selectVerif) selectVerif.selectedIndex = 0;

  // Numéro dossier
  const dossier = document.getElementById("numeroDossier");
  if (dossier) dossier.value = "";

  // Supprimer pièces
  const liste = document.getElementById("liste-pieces");
  if (liste) liste.innerHTML = "";

  // Effacer signatures
  const canvas1 = document.getElementById("signature-client");
  const canvas2 = document.getElementById("signature-verificateur");

  if (canvas1) canvas1.getContext("2d").clearRect(0, 0, canvas1.width, canvas1.height);
  if (canvas2) canvas2.getContext("2d").clearRect(0, 0, canvas2.width, canvas2.height);

  // Minuteur
  pauseMinuteur();
  tempsTotalSecondes = 0;
  mettreAJourAffichage();

  // Zone impression
  const zone = document.getElementById("zone-impression");
  if (zone) zone.innerHTML = "";

  genererNumeroDossier();
}
// ======================================================
// ========= SAUVEGARDE PDF SUPPORT AMOVIBLE (VERSION FIXE)
// ======================================================

function sauvegarderSurSupport() {

  genererRapportImpression();

  const zone = document.getElementById("zone-impression");
  if (!zone || zone.innerHTML.trim() === "") {
    alert("Le rapport est vide.");
    return;
  }

  const dossier = document.getElementById("numeroDossier")?.value || "rapport";

  const options = {
    margin: 10,
    filename: dossier + ".pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  };

  html2pdf()
    .set(options)
    .from(zone)
    .outputPdf("blob")
    .then(function (pdfBlob) {

      const lien = document.createElement("a");
      lien.href = URL.createObjectURL(pdfBlob);
      lien.download = dossier + ".pdf";

      document.body.appendChild(lien);
      lien.click();
      document.body.removeChild(lien);

    });

}
