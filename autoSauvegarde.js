// ======================================================
// MODULE 25 — SAUVEGARDE AUTO + RESTAURATION
// ======================================================

const CLE_STORAGE = "VPIJLR_AUTO_SAVE";

// ======================================================
// SAUVEGARDE
// ======================================================

function sauvegarderAutomatiquement() {

    const data = {};

    document.querySelectorAll("input, select, textarea").forEach(el => {

        if (el.type === "checkbox" || el.type === "radio") {
            data[el.id] = el.checked;
        } else {
            data[el.id] = el.value;
        }

    });

    localStorage.setItem(CLE_STORAGE, JSON.stringify(data));

    console.log("AUTO SAVE OK");
}

// ======================================================
// RESTAURATION
// ======================================================

function restaurerDonnees() {

    const data = JSON.parse(localStorage.getItem(CLE_STORAGE));

    if (!data) return;

    Object.keys(data).forEach(id => {

        const el = document.getElementById(id);

        if (!el) return;

        if (el.type === "checkbox" || el.type === "radio") {
            el.checked = data[id];
        } else {
            el.value = data[id];
        }

    });

    console.log("RESTORE OK");
}

// ======================================================
// ÉCOUTEURS AUTO
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    restaurerDonnees();

    document.querySelectorAll("input, select, textarea").forEach(el => {
        el.addEventListener("input", sauvegarderAutomatiquement);
        el.addEventListener("change", sauvegarderAutomatiquement);
    });

});
