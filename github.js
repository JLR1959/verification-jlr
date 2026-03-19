// ======================================================
// MODULE 11 — GITHUB CLOUD FONCTIONNEL
// ======================================================

// CONFIG
const GITHUB_TOKEN = "COLLE_TON_TOKEN_ICI";
const GITHUB_OWNER = "JLR1959";
const GITHUB_REPO = "verification-jlr";
const GITHUB_BRANCH = "main";

// ======================================================
// UTILITAIRE API
// ======================================================

async function githubRequest(path, method = "GET", body = null) {

    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/${path}`;

    const options = {
        method: method,
        headers: {
            "Authorization": `token ${GITHUB_TOKEN}`,
            "Content-Type": "application/json"
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            alert("Erreur GitHub : " + JSON.stringify(data));
            return null;
        }

        return data;

    } catch (e) {
        alert("Erreur réseau GitHub");
        return null;
    }
}

// ======================================================
// SAUVEGARDE CLIENT
// ======================================================

async function envoyerClientGitHub() {

    const client = JSON.parse(localStorage.getItem("clientActuel"));

    if (!client) {
        alert("Aucun client actif");
        return;
    }

    const contenu = btoa(unescape(encodeURIComponent(JSON.stringify(client, null, 2))));
    const path = `clients/${client.id}.json`;

    const existant = await githubRequest(`contents/${path}`);
    const sha = existant ? existant.sha : undefined;

    const result = await githubRequest(`contents/${path}`, "PUT", {
        message: "Sauvegarde client",
        content: contenu,
        branch: GITHUB_BRANCH,
        sha: sha
    });

    if (result) alert("Client sauvegardé");
}

// ======================================================
// SAUVEGARDE RAPPORT
// ======================================================

async function envoyerRapportGitHub() {

    const rapport = document.getElementById("rapport-impression");

    if (!rapport) {
        alert("Rapport introuvable");
        return;
    }

    const html = rapport.innerHTML;
    const contenu = btoa(unescape(encodeURIComponent(html)));

    const nom = "rapport_" + Date.now() + ".html";
    const path = `rapports/${nom}`;

    const result = await githubRequest(`contents/${path}`, "PUT", {
        message: "Sauvegarde rapport",
        content: contenu,
        branch: GITHUB_BRANCH
    });

    if (result) alert("Rapport sauvegardé");
}

// ======================================================
// LISTE CLIENTS
// ======================================================

async function chargerListeClientsCloud() {

    const data = await githubRequest("contents/clients");

    if (!data) return;

    const container = document.getElementById("liste-clients-cloud");
    container.innerHTML = "";

    data.forEach(file => {

        const div = document.createElement("div");
        div.textContent = file.name;
        div.style.cursor = "pointer";

        div.onclick = () => chargerClientDepuisCloud(file.path);

        container.appendChild(div);
    });
}

// ======================================================
// CHARGER CLIENT
// ======================================================

async function chargerClientDepuisCloud(path) {

    const file = await githubRequest(`contents/${path}`);

    if (!file) return;

    const contenu = JSON.parse(atob(file.content));

    localStorage.setItem("clientActuel", JSON.stringify(contenu));

    alert("Client chargé");
}

// ======================================================
// DERNIER CLIENT
// ======================================================

async function chargerDernierClient() {

    const data = await githubRequest("contents/clients");

    if (!data || data.length === 0) return;

    const dernier = data[data.length - 1];

    chargerClientDepuisCloud(dernier.path);
}

// ======================================================
// RECHERCHE
// ======================================================

function rechercherClientCloud() {

    const filtre = document.getElementById("recherche-client-cloud").value.toLowerCase();
    const items = document.querySelectorAll("#liste-clients-cloud div");

    items.forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(filtre) ? "block" : "none";
    });
}
