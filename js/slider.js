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

centerControl.addEventListener("click", () => {
    slideShow.classList.add("stacked");
    thumbnails.classList.remove("stacked");
    leftControl.classList.add("stacked");
    rightControl.classList.add("stacked");
    centerControl.classList.add("stacked");

    thumbnails.classList.add("gallery");

    thumbnailsImg.forEach((thumb, i) => {
        const realSrc = thumb.getAttribute("data-src");
        if (realSrc) { 
            thumb.setAttribute("src", realSrc);
            thumb.addEventListener("load", () => {
                thumb.classList.remove("preload");
            });
        }

        thumb.addEventListener("click", () => {
            thumbnails.classList.add("stacked");
            thumbnails.classList.remove("gallery");
            slideShow.classList.remove("stacked");
            leftControl.classList.remove("stacked");
            rightControl.classList.remove("stacked");
            centerControl.classList.remove("stacked");

            updateSlide(i); 
        });
    });
});
