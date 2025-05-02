const supportedLnaguages = ["en", "es", "pt", "fr", "it", "hi", "ar"];
const defaultLanguage = "en";


const widelySpokenLanguages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "zh", name: "Chinese" },
  { code: "hi", name: "Hindi" },
  { code: "ar", name: "Arabic" },
  { code: "fr", name: "French" },
  { code: "bn", name: "Bengali" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "it", name: "Italian" }
];


const uniqueLanguagesMap = new Map();
widelySpokenLanguages.forEach(lang => {
  uniqueLanguagesMap.set(lang.code, lang.name);
});
supportedLnaguages.forEach(code => {
  if (!uniqueLanguagesMap.has(code)) {
    uniqueLanguagesMap.set(code, code); 
  }
});

const finalLanguages = Array.from(uniqueLanguagesMap.entries()); 

const currentPath = window.location.pathname;
const currentLang = currentPath.split("/")[1];

const savedLang = localStorage.getItem("preferredLang");

if (!savedLang) {
  const browserLang = navigator.language.slice(0, 2);
  if (supportedLnaguages.includes(browserLang)) {
    localStorage.setItem("preferredLang", browserLang);
    window.location.href = `/${browserLang}/`;
  }
}

if (
  !supportedLnaguages.includes(currentLang) &&
  savedLang &&
  supportedLnaguages.includes(savedLang)
) {
  window.location.href = `/${savedLang}/`;
}


window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".translation-container");
  if (container) {
    container.innerHTML = ""; 

    const select = document.createElement("select");
    select.id = "langs";

    finalLanguages.forEach(([code, name]) => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = name;
      select.appendChild(option);
    });

    
    if (supportedLnaguages.includes(currentLang)) {
      select.value = currentLang;
    }

    
    select.addEventListener("change", () => {
      const selectedLang = select.value;
      localStorage.setItem("preferredLang", selectedLang);
      window.location.href = `/${selectedLang}/`;
    });

    container.appendChild(select);
  }
});
