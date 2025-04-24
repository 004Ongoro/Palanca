const searchInput = document.getElementById("search_destinations_input");
const searchBtn = document.getElementById("search_destinations_btn");
let destinationsGrid = document.getElementById("dest-grid");
let resultsText = document.getElementById("results-text");

let destinations;

const search = () => {
  const query = searchInput.value.toLowerCase();

  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.title.toLowerCase().includes(query) ||
      destination.country.toLowerCase().includes(query) ||
      destination.tags.toLowerCase().includes(query) ||
      destination.description.toLowerCase().includes(query)
  );

  destinationsGrid.innerHTML = "";
  filteredDestinations.forEach((destination) => {
    const destinationCard = `
<div class="card-image">
            <img
              src="${destination.image}"
              alt="${destination.title} image"
            />
          </div>
          <div class="card-content">
            <div class="card-location">
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                />
              </svg>
              <span>${destination.country}</span>
            </div>
            <h3 class="card-title">${destination.title}</h3>
            <p class="card-description">
              ${destination.description}
            </p>
          </div>
`;

    resultsText.textContent = `Showing results for "${query}" (Found ${filteredDestinations.length} items)`;
    resultsText.style.display = "block";
    const card = document.createElement("article");
    card.className = "destination-card";
    card.innerHTML = destinationCard;
    destinationsGrid.appendChild(card);
  });
};

searchBtn.addEventListener("click", search);

fetch("/assets/js/data/destinations.json")
  .then((response) => response.json())
  .then((data) => {
    destinations = data;
    searchInput.addEventListener("input", search);
    load();
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
    destinationsGrid.innerHTML = `<p class="error-message">No results found</p>`;
  });

function load() {
  //   document.addEventListener("DOMContentLoaded", () => {
  destinationsGrid.innerHTML = "";
  console.log("Loading");
  destinations?.forEach((destination) => {
    const destinationCard = `
<div class="card-image">
            <img
              src="${destination.image}"
              alt="${destination.title} image"
            />
          </div>
          <div class="card-content">
            <div class="card-location">
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                />
              </svg>
              <span>${destination.country}</span>
            </div>
            <h3 class="card-title">${destination.title}</h3>
            <p class="card-description">
              ${destination.description}
            </p>
          </div>
`;
    const card = document.createElement("article");
    card.className = "destination-card";
    card.innerHTML = destinationCard;
    destinationsGrid.appendChild(card);
  });
  //   });
}
