const url = "https://persongalleri-5d3e.restdb.io/rest/persongalleri";
const template = document.querySelector("template").content;
const main = document.querySelector("#indhold");
const header = document.querySelector(" h1");
const options = {
  headers: {
    "x-apikey": "600fe9211346a1524ff12e31",
  },
};

document.addEventListener("DOMContentLoaded", start);
let personer;
let filter = "alle";

function start() {
  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerPersoner));
  hentData();
}

function filtrerPersoner() {
  filter = this.dataset.troende;
  console.log(this.textContent);
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  header.textContent = this.textContent;
  vis();
}

async function hentData() {
  const respons = await fetch(url, options);
  // const json = await respons.json();

  personer = await respons.json();
  console.log("personer ", personer);
  vis();
  // vis(json);
}

function vis() {
  // console.log(json);
  main.textContent = "";
  personer.forEach((person) => {
    if (filter == person.troende || filter == "alle") {
      const klon = template.cloneNode(true);

      klon.querySelector(".fornavn").textContent = person.efternavn;
      klon.querySelector("img").src = "billeder/faces/" + person.billede;
      klon.querySelector(".titel").textContent = person.titel;
      klon.querySelector(".hobby").textContent = person.hobby;
      klon.querySelector(".email").textContent = person.email;
      klon.querySelector(".foedselsdag").textContent = person.fødselsdag;
      klon.querySelector(".troende").textContent = person.troende;

      klon.querySelector("article").addEventListener("click", () => visDetaljer(person));

      main.appendChild(klon);
    }
  });
}

function visDetaljer(person) {
  // console.log(person);
  popup.style.display = "block";
  popup.querySelector("img").src = "billeder/faces/" + person.billede;
  popup.querySelector("h2").textContent = person.fornavn + " " + person.efternavn;
  popup.querySelector(".titel").textContent = person.titel;
  popup.querySelector(".email").textContent = person.email;
  popup.querySelector(".fdag").textContent = person.fødselsdag;
  popup.querySelector(".hobby").textContent = person.hobby;
  popup.querySelector(".tro").textContent = person.troende;
}

document.querySelector("#luk").addEventListener("click", () => (popup.style.display = "none"));

hentData();
