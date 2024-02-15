const closeAside = document.querySelector("#closeAside");
const aside = document.querySelector(".aside");
const main = document.querySelector(".main");
const body = document.querySelector("main");

closeAside.addEventListener("click", () => {
  if (aside.style.display !== "none") {
    closeAside.style.transform = "rotate(180deg)";
    aside.style.display = "none";
    main.style.width = "100%";
  } else {
    closeAside.style.transform = "rotate(0deg)";
    aside.style.display = "flex";
    main.style.width = "60%";
  }
});
