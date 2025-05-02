const supportedLanguages = ["en", "es", "pt", "fr", "it", "hi", "ar", "ru", "bn", "zh"];

const defaultLanguage = "en";

const currentPath = window.location.pathname;
const currentLang = currentPath.split("/")[1];

const savedLang = localStorage.getItem("preferredLang");

const translateContainer= document.querySelector('.translate-container')

const languageNames = {
  en: "English",
  es: "Spanish",
  pt: "Portuguese",
  fr: "French",
  it: "Italian",
  hi: "Hindi",
  ar: "Arabic",
  ru: "Russian",
  bn: "Bengali",
  zh: "Chinese"
};

document.addEventListener("DOMContentLoaded", () => {
  translateContainer.innerHTML = ""
})

const select = document.createElement("select");
select.name = "language";
select.id = "language";

supportedLanguages.forEach(code => {
  const option = document.createElement("option");
  option.value = code;
  option.textContent = languageNames[code] || code;
  select.appendChild(option);
});

const label = document.createElement("label");
label.setAttribute("for", "language");
label.textContent = "Select Language: ";

const container = document.getElementById("language-container");
container.appendChild(label);
container.appendChild(select);

if (!savedLang) {
  const browserLang = navigator.language.slice(0, 2);

  if (supportedLanguages.includes(browserLang)) {
    localStorage.setItem("preferredLang", browserLang);
    window.location.href = `/${browserLang}/`;
  }
}

if (
  !supportedLanguages.includes(currentLang) &&
  savedLang &&
  supportedLanguages.includes(savedLang)
) {
  window.location.href = `/${savedLang}/`;
}

const languageSelect = document.getElementById("language");

if (languageSelect) {
  if (supportedLanguages.includes(currentLang)) {
    languageSelect.value = currentLang;
  }

  languageSelect.addEventListener("change", () => {
    const selectedLang = languageSelect.value;
    localStorage.setItem("preferredLang", selectedLang);
    window.location.href = `/${selectedLang}/`;
  });
}
