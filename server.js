const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// ======================================================
// SERVIR LE SITE
// ======================================================

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ======================================================
// TEST
// ======================================================

app.get("/ping", (req, res) => {
    res.json({ status: "ok" });
});

// ======================================================
// PORT
// ======================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("SERVER OK");
});
