const supportedLanguages = ["en", "es", "pt", "fr", "it", "hi", "ar", "ru", "bn", "zh"];
const defaultLanguage = "en";

const currentPath = window.location.pathname;
const currentLang = currentPath.split("/")[1];
const savedLang = localStorage.getItem("preferredLang");

document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("language");

  if (!languageSelect) return;

  // Set select dropdown value to currentLang
  if (supportedLanguages.includes(currentLang)) {
    languageSelect.value = currentLang;
  }

  // Redirect to saved language if current is not supported
  if (
    !supportedLanguages.includes(currentLang) &&
    savedLang &&
    supportedLanguages.includes(savedLang)
  ) {
    window.location.href = `/${savedLang}/`;
    return;
  }

  // Detect browser language if no savedLang
  if (!savedLang) {
    const browserLang = navigator.language.slice(0, 2);
    if (supportedLanguages.includes(browserLang)) {
      localStorage.setItem("preferredLang", browserLang);
      window.location.href = `/${browserLang}/`;
      return;
    } else {
      localStorage.setItem("preferredLang", defaultLanguage);
      window.location.href = `/${defaultLanguage}/`;
      return;
    }
  }

  // Handle select change
  languageSelect.addEventListener("change", () => {
    const selectedLang = languageSelect.value;
    localStorage.setItem("preferredLang", selectedLang);
    window.location.href = `/${selectedLang}/`;
  });
});
