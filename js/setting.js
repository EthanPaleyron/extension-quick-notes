const textarea = document.querySelector("textarea");
const texts = document.querySelectorAll("body, input, textarea");
const fontSizeText = document.querySelector("#fontSizeText");
const fontFamily = document.querySelector("#fontFamily");
// Les valeur de l'utilisateur
fontSizeText.value = 11;

// Changement de la taille d'du texte
const sizeMin = 11;
const sizeMax = 25;
fontSizeText.addEventListener("change", () => {
  if (fontSizeText.value > sizeMin && fontSizeText.value < sizeMax) {
    textarea.style.fontSize = `${fontSizeText.value}px`;
  } else if (fontSizeText.value < sizeMin) {
    fontSizeText.value = sizeMin;
  } else if (fontSizeText.value > sizeMax) {
    fontSizeText.value = sizeMax;
  }
});

// Changement de la police d'écriture sur tout l'app
fontFamily.addEventListener("change", function () {
  const selectedFont = `"${this.value}", sans-serif`;
  texts.forEach((text) => {
    text.style.fontFamily = selectedFont;
  });
});
