const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// ======================================================
// SERVIR LE SITE
// ======================================================

app.use(express.static(__dirname));

// PAGE PRINCIPALE
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

// TEST
app.get("/ping", (req, res) => {
    res.send("OK");
});

// ======================================================
// PORT
// ======================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("SERVEUR DEMARRÉ");
});
