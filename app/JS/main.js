import "../css/style.css";

async function getData() {
  //returns a promise
  const response = await fetch("https://genshin.jmp.blue/characters");
  console.log(response.status);

  const data = await response.json();
  console.log(data.data);
  //this is unique to THIS API

  presentCharacters(data);
}
getData();

function presentCharacters(data) {
  const characterListContainer = document.querySelector("character-cont");
  characterListContainer.innerHTML = "";

  data.data.forEach((character) => {
    const nameText = character.name
      .map((name) => `<p>${name.name}: ${name.scaling}</p>`)
      .join("");

    const attackText = character.attack
      .map((attack) => `<p>${attack.name}: ${attack.amount}</p>`)
      .join("");

    const defenseText = character.defense
      .map((defense) => `<p>${defense.name}: ${defense.amount}</p>`)
      .join("");
    
    const characterHTML = `
    `
  });
}
