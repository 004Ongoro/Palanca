import { faqs } from "./data/data.js";

const faqList = document.querySelector(".faq-list");
document.addEventListener("DOMContentLoaded", () => {
  faqList.innerHTML = "";
  faqs.forEach((faq) => {
    const faqItem = document.createElement("div");
    faqItem.className = "faq-item";

    const html = `
        <div class="faq-question">${faq.question}</div>
        <div class="faq-answer">${faq.answer}</div>
    `;

    faqItem.innerHTML = html;
    faqList.appendChild(faqItem);
  });
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      // Toggle active class on question
      this.classList.toggle("active");

      // Toggle active class on answer
      const answer = this.nextElementSibling;
      answer.classList.toggle("active");
    });
  });
});
