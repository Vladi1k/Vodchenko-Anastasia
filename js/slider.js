const img = document.querySelectorAll(".slideshow-image");
const leftControl = document.querySelector(".left-control");
const centerControl = document.querySelector(".center-control");
const rightControl = document.querySelector(".right-control");
const slideShow = document.querySelector(".slideshow");
const thumbnails = document.querySelector(".thumbnails");
const thumbnailsImg = document.querySelectorAll(".thumbnails-img");

let index = 0; 

function updateSlide(newIndex) {
    img[index].classList.remove("active"); 
    img[index].classList.add("loaded"); 
    index = newIndex; 
    img[index].classList.remove("loaded"); 
    img[index].classList.add("active"); 
}

rightControl.addEventListener("click", () => {
    const nextIndex = (index < img.length - 1) ? index + 1 : 0;
    updateSlide(nextIndex);
});

leftControl.addEventListener("click", () => {
    const prevIndex = (index > 0) ? index - 1 : img.length - 1;
    updateSlide(prevIndex);
});

// Настраиваем миниатюры только один раз
thumbnailsImg.forEach((thumb, i) => {
    thumb.addEventListener("click", () => {
        toggleGalleryMode(false);
        updateSlide(i);
    });
});

// Lazy-load изображений
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const realSrc = img.getAttribute("data-src");
            if (realSrc) {
                img.src = realSrc;
                img.classList.remove("preload");
                observer.unobserve(img);
            }
        }
    });
}, { rootMargin: "50px" });

thumbnailsImg.forEach((img) => observer.observe(img));

function toggleGalleryMode(showGallery) {
    slideShow.classList.toggle("stacked", showGallery);
    thumbnails.classList.toggle("stacked", !showGallery);
    thumbnails.classList.toggle("gallery", showGallery);
    leftControl.classList.toggle("stacked", showGallery);
    rightControl.classList.toggle("stacked", showGallery);
    centerControl.classList.toggle("stacked", showGallery);
}

centerControl.addEventListener("click", () => toggleGalleryMode(true));
