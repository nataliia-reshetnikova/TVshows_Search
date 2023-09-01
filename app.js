// get all the necessary elements
const searchBtn = document.querySelector('button[type="submit"');
const titleInput = document.querySelector("#title");
const resultsContainer = document.querySelector("#results");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resultsContainer.innerHTML = "";
  let searchTerm = titleInput.value;
  getTvShows(searchTerm);
});

//setup link and request endpoint
const endpoint = "https://api.tvmaze.com/search/shows/?q=";

//formulate request
const getTvShows = async (searchTerm) => {
  try {
    const res = await axios.get(`${endpoint}${searchTerm}`);
    if (res.data) {
      buildShowResults(res.data);
    }
  } catch (e) {
    console.log("ERROR", e);
    const errorMessage = document.createElement("p");
    errorMessage.innerText = "Sorry, something went wrong:";
  }
};

//attach results to the page
function buildShowResults(shows) {
  for (show of shows) {
    if (!!show.show.image) {
      const image = document.createElement("img");
      image.src = `${show.show.image.medium}`;
      image.classList.add("materialboxed");
      const genre = show.show.genres.length > 0 ? `(${[...show.show.genres]})` : "";
      image.setAttribute("data-caption", `${show.show.name} ${genre}`);
      image.setAttribute("alt", `${show.show.name} ${genre}`);
      resultsContainer.appendChild(image);
      M.Materialbox.init(image);
    }
  }
}
