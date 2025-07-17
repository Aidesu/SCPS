//######## Declaration des differents sensors ########
const capteurs = {
    //######## Declaration des differentes variables dans la variblea pours les valeurs en json ########
    radiation: {
        label: "Radiation",
        unite: "µSv/h",
        //######## Declaration des valeurs pour le seuils des valeurs 
        seuils: {
            min: 0.05,
            normal: 0.3
        },
        //######## fonction de la variable principal 
        actions: (val) => {
            //######## Si la valeur attendu est superieurs a a la variable normal des seuils alors lancer la fonction general dans const alertes avec le messages "Radiation trop élevée !"
            if (val > capteurs.radiation.seuils.normal) {
                alertes.generale("Radiation trop élevée !");
                //######## Sinon si la valeur attendu est inferieur au radiation minimum alors lancers la fonctions led dans alertes
            } else if (val < capteurs.radiation.seuils.min) {
                alertes.led("Radiation", "LED contrôle radiation (niveau bas)");
            } else {
                logOK("Radiation dans la plage normale.");
            }
        }
    },

    particulesFines: {
        label: "Particules fines",
        unite: "µg/m³",
        seuils: {
            normal: 35
        },
        actions: (val) => {
            if (val > capteurs.particulesFines.seuils.normal) {
                alertes.verification("Particules fines détectées.");
                alertes.led("Particules fines", "LED anomalie particules fines");
            } else {
                logOK("Niveau de particules fines normal.");
            }
        }
    },

    CO2: {
        label: "CO2",
        unite: "ppm",
        seuils: {
            normal: 800,
            critique: 1500
        },
        actions: (val) => {
            if (val > capteurs.CO2.seuils.critique) {
                alertes.generale("Niveau critique de CO2 !");
            } else if (val > capteurs.CO2.seuils.normal) {
                alertes.led("CO2", "LED CO2 anormal");
            } else {
                logOK("Taux de CO2 normal.");
            }
        }
    },

    qualiteAir: {
        label: "Qualité de l'air",
        unite: "AQI",
        seuils: {
            normal: 100
        },
        actions: (val) => {
            if (val > capteurs.qualiteAir.seuils.normal) {
                alertes.led("Air", "LED anomalie qualité de l'air");
            } else {
                logOK("Qualité de l'air acceptable.");
            }
        }
    }
};

//##### Declaration des valeurs attendu par les sensors pour des tests avant implementation des sensor

const mesures = {
    radiation: 0.4,
    particulesFines: 40,
    CO2: 1600,
    qualiteAir: 120
};

//######## Foncion qui analyse les mesures recu
function analyserMesures(mesures) {
    console.log("=== Analyse des mesures capteurs ===");
    //####### boucle et recuperation des valeurs des differents sensors 
    for (let [nom, valeur] of Object.entries(mesures)) {
        const capteur = capteurs[nom];

        console.log(`🔎 ${capteur.label}: ${valeur} ${capteur.unite}`);
        capteur.actions(valeur);
    }
    console.log("====================================\n");
}

const alertes = {
    generale: (message) => {
        console.log(`⚠️ [ALERTE GÉNÉRALE] ${message}`);
        // Ex: activer buzzer, envoyer au backend, alerte sonore
    },
    led: (type, message) => {
        console.log(`💡 [LED ACTIVÉE - ${type}] ${message}`);
        // Ex: GPIO ON
    },
    verification: (message) => {
        console.log(`🔍 [ALERTE DE VÉRIFICATION] ${message}`);
        // Ex: envoyer notification légère, log maintenance
    }
};


function logOK(message) {
    console.log(`✅ ${message}`);
}

analyserMesures(mesures);
