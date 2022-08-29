const url = "https://persongalleri-5d3e.restdb.io/rest/persongalleri";
const template = document.querySelector("template").content;
const main = document.querySelector("#indhold");
const options = {
  headers: {
    "x-apikey": "600fe9211346a1524ff12e31",
  },
};

document.addEventListener("DOMContentLoaded", start);
let personer;
let filter = "ja";

function start() {
  hentData();
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
  personer.forEach((person) => {
    if (filter == person.troende) {
      const klon = template.cloneNode(true);
      console.log("KLON", klon);
      console.log("person.efternavn", person.efternavn);
      klon.querySelector(".fornavn").textContent = person.efternavn;
      klon.querySelector("img").src = "billeder/faces/" + person.billede;
      klon.querySelector(".titel").textContent = person.titel;
      klon.querySelector(".hobby").textContent = person.hobby;
      klon.querySelector(".email").textContent = person.email;
      klon.querySelector(".foedselsdag").textContent = person.fødselsdag;
      klon.querySelector(".troende").textContent = person.troende;
      main.appendChild(klon);
    }
  });
}

hentData();
