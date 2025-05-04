const searchInput = document.getElementById("search_destinations_input");
const searchBtn = document.getElementById("search_destinations_btn");
let destinationsGrid = document.getElementById("dest-grid");
let resultsText = document.getElementById("results-text");

let destinations;
let currentLanguage = getLanguageFromUrl(); 

function getLanguageFromUrl() {
  const pathSegments = window.location.pathname.split('/').filter(segment => segment !== '');
  if (pathSegments.length > 0 && ['en', 'es', 'fr', 'ar', 'bn', 'zh', 'ru', 'pt', 'hi', 'it'].includes(pathSegments[0])) {
    return pathSegments[0];
  }
  return 'en';
}

const search = () => {
  const query = searchInput.value.toLowerCase();

  const filteredDestinations = destinations.filter(
    (destination) =>
      (destination.title[currentLanguage] || destination.title['en']).toLowerCase().includes(query) ||
      (destination.country[currentLanguage] || destination.country['en']).toLowerCase().includes(query) ||
      destination.tags.toLowerCase().includes(query) ||
      (destination.description[currentLanguage] || destination.description['en']).toLowerCase().includes(query)
  );

  destinationsGrid.innerHTML = "";
  filteredDestinations.forEach((destination) => {
    const translatedCountry = destination.country[currentLanguage] || destination.country['en'];
    const translatedTitle = destination.title[currentLanguage] || destination.title['en'];
    const translatedDescription = destination.description[currentLanguage] || destination.description['en'];

    const destinationCard = `
<div class="card-image">
          <img
            src="${destination.image}"
            alt="${translatedTitle} image"
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
            <span>${translatedCountry}</span>
          </div>
          <h3 class="card-title">${translatedTitle}</h3>
          <p class="card-description">
            ${translatedDescription}
          </p>
        </div>
`;

    resultsText.textContent = `Showing results for "${query}" (Found ${filteredDestinations.length} destinations)`;
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
    loadDestinations(); 
  })
  .catch((error) => {
    destinationsGrid.innerHTML = `<p class="error-message">No results found</p>`;
  });

function loadDestinations() {
  destinationsGrid.innerHTML = "";
  destinations?.forEach((destination) => {
    const translatedCountry = destination.country[currentLanguage] || destination.country['en'];
    const translatedTitle = destination.title[currentLanguage] || destination.title['en'];
    const translatedDescription = destination.description[currentLanguage] || destination.description['en'];

    const destinationCard = `
<div class="card-image">
          <img
            src="${destination.image}"
            alt="${translatedTitle} image"
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
            <span>${translatedCountry}</span>
          </div>
          <h3 class="card-title">${translatedTitle}</h3>
          <p class="card-description">
            ${translatedDescription}
          </p>
        </div>
`;
    const card = document.createElement("article");
    card.className = "destination-card";
    card.innerHTML = destinationCard;
    destinationsGrid.appendChild(card);
  });
}


loadDestinations();