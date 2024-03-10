const inputTitle = document.querySelector("#inputTitle");
const inputNotes = document.querySelector("#inputNotes");
document.querySelector("#downloadNotepad").addEventListener("click", () => {
  if (inputNotes.value.trim() !== "") {
    // Créer un blob contenant le les note du bloc-note
    const blob = new Blob([inputNotes.value], {
      type: "text/plain;charset=utf-8",
    });
    // Créer l'url a partir du blob
    const url = window.URL.createObjectURL(blob);
    // Créer un élément 'a' pour le téléchargement
    const a = document.createElement("a");
    a.href = url;
    a.download = `${inputTitle.value}.txt`;
    document.body.appendChild(a);
    // Simuler un clic sur le lien pour démarrer le téléchargement
    a.click();
    // Nettoyer l'URL créé après le téléchargement
    window.URL.revokeObjectURL(url);
  }
});
