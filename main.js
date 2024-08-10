const lightbox = document.querySelector(".image-gallery-container .lightbox");
const lightboxImage = document.querySelector(
  ".image-gallery-container .lightbox img"
);
const lightboxTitle = document.querySelector(
  ".image-gallery-container .lightbox .title"
);
const downloadBtn = document.querySelector(
  ".download-btn"
);
downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = lightboxImage.src;
    link.download = lightboxImage.src.split("/").pop(); // This sets the filename to the image's name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

const nextBtn = document.querySelector(".image-gallery-container .next-btn");
const previousBtn = document.querySelector(
  ".image-gallery-container .prev-btn"
);
const closeBtn = document.querySelector(".image-gallery-container .close-btn");

const showImage = (data) => {
  currentImage = data;
  lightbox.classList.add("active");
  let image = data.querySelector("img");
  let title = data.querySelector(".title").innerText;

  lightboxImage.src = image.src;
  downloadBtn.href = image.src;

  if (title) {
    lightboxTitle.innerText = title;
  }
};

closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

nextBtn.addEventListener("click", () => {
  if (currentImage.nextElementSibling) {
    currentImage = currentImage.nextElementSibling;
    showImage(currentImage);
  }
});

previousBtn.addEventListener("click", () => {
  if (currentImage.previousElementSibling) {
    currentImage = currentImage.previousElementSibling;
    showImage(currentImage);
  }
});

const zoomBtn = document.querySelector(".image-gallery-container .zoom-btn");
const openNewTabBtn = document.querySelector(".image-gallery-container .open-new-tab-btn");
const fullscreenBtn = document.querySelector(".image-gallery-container .fullscreen-btn");

// Zoom functionality
zoomBtn.addEventListener("click", () => {
  // Toggle zoom class or style
  if (lightboxImage.classList.contains("zoomed")) {
    lightboxImage.classList.remove("zoomed");
    zoomBtn.title = "Zoom";
  } else {
    lightboxImage.classList.add("zoomed");
    zoomBtn.title = "Unzoom";
  }
});

// Open in new tab functionality
openNewTabBtn.addEventListener("click", () => {
  window.open(lightboxImage.src, '_blank');
});

// Fullscreen functionality
fullscreenBtn.addEventListener("click", () => {
  if (lightbox.requestFullscreen) {
    lightbox.requestFullscreen();
  } else if (lightbox.mozRequestFullScreen) { 
    lightbox.mozRequestFullScreen();
  } else if (lightbox.webkitRequestFullscreen) { 
    lightbox.webkitRequestFullscreen();
  } else if (lightbox.msRequestFullscreen) { 
    lightbox.msRequestFullscreen();
  }
});


