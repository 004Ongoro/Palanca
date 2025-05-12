// scroll reveal
const elements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("r-active");
      }
    });
  },
  { threshold: 0.1 }
);

elements.forEach((element) => {
  observer.observe(element);
});

// Navbar Toggle Functionality
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Handle scrolling
const scrollToTopBtn = document.querySelector(".scroll-up");
const navBar = document.querySelector(".navbar");

let lastScrollTop = 0;
let scrollDirection = "down";

const scrollThreshold = 300;

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  const currentScrollTop =
    window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollTop > lastScrollTop) {
    scrollDirection = "down";
  } else {
    scrollDirection = "up";
  }

  if (currentScrollTop > scrollThreshold && scrollDirection === "down") {
    scrollToTopBtn.style.bottom = "1rem";
    navBar.style.top = "-100%";
  } else if (currentScrollTop < scrollThreshold || scrollDirection === "up") {
    scrollToTopBtn.style.bottom = "-100%";
    navBar.style.top = "0";
  }

  lastScrollTop = currentScrollTop;
});

// Theme switch
const themeSelect = document.getElementById("theme-select");
const root = document.documentElement;

function applyTheme(mode) {
  if (mode === "auto") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    root.setAttribute("data-theme", prefersDark ? "dark" : "light");
  } else {
    root.setAttribute("data-theme", mode);
  }
}

const savedTheme = localStorage.getItem("theme") || "auto";
themeSelect.value = savedTheme;
applyTheme(savedTheme);

themeSelect.addEventListener("change", (e) => {
  const selectedTheme = e.target.value;
  localStorage.setItem("theme", selectedTheme);
  applyTheme(selectedTheme);
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    const current = localStorage.getItem("theme") || "auto";
    if (current === "auto") {
      applyTheme("auto");
    }
  });

// Active link

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-links li a");

  navLinks.forEach((link) => {
    const linkpath = new URL(link.href).pathname;
    if (linkpath === currentPath) {
      link.classList.add("active-link");
    }
  });
  // const footerCopyright = document.querySelector(".copyright");
  // footerCopyright.insertAdjacentHTML(
  //   "afterend",
  //   "<small class='designer'>Design by <a href='https://www.ongoro.site'>George Ongoro</a></small>"
  // );
});

//

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");

slides.forEach((slide) => {
  const clone = slide.cloneNode(true);
  slider.appendChild(clone);
});

let currentIndex = 0;
const slideWidth = 100;
const totalSlides = document.querySelectorAll(".slide").length;
let slideInterval;

function setSliderPosition() {
  slider.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
}

function nextSlide() {
  currentIndex++;
  setSliderPosition();

  if (currentIndex >= slides.length) {
    setTimeout(() => {
      slider.style.transition = "none";
      currentIndex = 0;
      setSliderPosition();

      setTimeout(() => {
        slider.style.transition = "transform 0.5s ease-in-out";
      }, 50);
    }, 500);
  }
}

// Start automatic sliding
function startSlider() {
  slideInterval = setInterval(nextSlide, 5000);
}

// Initialize slider
setSliderPosition();
startSlider();

// Pause slider on hover
slider.addEventListener("mouseenter", () => {
  clearInterval(slideInterval);
});

// Resume slider
slider.addEventListener("mouseleave", () => {
  startSlider();
});

// Wndow Resize
window.addEventListener("resize", () => {
  setSliderPosition();
});

// Handle Testimonials
document.addEventListener("DOMContentLoaded", () => {
  const testimonials = [
    {
      id: 1,
      name: "Palanca Safari & Travel",
      role: "Travel Agency",
      content: `Going on an adventure with us soon? We'd love to hear your expectations or what your looking forward to. You can leave a revew on Facebook, Instagram, Tiktok or our website by visiting ${'<a class="link" href="https://palancasafari.com/contact/">our contact page</a>'}`,
    },
  ];

  const testimonialTrack = document.getElementById("testimonial-track");
  const navDots = document.getElementById("navigation-dots");
  const prevButton = document.getElementById("prev-btn");
  const nextButton = document.getElementById("next-btn");

  let currentIndex = 0;
  let isAnimating = false;
  let autoPlayInterval;
  const slideInterval = 5000;

  function createTestimonialSlides() {
    testimonialTrack.innerHTML = "";
    testimonials.forEach((item) => {
      const slide = document.createElement("article");
      slide.className = "testimonial-slide";
      slide.innerHTML = `
      <div class='testimonial-content'>${item.content}</div>
      <div class='testimonial-author'>
        <img class='author-image' src='../../logo.png' alt='${item.name}'s avator'>
        <h3 class='author-name'>${item.name}</h3>
        <p class='author-role'>${item.role}</p>
      </div>
      `;

      testimonialTrack.appendChild(slide);
    });
  }

  function createNavigationDots() {
    navDots.innerHTML = "";
    testimonials.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.className = `dot ${index === currentIndex ? "active" : ""}`;
      dot.addEventListener("click", () => {
        if (!isAnimating && index !== currentIndex) {
          goToSlide(index);
        }
      });
      navDots.appendChild(dot);
    });
  }

  function updateNavigationDots() {
    const dots = navDots.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.className = `dot ${index === currentIndex ? "active" : ""}`;
    });
  }

  function nextSlide() {
    if (!isAnimating) {
      goToSlide((currentIndex + 1) % testimonials.length);
    }
  }

  function prevSlide() {
    if (!isAnimating) {
      goToSlide((currentIndex - 1 + testimonials.length) % testimonials.length);
    }
  }

  function goToSlide(index) {
    if (isAnimating) return;

    isAnimating = true;
    currentIndex = index;

    testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateNavigationDots();

    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, slideInterval);

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  function initSlider() {
    createTestimonialSlides();
    createNavigationDots();

    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);

    autoPlayInterval = setInterval(nextSlide, slideInterval);

    testimonialTrack.addEventListener("mouseenter", () => {
      clearInterval(autoPlayInterval);
    });

    testimonialTrack.addEventListener("mouseleave", () => {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(nextSlide, slideInterval);
    });
  }

  initSlider();
});

