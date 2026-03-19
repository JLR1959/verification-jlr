// ======================================================
// MODULE 11 — GITHUB CLOUD VIA RENDER (VERSION FINALE)
// ======================================================

// ======================================================
// CONFIG
// ======================================================

const API_URL = "https://verification-jlr.onrender.com";

// ======================================================
// SAUVEGARDE CLIENT
// ======================================================

async function envoyerClientGitHub(){

    const client = JSON.parse(localStorage.getItem("clientActuel"));

    if(!client){
        alert("Aucun client actif");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/github/save-client`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(client)
        });

        const data = await response.json();

        if(response.ok){
            alert("Client sauvegardé sur GitHub");
        } else {
            alert("Erreur : " + (data.error || "échec"));
        }

    } catch(e){
        console.error("Erreur réseau :", e);
        alert("Erreur connexion serveur");
    }
}

// ======================================================
// SAUVEGARDE RAPPORT
// ======================================================

async function envoyerRapportGitHub(){

    const rapport = document.getElementById("rapport-impression");

    if(!rapport){
        alert("Rapport introuvable");
        return;
    }

    const html = rapport.innerHTML;

    const client = JSON.parse(localStorage.getItem("clientActuel")) || {};
    const nom = "rapport_" + (client.id || Date.now()) + ".html";

    try {

        const response = await fetch(`${API_URL}/github/save-client`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: nom,
                type: "rapport",
                contenu: html
            })
        });

        const data = await response.json();

        if(response.ok){
            alert("Rapport sauvegardé");
        } else {
            alert("Erreur rapport : " + (data.error || "échec"));
        }

    } catch(e){
        console.error(e);
        alert("Erreur envoi rapport");
    }
}

// ======================================================
// LISTE CLIENTS
// ======================================================

async function chargerListeClientsCloud(){

    try {

        const response = await fetch(`${API_URL}/github/clients`);
        const data = await response.json();

        const container = document.getElementById("liste-clients-cloud");

        if(!container){
            console.warn("Container liste introuvable");
            return;
        }

        container.innerHTML = "";

        if(!Array.isArray(data)){
            container.innerHTML = "Aucun client";
            return;
        }

        data
            .filter(file => file.name && file.name.endsWith(".json"))
            .forEach(file => {

                const div = document.createElement("div");
                div.textContent = file.name;
                div.style.cursor = "pointer";
                div.style.padding = "6px";
                div.style.borderBottom = "1px solid #ddd";

                div.onclick = () => chargerClientDepuisCloud(file.path);

                container.appendChild(div);
            });

    } catch(e){
        console.error(e);
        alert("Erreur chargement liste");
    }
}

// ======================================================
// CHARGER CLIENT
// ======================================================

async function chargerClientDepuisCloud(path){

    if(!path){
        alert("Chemin invalide");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/github/client?path=${encodeURIComponent(path)}`);
        const file = await response.json();

        if(!file || !file.content){
            alert("Fichier vide");
            return;
        }

        const contenu = JSON.parse(atob(file.content.replace(/\n/g, "")));

        localStorage.setItem("clientActuel", JSON.stringify(contenu));

        alert("Client chargé");

        location.reload();

    } catch(e){
        console.error(e);
        alert("Erreur chargement client");
    }
}

// ======================================================
// DERNIER CLIENT
// ======================================================

async function chargerDernierClient(){

    try {

        const response = await fetch(`${API_URL}/github/clients`);
        const data = await response.json();

        if(!Array.isArray(data) || data.length === 0){
            alert("Aucun client");
            return;
        }

        const fichiers = data
            .filter(f => f.name.endsWith(".json"))
            .sort((a, b) => b.name.localeCompare(a.name));

        if(fichiers.length === 0){
            alert("Aucun fichier client");
            return;
        }

        chargerClientDepuisCloud(fichiers[0].path);

    } catch(e){
        console.error(e);
        alert("Erreur chargement dernier client");
    }
}

// ======================================================
// RECHERCHE
// ======================================================

function rechercherClientCloud(){

    const filtre = document.getElementById("recherche-client-cloud")?.value.toLowerCase() || "";

    const items = document.querySelectorAll("#liste-clients-cloud div");

    items.forEach(item => {

        const texte = item.textContent.toLowerCase();

        item.style.display = texte.includes(filtre) ? "block" : "none";

    });
}
