// ======================================================
// CONFIG
// ======================================================

const API_URL = "https://verification-jlr.onrender.com";

// ======================================================
// SAUVEGARDE CLIENT
// ======================================================

async function envoyerClientGitHub(){

    console.log("CLICK sauvegarde");

    const client = JSON.parse(localStorage.getItem("clientActuel"));

    if(!client){
        alert("Aucun client actif");
        return;
    }

    try {

        const response = await fetch(API_URL + "/github/save-client", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(client)
        });

        const text = await response.text(); // 🔴 IMPORTANT

        console.log("RESPONSE:", text);

        let data;
        try {
            data = JSON.parse(text);
        } catch {
            alert("Erreur serveur (pas JSON)");
            return;
        }

        if(response.ok){
            alert("Client sauvegardé");
        } else {
            alert("Erreur : " + (data.error || text));
        }

    } catch(e){
        console.error(e);
        alert("Erreur connexion serveur");
    }
}

// ======================================================
// LISTE CLIENTS
// ======================================================

async function chargerListeClientsCloud(){

    try {

        const response = await fetch(API_URL + "/github/clients");

        const text = await response.text();
        console.log(text);

        const data = JSON.parse(text);

        const container = document.getElementById("liste-clients-cloud");
        container.innerHTML = "";

        data.forEach(file => {

            const div = document.createElement("div");
            div.textContent = file.name;
            div.style.cursor = "pointer";

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

    try {

        const response = await fetch(API_URL + "/github/client?path=" + encodeURIComponent(path));

        const text = await response.text();
        console.log(text);

        const file = JSON.parse(text);

        const contenu = JSON.parse(atob(file.content));

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

    const response = await fetch(API_URL + "/github/clients");
    const data = await response.json();

    if(data.length === 0){
        alert("Aucun client");
        return;
    }

    const dernier = data[data.length - 1];

    chargerClientDepuisCloud(dernier.path);
}

// ======================================================
// RECHERCHE
// ======================================================

function rechercherClientCloud(){

    const filtre = document.getElementById("recherche-client-cloud").value.toLowerCase();
    const items = document.querySelectorAll("#liste-clients-cloud div");

    items.forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(filtre) ? "block" : "none";
    });
}
