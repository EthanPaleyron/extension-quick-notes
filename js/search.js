const search = document.querySelector("#search");
const logoSearch = document.querySelector("#logoSearch");
const notepadList = document.querySelectorAll("#notepadList li");

// Ajoute l'icône SVG de recherche par défaut
let svg = document.createElement("i");
svg.className = "fa-solid fa-magnifying-glass";
logoSearch.appendChild(svg);

search.addEventListener("input", () => {
  // Convertit la chaîne en minuscules et sans accent
  const searchTerm = removeAccents(search.value.toLowerCase());
  // Vérifie si le champ est vide ou pas
  if (searchTerm !== "") {
    svg.className = "fa-solid fa-xmark";
    console.log("hello");
    notepadList.forEach((notepad) => {
      const title = removeAccents(
        // Convertit la recherche tapée en minuscules et sans accent
        notepad.querySelector("span").textContent.toLowerCase()
      );
      // Vérifie si la recherche est égale à l'un des titres d'un bloc-notes et retire ceux qui ne sont pas égaux
      if (title.startsWith(searchTerm)) {
        notepad.style.display = "flex";
      } else {
        notepad.style.display = "none";
      }
    });
  } else {
    // Réinitialise la liste par défaut
    notepadList.forEach((notepad) => {
      notepad.style.display = "flex";
    });
    svg.className = "fa-solid fa-magnifying-glass";
  }
});

// Réinitialise la liste par défaut si on clique sur la croix
logoSearch.addEventListener("click", () => {
  search.value = "";
  svg.className = "fa-solid fa-magnifying-glass";
  notepadList.forEach((notepad) => {
    notepad.style.display = "flex";
  });
});

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
