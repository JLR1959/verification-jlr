const express = require("express");
const path = require("path");

const app = express();

// ======================================================
// SERVIR LE SITE (RACINE)
// ======================================================

app.use(express.static(__dirname));

// PAGE PRINCIPALE
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ======================================================
// PORT
// ======================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("SERVEUR OK SUR PORT", PORT);
});
