const supportedLnaguages = ["en", "es", "pt", "fr", "it", "zh-cn", "ar"];

const defaultLanguage = "en";

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

const languageSelect = document.getElementById("langs");

if (languageSelect) {
  if (supportedLnaguages.includes(currentLang)) {
    languageSelect.value = currentLang;
  }

  languageSelect.addEventListener("change", () => {
    const selectedLang = languageSelect.value;
    localStorage.setItem("preferredLang", selectedLang);
    window.location.href = `/${selectedLang}/`;
  });
}
