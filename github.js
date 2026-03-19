// ======================================================
// GITHUB CLOUD COMPLET (VERSION STABLE)
// ======================================================

// CONFIG
const GITHUB_TOKEN = "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";
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
            console.error("Erreur GitHub :", data);
            alert("Erreur GitHub : " + data.message);
            return null;
        }

        return data;

    } catch (e) {
        console.error("Erreur réseau :", e);
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

    // Vérifier si fichier existe
    const existant = await githubRequest(`contents/${path}`);
    const sha = existant && existant.sha ? existant.sha : undefined;

    const result = await githubRequest(`contents/${path}`, "PUT", {
        message: "Sauvegarde client",
        content: contenu,
        branch: GITHUB_BRANCH,
        sha: sha
    });

    if (result) {
        alert("Client sauvegardé sur GitHub");
    }
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

    if (result) {
        alert("Rapport sauvegardé");
    }
}

// ======================================================
// LISTE CLIENTS
// ======================================================

async function chargerListeClientsCloud() {

    const data = await githubRequest("contents/clients");

    if (!data || !Array.isArray(data)) {
        alert("Dossier clients vide ou introuvable");
        return;
    }

    const container = document.getElementById("liste-clients-cloud");
    container.innerHTML = "";

    data
        .filter(file => file.name.endsWith(".json"))
        .forEach(file => {

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

    if (!file || !file.content) {
        alert("Fichier vide ou introuvable");
        return;
    }

    try {
        const contenuDecode = atob(file.content.replace(/\n/g, ""));
        const contenu = JSON.parse(contenuDecode);

        localStorage.setItem("clientActuel", JSON.stringify(contenu));

        alert("Client chargé");
        location.reload();

    } catch (e) {
        console.error("Erreur parsing :", e);
        alert("Erreur lecture du fichier JSON");
    }
}

// ======================================================
// DERNIER CLIENT
// ======================================================

async function chargerDernierClient() {

    const data = await githubRequest("contents/clients");

    if (!data || data.length === 0) {
        alert("Aucun client trouvé");
        return;
    }

    const dernier = data
        .filter(file => file.name.endsWith(".json"))
        .sort((a, b) => b.name.localeCompare(a.name))[0];

    if (dernier) {
        chargerClientDepuisCloud(dernier.path);
    }
}

// ======================================================
// RECHERCHE CLIENT
// ======================================================

function rechercherClientCloud() {

    const filtre = document.getElementById("recherche-client-cloud").value.toLowerCase();
    const items = document.querySelectorAll("#liste-clients-cloud div");

    items.forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(filtre) ? "block" : "none";
    });
}
