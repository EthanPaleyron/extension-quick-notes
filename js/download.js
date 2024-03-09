const inputTitle = document.querySelector("#inputTitle");
const inputNotes = document.querySelector("#inputNotes");
const valueTitle = inputTitle.value;
const valueNotes = inputNotes.value;
document.querySelector("#downloadNotepad").addEventListener("click", () => {
  // Créer un blob contenant le texte
  const blob = new Blob([valueNotes], { type: "text/plain;charset=utf-8" });
  // Créer l'url a partir du blob
  const url = window.URL.createObjectURL(blob);
  // Créer un élément 'a' pour le téléchargement
  const a = document.createElement("a");
  a.href = url;
  a.download = `${valueTitle}.txt`;
  document.body.appendChild(a);
  // Simuler un clic sur le lien pour démarrer le téléchargement
  a.click();
  // Nettoyer l'URL créé après le téléchargement
  window.URL.revokeObjectURL(url);
});
