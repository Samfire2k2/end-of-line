const chapters = [
  {
    visual: "leaf",
    title: "Entre les pages",
    text: [
      `Le livre est tombé de l’étagère un mardi de novembre, alors que je rangeais la librairie de ma grand-mère. Il s’est ouvert tout seul, comme on ouvre les bras. Entre deux pages, une feuille de <strong><mark data-note="sauge">sauge</mark></strong> séchée, grise et fragile, avait gardé la forme exacte de sa main.`,
      `Elle en glissait partout. Dans les romans, dans les carnets, dans les poches de ses tabliers. « Pour que les livres respirent », disait-elle. Je croyais à une manie. Je comprends aujourd’hui qu’elle posait des repères, des petites balises végétales pour retrouver son chemin dans sa propre vie.`
      `J’ai approché la feuille de mon visage. Le parfum était intact, poivré, un peu amer, et il a fait ce que seules les odeurs savent faire : il a ouvert une porte que je croyais murée. J’ai revu la cuisine aux carreaux jaunes, le thé qui fumait, sa voix qui lisait à haute voix pendant que la pluie battait les vitres. Les <strong><mark data-note="souvenirs">souvenirs</mark></strong> ne sont pas arrivés en file ordonnée. Ils sont montés d’un bloc, comme une marée, et je me suis assis par terre au milieu des cartons.`,
      `Alors la <strong><mark data-note="mélancolie">mélancolie</mark></strong> est entrée. Je l’ai reconnue sans peine, c’est une vieille cliente. Elle ne frappe jamais, elle s’installe au fond de la boutique et feuillette les rayons sans rien acheter. Longtemps, j’ai voulu la mettre dehors. Ce soir-là, j’ai compris qu’elle n’était pas la contraire de la joie, seulement sa mémoire : ce qui reste de la lumière quand le soleil est passé de l’autre côté de la maison.`,
      `Sur la page, face à la feuille, un vers que grand-mère avait souligné au crayon, d’une main tremblante. Je n’ai pas osé le recopier ici. Il disait en substance que ce qui a été aimé ne disparaît pas, et qu’il change simplement de saison. C’est cela, sans doute, la <strong><mark data-note="poésie">poésie</mark></strong> : un endroit où l’on peut déposer ce qui ne tient nulle part ailleurs.`,
      `J’ai refermé le livre avec précaution, en remettant la sauge à sa place. Puis j’ai posé le livre en vitrine, sous la lampe, avec une petite étiquette de ma main.`,
      `<em>Ne pas vendre. À lire un jour de pluie.</em>`
    ]
  }
];

const notes = {
  sauge: "Une plante fragile. Une odeur verte. Une main devenue trace.",
  souvenirs: "Ils ne viennent pas en file ordonnée. Ils montent d’un bloc.",
  mélancolie: "Elle n’est pas le contraire de la joie. Elle en garde la mémoire.",
  poésie: "Ce qui ne tient nulle part ailleurs trouve ici sa place."
};

const archive = document.getElementById("archive");
const landing = document.getElementById("landing");
const story = document.getElementById("story");
const chaptersContainer = document.getElementById("chapters");
const contextObjects = document.getElementById("contextObjects");
const annotation = document.getElementById("annotation");
const annotationText = document.getElementById("annotationText");

function renderContextObject(chapter) {
  if (chapter.visual === "leaf") {
    return `<div class="context-leaf"><i></i><b></b><em></em></div>`;
  }
  if (chapter.visual === "door") {
    return `<div class="context-door"></div>`;
  }
  if (chapter.visual === "rain") {
    return `<div class="context-rain"></div>`;
  }
  if (chapter.visual === "page") {
    return `<div class="context-page"></div>`;
  }
  return `<div class="context-note">Ne pas vendre.<br>À lire un jour de pluie.</div>`;
}

chapters.forEach((chapter, index) => {
  const passage = document.createElement("div");
  passage.className = "passage";
  passage.id = `passage-${index + 1}`;
  passage.dataset.chapter = String(index);
  passage.innerHTML = `
    ${index === 0 ? `<h2>${chapter.title}</h2>` : `<h3>${chapter.title}</h3>`}
    ${chapter.text.map(paragraph => `<p>${paragraph}</p>`).join("")}`;
  chaptersContainer.appendChild(passage);

  const object = document.createElement("div");
  object.className = "context-object";
  object.dataset.chapter = String(index);
  object.innerHTML = renderContextObject(chapter);
  contextObjects.appendChild(object);
});

document.getElementById("enter").addEventListener("click", () => {
  landing.classList.add("exit");
  setTimeout(() => {
    landing.hidden = true;
    story.hidden = false;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, 500);
});

document.getElementById("identity").addEventListener("click", () => {
  story.hidden = true;
  landing.hidden = false;
  landing.classList.remove("exit");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("closeAnnotation").addEventListener("click", () => {
  annotation.hidden = true;
});

chaptersContainer.addEventListener("click", event => {
  const mark = event.target.closest("mark[data-note]");
  if (!mark) return;
  annotationText.textContent = notes[mark.dataset.note];
  annotation.hidden = false;
});

document.getElementById("environment").addEventListener("click", event => {
  const button = event.currentTarget;
  const active = button.getAttribute("aria-pressed") !== "true";
  button.setAttribute("aria-pressed", String(active));
  archive.classList.toggle("rain", active);
  button.querySelector("span").textContent = active ? "01" : "00";
});

function setActiveChapter(index) {
  contextObjects.querySelectorAll(".context-object").forEach((object, i) => {
    object.classList.toggle("active", i === index);
  });
}

const chapterObserver = new IntersectionObserver(entries => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActiveChapter(Number(visible.target.dataset.chapter));
}, {
  rootMargin: "-20% 0px -45% 0px",
  threshold: [0.15, 0.35, 0.55]
});

document.querySelectorAll(".passage").forEach(passage => chapterObserver.observe(passage));
setActiveChapter(0);

function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent =
    [now.getHours(), now.getMinutes(), now.getSeconds()]
      .map(value => String(value).padStart(2, "0"))
      .join(":");
}

updateClock();
setInterval(updateClock, 1000);
