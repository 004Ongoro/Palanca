import { faqs } from "./data/data.js";

const faqList = document.querySelector(".faq-list");

document.addEventListener("DOMContentLoaded", () => {
  
  const currentPath = window.location.pathname;
  const currentLang = currentPath.split("/")[1] || "en";

  
  faqList.innerHTML = "";

  faqs.forEach((faq) => {
    const questionText = faq.question[currentLang] || faq.question["en"];
    const answerText = faq.answer[currentLang] || faq.answer["en"];

    const faqItem = document.createElement("div");
    faqItem.className = "faq-item";

    const html = `
        <div class="faq-question">${questionText}</div>
        <div class="faq-answer">${answerText}</div>
    `;

    faqItem.innerHTML = html;
    faqList.appendChild(faqItem);
  });

  // Toggle answers on question click
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      this.classList.toggle("active");
      const answer = this.nextElementSibling;
      answer.classList.toggle("active");
    });
  });
});
