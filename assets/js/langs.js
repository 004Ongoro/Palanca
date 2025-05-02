const supportedLanguages = ["en", "es", "pt", "fr", "it", "hi", "ar", "ru", "bn", "zh"];
const defaultLanguage = "en";

document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("language");
  if (!languageSelect) return;

  const currentPath = window.location.pathname;
  const pathParts = currentPath.split("/").filter(Boolean); 
  const currentLang = supportedLanguages.includes(pathParts[0]) ? pathParts[0] : null;
  const savedLang = localStorage.getItem("preferredLang");

  
  if (currentLang) {
    languageSelect.value = currentLang;
  }

  
  if (!currentLang && savedLang && supportedLanguages.includes(savedLang)) {
    const newPath = `/${savedLang}/${pathParts.join("/")}`;
    window.location.href = newPath;
    return;
  }

  // Fallback to browser language
  if (!savedLang) {
    const browserLang = navigator.language.slice(0, 2);
    const fallbackLang = supportedLanguages.includes(browserLang) ? browserLang : defaultLanguage;
    localStorage.setItem("preferredLang", fallbackLang);
    const newPath = `/${fallbackLang}/${pathParts.join("/")}`;
    window.location.href = newPath;
    return;
  }

  // Handle language change
  languageSelect.addEventListener("change", () => {
    const selectedLang = languageSelect.value;
    localStorage.setItem("preferredLang", selectedLang);

    const newPathParts = [...pathParts];
    if (currentLang) {
      newPathParts[0] = selectedLang; 
    } else {
      newPathParts.unshift(selectedLang); 
    }

    const newPath = `/${newPathParts.join("/")}`;
    window.location.href = newPath;
  });
});
