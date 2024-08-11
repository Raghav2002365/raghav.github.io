const lightbox = document.querySelector(".image-gallery-container .lightbox");
const lightboxImage = document.querySelector(
  ".image-gallery-container .lightbox img"
);
/*
const lightboxTitle = document.querySelector(
  ".image-gallery-container .lightbox .title"
);
*/
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

  lightboxImage.src = image.src;
  downloadBtn.href = image.src;

  // Function to show and hide the header
  const showHeader = () => {
    lightboxHeader.classList.add("visible");
    clearTimeout(lightboxHeader.hideTimeout);
    lightboxHeader.hideTimeout = setTimeout(() => {
      lightboxHeader.classList.remove("visible");
    }, 2000);
  };

  showHeader();

  lightbox.addEventListener("mousemove", showHeader);
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
  lightboxImage.classList.toggle("zoomed");
  const isZoomed = lightboxImage.classList.contains("zoomed");

  zoomBtn.title = isZoomed ? "Unzoom" : "Zoom";

  const icon = zoomBtn.querySelector("i");
  icon.classList.toggle("fa-search-plus", !isZoomed);
  icon.classList.toggle("fa-search-minus", isZoomed);

  console.log("Zoom state:", isZoomed ? "Zoomed In" : "Zoomed Out");
});

// Open in new tab functionality
openNewTabBtn.addEventListener("click", () => {
  window.open(lightboxImage.src, '_blank');
});

// Fullscreen functionality
fullscreenBtn.addEventListener("click", () => {
  if (isFullscreen()) {
    exitFullscreen();
  } else {
    enterFullscreen();
  }
});

function isFullscreen() {
  return document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement;
}

function enterFullscreen() {
  const element = lightbox;
  element.requestFullscreen = element.requestFullscreen ||
    element.mozRequestFullScreen ||
    element.webkitRequestFullscreen ||
    element.msRequestFullscreen;
  element.requestFullscreen();
}

function exitFullscreen() {
  document.exitFullscreen = document.exitFullscreen ||
    document.mozCancelFullScreen ||
    document.webkitExitFullscreen ||
    document.msExitFullscreen;
  document.exitFullscreen();
}




const lightboxHeader = lightbox.querySelector(".lightbox-header");
let headerTimeout;

// function to show header
const showHeader = () => {
  lightboxHeader.classList.add("visible");

  clearTimeout(headerTimeout);

  headerTimeout = setTimeout(() => {
    lightboxHeader.classList.remove("visible");
  }, 2000);


}
