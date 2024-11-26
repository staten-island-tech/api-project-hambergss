import "../css/style.css";

async function getData() {
  try {
    //returns a promise
    const response = await fetch("https://genshin.jmp.blue/characters");
    //guard clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      //convert promise to json
      const data = await response.json();
      console.log(data.data);
      //this is unique to THIS API
      data.data.forEach((character) =>
        document
          .querySelector("div")
          .insertAdjacentHTML("afterbegin", `<h2>${character.displayName}</h2>`)
      );
    }
  } catch (error) {
    alert("hey I could not find that character for you");
  }
};

getData();