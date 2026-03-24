const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({ limit: "20mb" }));

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "jlouisraymond@hotmail.com",
    pass: "MOT_DE_PASSE_APPLICATION"
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

/* ======================================================
MODULE 11
COMPTEUR JOURNALIER (FINAL STABLE)
====================================================== */

let statsJournalieres = {};

function dateAujourdhui(){
  const d = new Date();
  return d.getFullYear() + "-" +
         String(d.getMonth()+1).padStart(2,"0") + "-" +
         String(d.getDate()).padStart(2,"0");
}

// ➜ incrémenter
app.post("/stats/increment", (req,res)=>{

  const date = dateAujourdhui();

  if(!statsJournalieres[date]){
    statsJournalieres[date] = 0;
  }

  statsJournalieres[date]++;

  console.log("📊 Vérification comptabilisée :", date, statsJournalieres[date]);

  res.json({
    ok:true,
    date,
    total:statsJournalieres[date]
  });
});

// ➜ toutes les stats
app.get("/stats", (req,res)=>{
  res.json(statsJournalieres);
});

// ➜ stats du jour
app.get("/stats/today", (req,res)=>{
  const date = dateAujourdhui();
  res.json({
    date,
    total: statsJournalieres[date] || 0
  });
});
