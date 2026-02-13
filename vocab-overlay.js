const pairs = [
  { zh: "ni hao", es: "Hola" },
  { zh: "ni hao ma", es: "\u00bfC\u00f3mo est\u00e1s?" },
  { zh: "wo hen hao", es: "Yo estoy muy bien" },
  { zh: "xie xie", es: "Gracias" },
  { zh: "ni ne", es: "\u00bfY t\u00fa?" },
  { zh: "zai jian", es: "Adi\u00f3s" }
];

const chinoCell = document.getElementById("chino");
const espanolCell = document.getElementById("espanol");
const lowerThird = document.querySelector(".lower-third");

let index = 0;

function renderPair(i, animate = false) {
  if (!chinoCell || !espanolCell) return;
  const entry = pairs[i];
  if (!entry) return;

  if (animate) {
    chinoCell.classList.add("is-changing");
    espanolCell.classList.add("is-changing");
    window.setTimeout(() => {
      chinoCell.textContent = entry.zh;
      espanolCell.textContent = entry.es;
      chinoCell.classList.remove("is-changing");
      espanolCell.classList.remove("is-changing");
    }, 170);
    return;
  }

  chinoCell.textContent = entry.zh;
  espanolCell.textContent = entry.es;
}

function nextPair() {
  index = (index + 1) % pairs.length;
  renderPair(index, true);
}

function previousPair() {
  index = (index - 1 + pairs.length) % pairs.length;
  renderPair(index, true);
}

function toggleLowerThird() {
  if (!lowerThird) return;
  lowerThird.classList.toggle("is-visible");
}

window.addEventListener("keydown", (event) => {
  if (event.code === "KeyH" || event.key.toLowerCase() === "h") {
    event.preventDefault();
    toggleLowerThird();
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    nextPair();
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    previousPair();
  }
});

renderPair(index);
