document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById("gallery");
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeButton = document.getElementById("closeModal");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const imageCounter = document.getElementById("imageCounter");

  let currentImageIndex = 0;
  const galleryItems = document.querySelectorAll(".gallery-item img");

  gallery.addEventListener("click", function (e) {
    const clickedItem = e.target.closest(".gallery-item img");
    if (clickedItem) {
      const allImages = Array.from(galleryItems);
      currentImageIndex = allImages.indexOf(clickedItem);

      openModal(clickedItem.src, currentImageIndex);
    }
  });

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  prevButton.addEventListener("click", showPrevImage);
  nextButton.addEventListener("click", showNextImage);

  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      showPrevImage();
    } else if (e.key === "ArrowRight") {
      showNextImage();
    }
  });

  function openModal(imageSrc, index) {
    modalImage.src = imageSrc;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    currentImageIndex = index;
    updateCounter();
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function showPrevImage() {
    currentImageIndex =
      (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    modalImage.src = galleryItems[currentImageIndex].src;
    updateCounter();
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    modalImage.src = galleryItems[currentImageIndex].src;
    updateCounter();
  }

  function updateCounter() {
    imageCounter.textContent = `${currentImageIndex + 1}/${
      galleryItems.length
    }`;
  }
});
