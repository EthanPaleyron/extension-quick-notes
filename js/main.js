const notepadList = document.querySelector("#notepadList");
const inputTitle = document.querySelector("#inputTitle");
const inputNotes = document.querySelector("#inputNotes");
const buttonTitle = document.querySelector("#buttonTitle");
let idNotepadSelected = 0;
let lastClicked;

// Rajoute un bloc-note automatiquement s'il n'y en a pas encore
if (notepadList.children.length === 0) {
  notepadList.innerHTML += createNotepadElement(0);
  const firstButton = document.querySelector("#notepadList li button");
  if (firstButton) {
    firstButton.style.backgroundColor = "#aaa";
  }
}

// Ajout des gestionnaires d'événements pour chaque bouton
document.querySelectorAll("#notepadList li button").forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button);
    if (lastClicked) {
      lastClicked.style.backgroundColor = "transparent";
    }
    button.style.backgroundColor = "#aaa";
    lastClicked = button;

    idNotepadSelected = button.id;
    inputTitle.value = document.querySelector(
      "#title_" + idNotepadSelected
    ).value;
    inputNotes.value = document.querySelector(
      "#notes_" + idNotepadSelected
    ).value;

    // Envoi des valeurs cachées à l'endroit désiré
    // Par exemple, vous pouvez les afficher dans la console
    console.log("Titre:", inputTitle.value);
    console.log("Notes:", inputNotes.value);
  });
});

// Ajoute un nouveau bloc-note
document.querySelector("#newNotepad").addEventListener("click", () => {
  inputTitle.value = "";
  inputNotes.value = "";
  document.querySelector("#buttonTitle h2").textContent = "Add title";
  inputNotes.focus();

  let maxId = -1;
  document.querySelectorAll("#notepadList button").forEach((button) => {
    const idNumber = parseInt(button.id, 10);
    if (!isNaN(idNumber) && idNumber > maxId) {
      maxId = idNumber;
    }
  });
  idNotepadSelected = maxId + 1;
  const newNotepad = createNotepadElement(idNotepadSelected);
  notepadList.innerHTML += newNotepad;
  document.querySelector(
    "#notepadList button#" + idNotepadSelected
  ).style.backgroundColor = "#aaa";

  // Ajoute un gestionnaire d'événements pour le nouveau bouton
  document
    .querySelector("#notepadList li #" + idNotepadSelected)
    .addEventListener("click", () => {
      console.log(button);
      if (lastClicked) {
        lastClicked.style.backgroundColor = "transparent";
      }
      button.style.backgroundColor = "#aaa";
      lastClicked = button;

      idNotepadSelected = button.id;
      inputTitle.value = document.querySelector(
        "#title_" + idNotepadSelected
      ).value;
      document.querySelector("#buttonTitle h2").textContent =
        document.querySelector("#title_" + idNotepadSelected).value;
      inputNotes.value = document.querySelector(
        "#notes_" + idNotepadSelected
      ).value;
    });
});

// Suppression d'un bloc-note
document.querySelector("#deleteNotepad").addEventListener("click", () => {
  console.log("haha");
  remove(document.querySelector("button#" + idNotepadSelected));
});

// Ajout ou modification du titre
buttonTitle.addEventListener("click", () => {
  eventTitle("none", "block");
  inputTitle.focus();
});

buttonTitle.addEventListener("click", () => {
  eventTitle("none", "block");
  inputTitle.focus();
});

inputTitle.addEventListener("blur", () => {
  eventTitle("flex", "none");
  inputNotes.focus();
});

inputTitle.addEventListener("keydown", (e) => {
  if (e.keyCode === 13 || e.key === "Enter") {
    e.preventDefault();
    eventTitle("flex", "none");
    inputNotes.focus();
  }
});

// Ajout ou modification du titre
inputTitle.addEventListener("input", () => {
  // Limite de 20 caractères
  if (inputTitle.value.length > 20) {
    inputTitle.value = inputTitle.value.slice(0, 20);
  }
  const titleHidden = document.querySelector("#title_" + idNotepadSelected);
  const buttonTitle = document.querySelector("#buttonTitle > h2");
  const notepadTitle = document.querySelector(
    "#notepadTitle_" + idNotepadSelected
  );
  titleHidden.value = inputTitle.value;
  // Vérification si le champ est vide, dans ce cas, le nommer "Untitled" + id
  if (inputTitle.value.trim() === "") {
    notepadTitle.textContent = "Untitled";
    buttonTitle.textContent = "Add title";
  } else {
    buttonTitle.textContent = inputTitle.value;
    notepadTitle.textContent = inputTitle.value;
  }
});

// Écoute de l'entrée de texte pour les notes
inputNotes.addEventListener("input", () => {
  const notesHidden = document.querySelector("#notes_" + idNotepadSelected);
  notesHidden.value = inputNotes.value;
});

// Fonction pour créer un élément de bloc-notes
function createNotepadElement(id) {
  return `<li>
      <button id="${id}">
          <input type="hidden" id="title_${id}" value="">
          <input type="hidden" id="notes_${id}" value="">
          <span id="notepadTitle_${id}">New notepad</span>
      </button>
  </li>`;
}

function eventTitle(button, title) {
  buttonTitle.style.display = button;
  inputTitle.style.display = title;
}
