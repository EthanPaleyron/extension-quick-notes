const notepadList = document.querySelector("#notepadList");
const inputTitle = document.querySelector("#inputTitle");
const inputText = document.querySelector("#inputText");

// Rajoute un bloc de note automatiquement s'il n'y en a pas encore
if (notepadList.children.length === 0) {
  notepadList.innerHTML = `<li><button></button></li>`;
}

// Ajoute un identifiant unique à chaque élément de la liste
notepadList.querySelectorAll("li button").forEach((notepad, i) => {
  notepad.setAttribute("id", "notepad_" + i);
  const inputHiddenTitle = document.createElement("input");
  inputHiddenTitle.type = "hidden";
  inputHiddenTitle.id = "title_" + i;
  const inputHiddenText = document.createElement("input");
  inputHiddenText.type = "hidden";
  inputHiddenText.id = "text_" + i;
  const notepadTitle = document.createElement("span");
  notepadTitle.id = "notepadTitle_" + i;
  notepadTitle.textContent = "New notepad";
  const TitleNewNotepad = document.createElement("span");
  notepadTitle.id = "notepadTitle_" + i;
  notepadTitle.textContent = "New notepad";
  notepad.appendChild(inputHiddenTitle);
  notepad.appendChild(inputHiddenText);
  notepad.appendChild(notepadTitle);
});

// copie les valeurs des champs cachés correspondants dans les champs d'entrée
let idNotepad = 0;
notepadList.querySelectorAll("li button").forEach((notepad, i) => {
  notepad.addEventListener("click", () => {
    idNotepad = i;
    const inputHiddenTitle = notepad.querySelector("#title_" + i);
    const inputHiddenText = notepad.querySelector("#text_" + i);
    inputTitle.value = inputHiddenTitle.value;
    inputText.value = inputHiddenText.value;
  });
});

document.querySelectorAll(".inputs").forEach((input) => {
  input.addEventListener("input", () => {
    const title = document.querySelector("#title_" + idNotepad);
    const text = document.querySelector("#text_" + idNotepad);
    const notepadTitle = document.querySelector("#notepadTitle_" + idNotepad);
    title.value = inputTitle.value;
    text.value = inputText.value;
    // Limite de carateres
    if (inputTitle.value.length > 20) {
      inputTitle.value = inputTitle.value.slice(0, 20);
    }
    if (inputTitle.value.trim() === "") {
      notepadTitle.textContent = inputText.value;
    } else if (inputText.value.trim() === "") {
      notepadTitle.textContent = inputTitle.value;
    } else if (
      inputTitle.value.trim() === "" &&
      inputText.value.trim() === ""
    ) {
      notepadTitle.textContent = "New notepad";
    }
  });
});
