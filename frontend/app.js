"use strict";

const endpoint = "http://localhost:3000";

window.addEventListener("load", initApp);

async function initApp() {
  updateArtistsGrid();
}

async function updateArtistsGrid() {
  const artists = await getArtists();
  showArtists(artists);
}

function showArtists(listOfArtists) {
  document.querySelector("#artists").innerHTML = "";
  for (const artist of listOfArtists) {
    showArtist(artist);
  }
}

function showArtist(artist) {
  const postHTML = /*html*/ ` <article class="grid-item">
                <img src="${artist.image}">
                <h1>${artist.name}</h1>
                <div class="btns">
                <button class="delete">Delete</button>
                <button class="update">Update</button>
                <button class="favorite">favorite</button>
                </div>
                
            </article>`;
  document.querySelector("#artists").insertAdjacentHTML("beforeend", postHTML);
}

async function getArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  console.log(data);
  return data;
}
