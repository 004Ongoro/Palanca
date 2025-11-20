const supportedLanguages = [
  "en",
  "es",
  "pt",
  "fr",
  "it",
  "hi",
  "ar",
  "ru",
  "bn",
  "zh",
];
const defaultLanguage = "en";
const i18nPath = "/assets/js/i18n/";

const translationCache = {};

// --- Core Logic Functions ---

/**
 * Determines the language to use based on the following priority:
 * 1. URL Query Parameter (?lang=XX)
 * 2. Locally Stored Preference (localStorage)
 * 3. Browser Language (navigator.language)
 * 4. Fallback Default ('en')
 * @returns {string} The determined language code.
 */
function getInitialLanguage() {
  const supported = supportedLanguages;
  const urlParams = new URLSearchParams(window.location.search);

  // 1. Check URL parameter (?lang=xx)
  const urlLang = urlParams.get("lang");
  if (urlLang && supported.includes(urlLang)) {
    // If language is set in URL, save it as the new preferred language
    localStorage.setItem("preferredLang", urlLang);
    return urlLang;
  }

  // 2. Check localStorage - Persistent Preference
  const savedLang = localStorage.getItem("preferredLang");
  if (savedLang && supported.includes(savedLang)) {
    return savedLang;
  }

  // 3. Check Browser language - First-time visitor detection
  const browserLang = navigator.language.slice(0, 2);
  if (supported.includes(browserLang)) {
    // Save the detected browser language for next time
    localStorage.setItem("preferredLang", browserLang);
    return browserLang;
  }

  // 4. Fallback to default
  return defaultLanguage;
}

/**
 * Updates the URL with the ?lang=XX parameter without reloading the page.
 * @param {string} lang The new language code.
 */
function updateUrl(lang) {
  const url = new URL(window.location);
  url.searchParams.set("lang", lang);
  window.history.pushState({ path: url.href }, "", url.href);
}

/**
 * Fetches the JSON translations and applies them to the DOM.
 * @param {string} lang The language code to load.
 */
async function setLanguage(lang) {
  if (!supportedLanguages.includes(lang)) {
    lang = defaultLanguage;
  }

  let translations;

  // 1. Check cache first, then fetch
  if (translationCache[lang]) {
    translations = translationCache[lang];
  } else {
    try {
      const response = await fetch(`${i18nPath}${lang}.json`);
      if (!response.ok) {
        console.error(
          `Translation file not found for: ${lang}. Falling back to default.`
        );
        return;
      }
      translations = await response.json();
      translationCache[lang] = translations; // Store in cache
    } catch (e) {
      console.error("Error fetching translations:", e);
      return;
    }
  }

  // 2. Apply translations to all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation = translations[key];

    if (translation) {
      // Standard update for inner text
      element.textContent = translation;

      // Special handling for attributes (placeholders, option values, etc.)
      const attrKey = element.getAttribute("data-i18n-attr");
      if (attrKey && translations[attrKey]) {
        const attrName =
          element.getAttribute("data-i18n-attr-name") || "placeholder";
        element.setAttribute(attrName, translations[attrKey]);
      }
    }
  });

  // 3. Update meta tags and page title
  if (translations.page_title) {
    document.title = translations.page_title;
    document
      .querySelector('meta[property="og:title"]')
      .setAttribute("content", translations.page_title);
  }
  if (translations.meta_description) {
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", translations.meta_description);
    document
      .querySelector('meta[property="og:description"]')
      .setAttribute("content", translations.meta_description);
  }
  if (translations.twitter_description) {
    document
      .querySelector('meta[name="twitter:description"]')
      .setAttribute("content", translations.twitter_description);
  }

  // 4. Update the language attribute on the <html> tag
  document.documentElement.lang = lang;
}

document.documentElement.lang = lang;
if (lang === "ar") {
  document.documentElement.dir = "rtl";
} else {
  document.documentElement.dir = "ltr";
}

// --- Initialization & Event Handlers ---

document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("language");
  if (!languageSelect) return;

  // 1. Determine the initial language using the priority logic
  const initialLang = getInitialLanguage();

  // 2. Set the selected value in the dropdown and apply translation
  languageSelect.value = initialLang;
  setLanguage(initialLang);

  // 3. Update the URL if it doesn't already contain the language parameter
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("lang") !== initialLang) {
    updateUrl(initialLang);
  }

  // 4. Handle language change event
  languageSelect.addEventListener("change", (event) => {
    const selectedLang = event.target.value;

    // Save the selection for future visits/pages
    localStorage.setItem("preferredLang", selectedLang);

    // Apply translations immediately
    setLanguage(selectedLang);

    // Update URL for sharing/SEO, without reloading
    updateUrl(selectedLang);
  });
});
