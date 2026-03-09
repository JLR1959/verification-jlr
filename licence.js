const LICENCE_CONFIG = {

    versionLibre: true,

    cleValide: "VPIJLR-2026-PRO",

    entreprise: "",

    emailFacturation: ""

};

function licenceActive() {

    let cle = localStorage.getItem("vpijlr_licence");

    if (LICENCE_CONFIG.versionLibre === true) {

        return true;

    }

    return cle === LICENCE_CONFIG.cleValide;

}
