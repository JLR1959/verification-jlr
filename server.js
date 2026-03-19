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

app.listen(3000, () => {
  console.log("Serveur actif sur port 3000");
});
