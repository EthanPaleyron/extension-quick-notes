const textarea = document.querySelector("textarea");
const texts = document.querySelectorAll("*:not(i):not(#fontFamily > option)");
const fontSizeText = document.querySelector("#fontSizeText");
const fontFamily = document.querySelector("#fontFamily");
const automaticCreateNotepad = document.querySelector(
  "#automaticCreateNotepad"
);
let sizeValue = 0;
const sizeMin = 13;
const sizeMax = 25;

// Fonction pour mettre à jour la taille de la police et la famille de police dans le stockage local
function updateLocalStorage(checkbox) {
  localStorage.setItem("fontSize", fontSizeText.textContent);
  localStorage.setItem("fontFamily", fontFamily.value);
  localStorage.setItem("automaticCreateNotepad", checkbox);
}

// Charger les valeurs du stockage local s'ils existent
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("fontSize")) {
    fontSizeText.textContent = localStorage.getItem("fontSize");
    textarea.style.fontSize = `${fontSizeText.textContent}px`;
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
  if (localStorage.getItem("automaticCreateNotepad")) {
    automaticCreateNotepad.checked =
      localStorage.getItem("automaticCreateNotepad") === "true";
  }
});

// Changement de la taille du texte
document.querySelector("#less").addEventListener("click", () => {
  if (fontSizeText.textContent > sizeMin) {
    sizeValue = fontSizeText.textContent;
    sizeValue--;
    fontSizeText.textContent = sizeValue;
    textarea.style.fontSize = `${sizeValue}px`;
    updateLocalStorage();
  } else {
    fontSizeText.textContent = sizeMin;
    textarea.style.fontSize = `${sizeMin}px`;
    updateLocalStorage();
  }
});

document.querySelector("#more").addEventListener("click", () => {
  if (fontSizeText.textContent < sizeMax) {
    sizeValue = fontSizeText.textContent;
    sizeValue++;
    fontSizeText.textContent = sizeValue;
    textarea.style.fontSize = `${sizeValue}px`;
    updateLocalStorage();
  } else {
    fontSizeText.textContent = sizeMax;
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

// Changement de la personalisation de la creation automatique de bloc-note
let itAuto = true;
automaticCreateNotepad.addEventListener("change", function () {
  if (automaticCreateNotepad.checked) {
    itAuto = true;
  } else {
    itAuto = false;
  }
  updateLocalStorage(this.checked);
});

// Réinitialiser les paramètres par défaut
document
  .querySelector("#resetDefaultSettings")
  .addEventListener("click", () => {
    fontSizeText.textContent = sizeMin;
    textarea.style.fontSize = `${sizeMin}px`;
    fontFamily.value = "Roboto";
    texts.forEach((text) => {
      text.style.fontFamily = `"${fontFamily.value}", sans-serif`;
    });
    localStorage.removeItem("fontSize");
    localStorage.removeItem("fontFamily");
  });
