const url = "https://personertest-e471.restdb.io/rest/persongallari";
const template = document.querySelector("template").content;
const main = document.querySelector("#indhold");
const options = {
  headers: {
    "x-apikey": "63088bc91635890a326f6961",
  },
};

async function hentData() {
  const respons = await fetch(url, options);
  const json = await respons.json();

  vis(json);
}

function vis(json) {
  console.log(json);
  json.forEach((person) => {
    const klon = template.cloneNode(true);
    console.log("KLON", klon);
    console.log("person.efternavn", person.efternavn);
    klon.querySelector(".fornavn").textContent = person.efternavn;
    klon.querySelector("img").src = "billeder/faces/" + person.billede;
    klon.querySelector(".titel").textContent = person.titel;
    klon.querySelector(".hobby").textContent = person.hobby;
    klon.querySelector(".email").textContent = person.email;
    klon.querySelector(".foedselsdag").textContent = person.foedselsdag;
    klon.querySelector(".troende").textContent = person.troende;
    main.appendChild(klon);
  });
}

hentData();
