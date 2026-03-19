const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json({ limit: "20mb" }));

// ======================================================
// CONFIG
// ======================================================

const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;
const TOKEN = process.env.GITHUB_TOKEN;

// ======================================================
// ROUTE TEST
// ======================================================

app.get("/", (req, res) => {
    res.send("Serveur VPI actif");
});

// ======================================================
// EMAIL (SMTP)
// ======================================================

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "jlouisraymond@hotmail.com",
    pass: process.env.EMAIL_PASS
  }
});

app.post("/send-report", async (req, res) => {

  if (req.body.secret !== "Imagine2026") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {

    const info = await transporter.sendMail({
      from: "jlouisraymond@hotmail.com",
      to: req.body.destinataire,
      subject: "Rapport de Vérification Préventive",
      text: "Veuillez trouver le rapport en pièce jointe.",
      attachments: [
        {
          filename: "Rapport_Verification_Preventive.pdf",
          content: req.body.pdfBase64,
          encoding: "base64"
        }
      ]
    });

    console.log("Email envoyé :", info.response);

    res.json({ message: "Email envoyé" });

  } catch (error) {
    console.error("Erreur SMTP :", error);
    res.status(500).json({ message: "Erreur envoi" });
  }

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

    const path = `clients/${client.id}.json`;

    try {

        const response = await fetch(
            `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
            {
                method: "PUT",
                headers: {
                    "Authorization": `token ${TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: "Sauvegarde client",
                    content: contenu
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

    const path = req.query.path;

    if (!path) {
        return res.status(400).json({ error: "path manquant" });
    }

    try {

        const response = await fetch(
            `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`
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
    console.log("Serveur VPI actif sur port", PORT);
});
