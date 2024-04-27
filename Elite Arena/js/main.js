// Page loading animation
const loaderContainer = document.querySelector('#js-preloader');
window.addEventListener('load', () => {
    loaderContainer.classList.add("loaded");
});

// start header
let header = document.querySelector("header");
// scroll
document.onscroll = () => {
    if (window.scrollY >= 400) {
        header.classList.add("scroll-header");
    } else {
        header.classList.remove("scroll-header");
    }
};

// menu
let buttonMenu = document.querySelector("header .menu");
let mainMenu = document.querySelector("header .linkes ul");

buttonMenu.addEventListener("click", (e) => {
    mainMenu.classList.toggle("open");
    buttonMenu.classList.toggle("cloce");
});

// linkes
let linkes = document.querySelectorAll("header .linkes ul li a");
linkes.forEach((li) => {
    if (li.href === document.location.href) {
        li.classList.add("active");
    } else {
        li.classList.remove("active");
    }
});

// end header

// start swiper
const swiper = new Swiper('.swiper', {
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
        540: {
            slidesPerView: 1,
        },
        765: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 3,
        },
    },
    loop: true,
    // Navigation arrows 
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
// Select all images in the live streams and live tournaments sections
const liveStreamImages = document.querySelectorAll('.live-stream.item.thumb .thumb-content img');
const topDownloadedImages = document.querySelectorAll('.top-downloaded.item.thumb .thumb-content img');

// Iterate through each image in the live streams section and add a click event listener
liveStreamImages.forEach((image) => {
  image.addEventListener('click', () => {
    // Redirect to live.html when an image is clicked
    window.location.href = 'live.html';
  });
});

// Iterate through each image in the live tournaments section and add a click event listener
topDownloadedImages.forEach((image) => {
  image.addEventListener('click', () => {
    // Redirect to live.html when an image is clicked
    window.location.href = 'live.html';
  });
});