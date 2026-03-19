const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
app.use(express.json({ limit: "20mb" }));

// ======================================================
// CONFIG GITHUB (RENDER ENV)
// ======================================================

const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;
const TOKEN = process.env.GITHUB_TOKEN;

// ======================================================
// SERVIR LE FRONTEND (TON LOGICIEL)
// ======================================================

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ======================================================
// GITHUB — SAUVEGARDE CLIENT
// ======================================================

app.post("/github/save-client", async (req, res) => {

    const client = req.body;

    if (!client || !client.id) {
        return res.status(400).json({ error: "client invalide" });
    }

    const contenu = Buffer.from(
        JSON.stringify(client, null, 2)
    ).toString("base64");

    const pathFile = `clients/${client.id}.json`;

    try {

        // vérifier si fichier existe (pour update)
        let sha = undefined;

        const check = await fetch(
            `https://api.github.com/repos/${OWNER}/${REPO}/contents/${pathFile}`,
            {
                headers: {
                    "Authorization": `token ${TOKEN}`
                }
            }
        );

        if (check.ok) {
            const exist = await check.json();
            sha = exist.sha;
        }

        // sauvegarde
        const response = await fetch(
            `https://api.github.com/repos/${OWNER}/${REPO}/contents/${pathFile}`,
            {
                method: "PUT",
                headers: {
                    "Authorization": `token ${TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: "Sauvegarde client",
                    content: contenu,
                    sha: sha
                })
            }
        );

        const data = await response.json();

        res.json(data);

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

// ======================================================
// GITHUB — LISTE CLIENTS
// ======================================================

app.get("/github/clients", async (req, res) => {

    try {

        const response = await fetch(
            `https://api.github.com/repos/${OWNER}/${REPO}/contents/clients`
        );

        const data = await response.json();

        res.json(data);

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

// ======================================================
// GITHUB — CHARGER CLIENT
// ======================================================

app.get("/github/client", async (req, res) => {

    const pathFile = req.query.path;

    if (!pathFile) {
        return res.status(400).json({ error: "path manquant" });
    }

    try {

        const response = await fetch(
            `https://api.github.com/repos/${OWNER}/${REPO}/contents/${pathFile}`
        );

        const data = await response.json();

        res.json(data);

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

// ======================================================
// PORT RENDER
// ======================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Serveur VPI complet actif sur port", PORT);
});