// Initialize form handling
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("booking-form");
  const formSuccess = document.getElementById("form-success");
  const formError = document.getElementById("form-error");
  const packageSelect = document.getElementById("package");
  const customDestinationGroup = document.getElementById(
    "custom-destination-group"
  );
  const paymentOption = document.getElementById("payment-option");
  const departureDate = document.getElementById("departure-date");
  const returnDate = document.getElementById("return-date");
  const travelers = document.getElementById("travelers");
  const specialRequests = document.getElementById("special-requests");

  // Set minimum date for departure to today
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${yyyy}-${mm}-${dd}`;
  departureDate.min = formattedToday;

  // Update return date minimum based on departure date
  departureDate.addEventListener("change", function () {
    returnDate.min = departureDate.value;
    if (returnDate.value && returnDate.value < departureDate.value) {
      returnDate.value = departureDate.value;
    }
    updateSummary();
  });

  returnDate.addEventListener("change", updateSummary);
  travelers.addEventListener("change", updateSummary);

  // Show/hide custom destination field
  packageSelect.addEventListener("change", function () {
    if (packageSelect.value === "custom") {
      customDestinationGroup.style.display = "block";
    } else {
      customDestinationGroup.style.display = "none";
    }
    updateSummary();
  });

  // Update payment summary when payment option changes
  paymentOption.addEventListener("change", updateSummary);

  // Package selection from featured packages
  const packageButtons = document.querySelectorAll(".select-package");
  packageButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const packageValue = this.getAttribute("data-package");
      packageSelect.value = packageValue;
      customDestinationGroup.style.display = "none";
      updateSummary();

      // Scroll to form
      document
        .getElementById("booking-form-container")
        .scrollIntoView({ behavior: "smooth" });
    });
  });

  // Function to update booking summary
  function updateSummary() {
    const summaryPackage = document.getElementById("summary-package");
    const summaryTravelers = document.getElementById("summary-travelers");
    const summaryDates = document.getElementById("summary-dates");
    const summaryPayment = document.getElementById("summary-payment");
    const summaryTotal = document.getElementById("summary-total");

    // Package
    let packageText = "-";
    let packagePrice = 0;

    if (packageSelect.value) {
      if (packageSelect.value === "custom") {
        const customDest =
          document.getElementById("custom-destination").value ||
          "Custom Destination";
        packageText = customDest;
        packagePrice = 1000;
      } else {
        const selectedOption =
          packageSelect.options[packageSelect.selectedIndex];
        packageText = selectedOption.text;

        const priceMatch = selectedOption.text.match(/\$([0-9,]+)/);
        if (priceMatch) {
          packagePrice = parseFloat(priceMatch[1].replace(",", ""));
        }
      }
    }

    summaryPackage.textContent = packageText;

    // Travelers
    const travelersValue = travelers.value;
    summaryTravelers.textContent = travelersValue;

    let totalPrice = packagePrice;
    if (travelersValue > 1 && packagePrice > 0) {
      totalPrice =
        packagePrice + packagePrice * 0.8 * (parseInt(travelersValue) - 1);
      dataForm.TotalDue = totalPrice;
    }

    // Dates
    let datesText = "-";
    if (departureDate.value && returnDate.value) {
      const departureFormatted = new Date(
        departureDate.value
      ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const returnFormatted = new Date(returnDate.value).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      );

      datesText = `${departureFormatted} - ${returnFormatted}`;
    }
    summaryDates.textContent = datesText;

    // Payment option
    let paymentText = "-";
    let paymentPercentage = 1;

    if (paymentOption.value) {
      const selectedPayment =
        paymentOption.options[paymentOption.selectedIndex].text;
      paymentText = selectedPayment;

      if (paymentOption.value === "deposit") {
        paymentPercentage = 0.2;
      } else if (paymentOption.value === "half") {
        paymentPercentage = 0.5;
      }
    }
    summaryPayment.textContent = paymentText;

    // Total due now
    const dueNow = totalPrice * paymentPercentage;
    summaryTotal.textContent = `$${dueNow.toFixed(2)}`;
  }

  // Form validation
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
      // Form is valid,
      formSuccess.style.display = "block";
      formError.style.display = "none";
      submitBooking(dataForm);

      // Reset form after successful submission
      setTimeout(() => {
        form.reset();
        formSuccess.style.display = "none";
        updateSummary();
      }, 3000);
    } else {
      // Form has errors
      formError.style.display = "block";
      formSuccess.style.display = "none";
    }
  });

  //data
  const dataForm = {
    Name: "",
    Email: "",
    Phone: "",
    Package: "",
    Destination: "",
    Travelers: travelers.value,
    Dates: "",
    Notes: "NA",
    PaymentOption: "",
    TotalDue: "",
  };

  async function submitBooking(data) {
    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    alert(result.message);
  }

  // Form validation function
  function validateForm() {
    let isValid = true;
    dataForm.Travelers = travelers.value;

    dataForm.Notes = specialRequests.value.trim();

    // First name validation
    const firstName = document.getElementById("first-name");
    const firstNameError = document.getElementById("first-name-error");
    if (!firstName.value.trim()) {
      firstNameError.style.display = "block";
      firstName.style.borderColor = "var(--error-color)";
      isValid = false;
    } else {
      firstNameError.style.display = "none";
      firstName.style.borderColor = "";
    }

    // Last name validation
    const lastName = document.getElementById("last-name");
    const lastNameError = document.getElementById("last-name-error");
    if (!lastName.value.trim()) {
      lastNameError.style.display = "block";
      lastName.style.borderColor = "var(--error-color)";
      isValid = false;
    } else {
      lastNameError.style.display = "none";
      lastName.style.borderColor = "";
    }

    dataForm.Name = `${firstName.value} ${lastName.value}`;

    // Email validation
    const email = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value)) {
      emailError.style.display = "block";
      email.style.borderColor = "var(--error-color)";
      isValid = false;
    } else {
      dataForm.Email = email.value.trim();
      emailError.style.display = "none";
      email.style.borderColor = "";
    }

    // Phone validation
    const phone = document.getElementById("phone");
    const phoneError = document.getElementById("phone-error");
    // Simple validation - should have at least 10 digits
    const phoneDigits = phone.value.replace(/\D/g, "");
    if (!phone.value.trim() || phoneDigits.length < 10) {
      phoneError.style.display = "block";
      phone.style.borderColor = "var(--error-color)";
      isValid = false;
    } else {
      dataForm.Phone = phone.value.trim();
      phoneError.style.display = "none";
      phone.style.borderColor = "";
    }

    // Package validation
    const packageError = document.getElementById("package-error");
    if (!packageSelect.value) {
      packageError.style.display = "block";
      packageSelect.style.borderColor = "var(--error-color)";
      isValid = false;
    } else {
      dataForm.Package = packageSelect.value;
      dataForm.Destination = packageSelect.value | "";
      packageError.style.display = "none";
      packageSelect.style.borderColor = "";
    }

    // Date validation
    const departureDateError = document.getElementById("departure-date-error");
    const returnDateError = document.getElementById("return-date-error");

    if (!departureDate.value) {
      departureDateError.style.display = "block";
      departureDate.style.borderColor = "var(--error-color)";
      isValid = false;
    } else {
      departureDateError.style.display = "none";
      departureDate.style.borderColor = "";
    }

    if (!returnDate.value) {
      returnDateError.style.display = "block";
      returnDate.style.borderColor = "var(--error-color)";
      isValid = false;
    } else if (returnDate.value < departureDate.value) {
      returnDateError.textContent = "Return date must be after departure date";
      returnDateError.style.display = "block";
      returnDate.style.borderColor = "var(--error-color)";
      isValid = false;
    } else {
      returnDateError.style.display = "none";
      returnDate.style.borderColor = "";
    }
    dataForm.Dates = `From ${departureDate.value} to ${returnDate.value}`;

    // Payment option validation
    const paymentOptionError = document.getElementById("payment-option-error");
    if (!paymentOption.value) {
      paymentOptionError.style.display = "block";
      paymentOption.style.borderColor = "var(--error-color)";
      isValid = false;
    } else {
      dataForm.PaymentOption = paymentOption.value;
      paymentOptionError.style.display = "none";
      paymentOption.style.borderColor = "";
    }

    return isValid;
  }

  // Initialize summary on page load
  updateSummary();
});
