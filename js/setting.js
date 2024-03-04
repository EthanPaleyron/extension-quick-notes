const textarea = document.querySelector("textarea");
const texts = document.querySelectorAll("body, input, textarea");
const fontSizeText = document.querySelector("#fontSizeText");
const fontFamily = document.querySelector("#fontFamily");
const sizeMin = 13;
const sizeMax = 25;

// Fonction pour mettre à jour la taille de la police et la famille de police dans le stockage local
function updateLocalStorage() {
  localStorage.setItem("fontSize", fontSizeText.value);
  localStorage.setItem("fontFamily", fontFamily.value);
}

// Charger les valeurs du stockage local s'ils existent
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("fontSize")) {
    fontSizeText.value = localStorage.getItem("fontSize");
    textarea.style.fontSize = `${fontSizeText.value}px`;
  } else {
    fontSizeText.value = sizeMin;
    textarea.style.fontSize = `${fontSizeText.value}px`;
  }
  if (localStorage.getItem("fontFamily")) {
    fontFamily.value = localStorage.getItem("fontFamily");
    texts.forEach((text) => {
      text.style.fontFamily = fontFamily.value;
    });
  } else {
    fontFamily.value = "Roboto";
    texts.forEach((text) => {
      text.style.fontFamily = `"${fontFamily.value}", sans-serif`;
    });
  }
});

// Changement de la taille du texte
fontSizeText.addEventListener("change", () => {
  if (fontSizeText.value > sizeMin && fontSizeText.value < sizeMax) {
    textarea.style.fontSize = `${fontSizeText.value}px`;
    updateLocalStorage();
  } else if (fontSizeText.value < sizeMin) {
    fontSizeText.value = sizeMin;
    textarea.style.fontSize = `${sizeMin}px`;
    updateLocalStorage();
  } else if (fontSizeText.value > sizeMax) {
    fontSizeText.value = sizeMax;
    textarea.style.fontSize = `${sizeMax}px`;
    updateLocalStorage();
  }
});

// Changement de la police d'écriture
fontFamily.addEventListener("change", function () {
  const selectedFont = `"${this.value}", sans-serif`;
  texts.forEach((text) => {
    text.style.fontFamily = selectedFont;
  });
  updateLocalStorage();
});

// Réinitialiser les paramètres par défaut
document
  .querySelector("#resetDefaultSettings")
  .addEventListener("click", () => {
    fontSizeText.value = sizeMin;
    textarea.style.fontSize = `${fontSizeText.value}px`;
    fontFamily.value = "Roboto";
    texts.forEach((text) => {
      text.style.fontFamily = `"${fontFamily.value}", sans-serif`;
    });
    localStorage.removeItem("fontSize");
    localStorage.removeItem("fontFamily");
  });
