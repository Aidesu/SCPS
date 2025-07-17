// ######## Declaration des leds from HTML
const radled = document.getElementById("RadLed");
const prled = document.getElementById("PrLed");
const co2led = document.getElementById("Co2Led");
const airled = document.getElementById("AirLed")
const templed = document.getElementById("TempLed");

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
                radled.classList.add("blinkDanger");
                //######## Sinon si la valeur attendu est inferieur au radiation minimum alors lancers la fonctions led dans alertes
            } else if (val < capteurs.radiation.seuils.min) {
                alertes.led("Radiation", "LED contrôle radiation (niveau bas)");
                radled.classList.add("blinkMtc");
            } else {
                logOK("Radiation dans la plage normale.");
                radled.classList.add("staticGreen");
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
                prled.classList.add("blinkDanger");
            } else {
                logOK("Niveau de particules fines normal.");
                prled.classList.add("staticGreen");
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
                co2led.classList.add("blinkDanger");
            } else if (val > capteurs.CO2.seuils.normal) {
                alertes.led("CO2", "LED CO2 anormal");
                co2led.classList.add("blinkWarning");
            } else {
                logOK("Taux de CO2 normal.");
                co2led.classList.add("staticGreen");
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
                airled.classList.add("blinkDanger");
            } else {
                logOK("Qualité de l'air acceptable.");
                airled.classList.add("staticGreen");
            }
        }
    },

    temperature: {
        label: "temperature",
        unite: "°C",
        seuils: {
            normal: 30,
            critique: 60
        },
        actions: (val) => {
            if (val > capteurs.temperature.seuils.critique) {
                alertes.generale("Niveau critique de la temperature interieur !");
                templed.classList.add("blinkDanger");
            } else if (val > capteurs.temperature.seuils.normal) {
                alertes.led("temperature", "LED temperature anormal");
                templed.classList.add("blinkWarning");
            } else {
                logOK("Taux de temperature normal.");
                templed.classList.add("staticGreen");
            }
        }
    }
};


//##### Declaration des valeurs attendu par les sensors pour des tests avant implementation des sensors

let mesures = {
    radiation: 0.6,
    particulesFines: 20,
    CO2: 700,
    qualiteAir: 70,
    temperature: 25
};

// ####################################################################################################################################
// ####################################################################################################################################

// ######## boutton radiation up down reset 
document.getElementById("RadUp").addEventListener("click", function () {
    mesures.radiation += 0.05;
    mesures.radiation = parseFloat(mesures.radiation.toFixed(2));
    capteurs.actions();
});
document.getElementById("RadDown").addEventListener("click", function () {
    if(mesures.radiation > 0 ) {
        mesures.radiation -= 0.05;
    mesures.radiation = parseFloat(mesures.radiation.toFixed(2));
    }else {
        console.log("Negative not included");
    }
});
document.getElementById("RadReset").addEventListener("click", function () {
    mesures.radiation = 0.2;
    mesures.radiation = parseFloat(mesures.radiation.toFixed(2));
});

// ######## boutton particules up down reset 
document.getElementById("PrUp").addEventListener("click", function () {
    mesures.particulesFines += 5;
    mesures.particulesFines = parseFloat(mesures.particulesFines.toFixed(0));
});
document.getElementById("PrDown").addEventListener("click", function () {
    if(mesures.particulesFines > 0 ) {
        mesures.particulesFines -= 5;
    mesures.particulesFines = parseFloat(mesures.particulesFines.toFixed(0));
    }else {
        console.log("Negative not included");
    }
});
document.getElementById("PrReset").addEventListener("click", function () {
    mesures.particulesFines = 25;
    mesures.particulesFines = parseFloat(mesures.particulesFines.toFixed(0));
});

// ######## boutton CarbonDioxide up down reset 
document.getElementById("CoUp").addEventListener("click", function () {
    mesures.CO2 += 100;
    mesures.CO2 = parseFloat(mesures.CO2.toFixed(0));
});
document.getElementById("CoDown").addEventListener("click", function () {
    if(mesures.CO2 > 0 ) {
        mesures.CO2 -= 100;
    mesures.CO2 = parseFloat(mesures.CO2.toFixed(0));
    }else {
        console.log("Negative not included");
    }
});
document.getElementById("CoReset").addEventListener("click", function () {
    mesures.CO2 = 700;
    mesures.CO2 = parseFloat(mesures.CO2.toFixed(0));
});

// ######## boutton Air quality up down reset 
document.getElementById("AirUp").addEventListener("click", function () {
    mesures.qualiteAir += 5;
    mesures.qualiteAir = parseFloat(mesures.qualiteAir.toFixed(0));
});
document.getElementById("AirDown").addEventListener("click", function () {
    if(mesures.qualiteAir > 0 ) {
        mesures.qualiteAir -= 5;
    mesures.qualiteAir = parseFloat(mesures.qualiteAir.toFixed(0));
    }else {
        console.log("Negative not included");
    }
});
document.getElementById("AirReset").addEventListener("click", function () {
    mesures.qualiteAir = 70;
    mesures.qualiteAir = parseFloat(mesures.qualiteAir.toFixed(0));
});

// ######## boutton Temperature up down reset 
document.getElementById("TempUp").addEventListener("click", function () {
    mesures.temperature += 1;
    mesures.temperature = parseFloat(mesures.temperature.toFixed(0));
    capteurs.actions();
});
document.getElementById("TempDown").addEventListener("click", function () {
    if(mesures.temperature > 0 ) {
        mesures.temperature -= 1;
    mesures.temperature = parseFloat(mesures.temperature.toFixed(0));
    }else {
        console.log("Negative not included");
    }
});
document.getElementById("TempReset").addEventListener("click", function () {
    mesures.temperature = 25;
    mesures.temperature = parseFloat(mesures.temperature.toFixed(0));
});

// ####### boutton NUKE

document.getElementById("NukeBtn").addEventListener("click", function (){
    const nukeBtn = document.getElementById("NukeBtn");
    nukeBtn.classList.add("activeNukeBtn");
(function loop() {
  setTimeout(() => {
    
    let plutonium = 3.8;
    let iradiation = 2.7;
    mesures.radiation += plutonium;
    mesures.radiation = parseFloat(mesures.radiation.toFixed(2));
    if(mesures.radiation >= 60){
        mesures.particulesFines += iradiation;
        mesures.particulesFines = parseFloat(mesures.particulesFines.toFixed(0));
        mesures.qualiteAir += iradiation;
        mesures.qualiteAir = parseFloat(mesures.qualiteAir.toFixed(0));
        mesures.temperature += 0.4;
        mesures.temperature = parseFloat(mesures.temperature.toFixed(0));
    }

    loop();
  }, 500);
})();

});


// ####################################################################################################################################
// ####################################################################################################################################

// ###### loop delay 1s 
//###### Affichage des donnes recu par les sensor sur le HTML
(function loop() {
  setTimeout(() => {
    document.getElementById("RadiationLevel").innerHTML = (mesures.radiation) + "  " + (capteurs.radiation.unite);
    document.getElementById("FineParticules").innerHTML = (mesures.particulesFines) + " " + (capteurs.particulesFines.unite);
    document.getElementById("CarbonDioxide").innerHTML = (mesures.CO2) + "  " + (capteurs.CO2.unite);
    document.getElementById("AirQuality").innerHTML = (mesures.qualiteAir) + "  " + (capteurs.qualiteAir.unite);
    document.getElementById("TempLevel").innerHTML = (mesures.temperature) + " " + (capteurs.temperature.unite);
    loop();
  }, 500);
})();


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
