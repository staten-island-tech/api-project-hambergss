import "../css/style.css";

import "../css/style.css";

const DOMSelectors = {
  container: document.getElementById("cards-container"),
  searchBar: document.querySelector("#searchBar"),
  gameBtn: document.querySelector("#gameBtn"),
  gameTimer: document.querySelector("#gameTimer"),
  gameContainer: document.getElementById("game-container"),
};

const API_BASE = "https://genshin.jmp.blue/characters";

async function getCharacterData(character) {
  try {
    const response = await fetch(`${API_BASE}/${character}`);
    if (!response.ok)
      throw new Error(`Failed to fetch character: ${character}`);
    return await response.json();
  } catch (error) {
    alert("Character not found!");
    return null;
  }
}

function createCard(character) {
  return `
    <div class="card hover:shadow-xl transition-shadow duration-300" id="${
      character.id
    }">
      <figure>
        <img
          src="${API_BASE}/${character.id.toLowerCase()}/icon-big"
          alt="${character.name} Icon"
          class="card-image"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${character.name}</h2>
        <p class="text-gray-600">${character.title}</p>
        <button
          class="btn btn-primary btn-sm"
          data-id="${character.id.toLowerCase()}">See More</button>
      </div>
      <div class="card-details hidden"></div>
    </div>`;
}

async function expandCard(card, characterId) {
  const detailsContainer = card.querySelector(".card-details");
  if (!detailsContainer.classList.contains("hidden")) {
    // Collapse the card if already expanded
    detailsContainer.innerHTML = "";
    detailsContainer.classList.add("hidden");
    return;
  }

  // Expand the card to show more details
  const character = await getCharacterData(characterId);
  if (character) {
    detailsContainer.innerHTML = `
      <p><strong>Release:</strong> ${character.release}</p>
      <p><strong>Vision:</strong> ${character.vision}</p>
      <p><strong>Nation:</strong> ${character.nation}</p>
      <p><strong>Weapon:</strong> ${character.weapon}</p>
      <p><strong>Rarity:</strong> ${character.rarity}</p>
      <p class="mt-2">${character.description}</p>
    `;
    detailsContainer.classList.remove("hidden");
  }
}

async function renderAllCharacters() {
  const characters = await getAllCharacters();
  DOMSelectors.container.innerHTML = "";
  for (const character of characters) {
    const characterData = await getCharacterData(character);
    if (characterData) {
      DOMSelectors.container.insertAdjacentHTML(
        "beforeend",
        createCard(characterData)
      );
    }
  }
}

function moreDetails(event) {
  const button = event.target.closest("button");
  if (button && button.dataset.id) {
    const card = button.closest(".card");
    const characterId = button.dataset.id;
    expandCard(card, characterId);
  }
}

async function search(event) {
  const query = event.target.value.toLowerCase();
  const characters = await getAllCharacters();
  const filtered = characters.filter((name) => name.includes(query));
  
  DOMSelectors.container.innerHTML = "";
  for (let i = 0; i < filtered.length; i++) {
    const character = filtered[i];
    try {
      const data = await getCharacterData(character);
      if (data) {
        DOMSelectors.container.insertAdjacentHTML(
          "beforeend",
          createCard(data)
        );
      }
    } catch (error) {
      console.error(`Error while searching for ${character}:`, error);
    }
  }
}

async function getAllCharacters() {
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Failed to fetch character list");
    return await response.json();
  } catch (error) {
    alert("Unable to load character list.");
    return [];
  }
}

function init() {
  renderAllCharacters();
  DOMSelectors.container.addEventListener("click", moreDetails);
  DOMSelectors.searchBar.addEventListener("input", search);
  DOMSelectors.gameBtn.addEventListener("click", game);
}

init();
