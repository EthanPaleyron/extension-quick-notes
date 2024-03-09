const notepadList = document.querySelector("#notepadList");
const inputTitle = document.querySelector("#inputTitle");
const inputNotes = document.querySelector("#inputNotes");
const buttonTitle = document.querySelector("#buttonTitle");
let idNotepadSelected = 0;
let lastClicked;

showData();

// Selectionne le bloc-note dernierement utiliser par l'utilisateur
const lastButtonSelected = document.querySelector(
  `#notepadList li button[id="${idNotepadSelected}"]`
);

if (lastButtonSelected) {
  inputTitle.value = document.querySelector(
    "#title_" + idNotepadSelected
  ).value;
  const inputHidden = document.querySelector("#title_" + idNotepadSelected);
  const buttonTitle = document.querySelector("#buttonTitle > h2");
  // Vérification si le champ est vide, dans ce cas, le nommer "Untitled" + id
  if (inputHidden.value.trim() === "") {
    buttonTitle.textContent = "Add title";
  } else {
    buttonTitle.textContent = inputTitle.value;
  }
  inputNotes.value = document.querySelector(
    "#notes_" + idNotepadSelected
  ).value;
  lastButtonSelected.style.backgroundColor = "#aaa";
}

// Ajoute un gestionnaire d'événements pour touts les boutons
const buttons = document.querySelectorAll("#notepadList li button");
buttons.forEach((button) => {
  // Si il n'est pas egale au bouton selectionner on le mets transparent
  if (button.id !== idNotepadSelected) {
    button.style.backgroundColor = "transparent";
  } else {
    lastClicked = button;
  }
  button.addEventListener("click", () => {
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
    // Si il la pas de titre on nomme le bouton = "Add title"
    if (inputTitle.value.trim() === "") {
      document.querySelector("#buttonTitle h2").textContent = "Add title";
    }
    saveLastIdSelected();
  });
});

// Rajoute un bloc-note automatiquement s'il n'y en a pas
if (notepadList.children.length === 0) {
  idNotepadSelected = 0;
  notepadList.innerHTML += createNotepadElement(0);
  const firstButton = document.querySelector("#notepadList li button");
  if (firstButton) {
    firstButton.style.backgroundColor = "#aaa";
  }
  saveData();
  saveLastIdSelected();
}

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
  idNotepadSelected = idNotepadSelected;
  saveData();
  saveLastIdSelected();

  // Ajoute un gestionnaire d'événements pour touts les boutons
  const buttons = document.querySelectorAll("#notepadList li button");
  buttons.forEach((button, i) => {
    button.style.backgroundColor = "transparent";
    button.addEventListener("click", () => {
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
      // Si il la pas de titre on nomme le bouton = "Add title"
      if (inputTitle.value.trim() === "") {
        document.querySelector("#buttonTitle h2").textContent = "Add title";
      }
      console.log(idNotepadSelected);
      saveLastIdSelected();
    });
    if (i === buttons.length - 1) {
      button.style.backgroundColor = "#aaa";
      lastClicked = button;
    }
  });
  document.querySelector(
    "#notepadList button#" + idNotepadSelected
  ).style.backgroundColor = "#aaa";
  saveData();
  saveLastIdSelected();
});

// Suppression d'un bloc-note
document.querySelector("#deleteNotepad").addEventListener("click", () => {
  const notepadList = document.querySelector("#notepadList");
  const notepads = document.querySelectorAll("#notepadList li");
  // On supprime le bloc-note selectionner
  document.querySelector(`li[id="${idNotepadSelected}"`).remove();

  // Si la liste de bloc-note est vide on en recrée une
  if (notepadList.children.length === 0) {
    idNotepadSelected = 0;
    inputTitle.value = "";
    inputNotes.value = "";
    document.querySelector("#buttonTitle h2").textContent = "Add title";
    notepadList.innerHTML += createNotepadElement(0);
    const firstButton = document.querySelector("#notepadList li button");
    if (firstButton) {
      firstButton.style.backgroundColor = "#aaa";
    }
  } else {
    // Va rechercher l'id le plus grand entre le bloc-note qui a été supprimer
    let biggerNotepad = 0;
    notepads.forEach((notepad) => {
      if (idNotepadSelected > notepad.id) {
        // Si l'id du notepad supprimer est plus grand que l'un des notepad
        if (notepad.id < idNotepadSelected && notepad.id > biggerNotepad) {
          biggerNotepad = notepad.id;
          lastClicked = document.querySelector(
            "#notepadList li button[id='" + notepad.id + "']"
          );
        }
      } else {
        if (notepad.id > idNotepadSelected && notepad.id > biggerNotepad) {
          biggerNotepad = notepad.id;
          lastClicked = document.querySelector(
            "#notepadList li button[id='" + notepad.id + "']"
          );
        }
      }
    });
    idNotepadSelected = biggerNotepad;
    const button = document.querySelector(
      "li > button[id='" + idNotepadSelected + "']"
    );
    button.style.backgroundColor = "#aaa";
    inputTitle.value = document.querySelector(
      "#title_" + idNotepadSelected
    ).value;
    document.querySelector("#buttonTitle h2").textContent =
      document.querySelector("#title_" + idNotepadSelected).value;
    inputNotes.value = document.querySelector(
      "#notes_" + idNotepadSelected
    ).value;
    // Si il la pas de titre on nomme le bouton = "Add title"
    if (inputTitle.value.trim() === "") {
      document.querySelector("#buttonTitle h2").textContent = "Add title";
    }
  }
  saveData();
  saveLastIdSelected();
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
    notepadTitle.textContent = "Untitled " + idNotepadSelected;
    buttonTitle.textContent = "Add title";
  } else {
    buttonTitle.textContent = inputTitle.value;
    notepadTitle.textContent = inputTitle.value;
  }
  saveData();
});

// Écoute de l'entrée de texte pour les notes
inputNotes.addEventListener("input", () => {
  const notesHidden = document.querySelector("#notes_" + idNotepadSelected);
  notesHidden.value = inputNotes.value;
  saveData();
});

// Fonction pour créer un élément de bloc-notes
function createNotepadElement(id) {
  return `<li id="${id}">
      <button id="${id}">
          <input type="hidden" id="title_${id}" value="">
          <input type="hidden" id="notes_${id}" value="">
          <span id="notepadTitle_${id}">Untitled ${id}</span>
      </button>
  </li>`;
}

function eventTitle(button, title) {
  buttonTitle.style.display = button;
  inputTitle.style.display = title;
}

function saveData() {
  localStorage.setItem("notepadList", notepadList.innerHTML);
}

function saveLastIdSelected() {
  localStorage.setItem("saveLastIdSelected", idNotepadSelected);
}

function showData() {
  notepadList.innerHTML = localStorage.getItem("notepadList");
  idNotepadSelected = localStorage.getItem("saveLastIdSelected");
}
