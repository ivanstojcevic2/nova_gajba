const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");
const paper5 = document.querySelector("#p5");
const paper6 = document.querySelector("#p6");
const paper7 = document.querySelector("#p7");

prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

let currentLocation = 1;
let numOfPapers = 7;
let maxLocation = numOfPapers + 1;

function openBook() {
  const screenWidth = window.innerWidth;
  let translateXPercentage;

  if (screenWidth <= 431) {
    translateXPercentage = 35;
  } else if (screenWidth <= 902) {
    translateXPercentage = 25;
  } else {
    translateXPercentage = 50;
  }

  book.style.transform = `translateX(${translateXPercentage}%)`;
  prevBtn.style.transform = "translateX(0px)";
  nextBtn.style.transform = "translateX(0px)";
}

function closeBook(isAtBeginning) {
  const screenWidth = window.innerWidth;
  if (isAtBeginning) {
    if (screenWidth <= 902) {
      // For screens less than or equal to 902px, set transform to 10%
      book.style.transform = "translateX(10%)";
    } else {
      book.style.transform = "translateX(0%)";
    }
  } else {
    if (screenWidth <= 902) {
      // For screens less than or equal to 902px, set transform to 55%
      book.style.transform = "translateX(55%)";
    } else {
      book.style.transform = "translateX(100%)";
    }
  }

  prevBtn.style.transform = "translateX(0px)";
  nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
  if (currentLocation < maxLocation) {
    switch (currentLocation) {
      case 1:
        openBook();
        paper1.classList.add("flipped");
        paper1.style.zIndex = 1;
        break;
      case 2:
        paper2.classList.add("flipped");
        paper2.style.zIndex = 2;
        break;
      case 3:
        paper3.classList.add("flipped");
        paper3.style.zIndex = 3;
        break;
      case 4:
        paper4.classList.add("flipped");
        paper4.style.zIndex = 4;
        break;
      case 5:
        paper5.classList.add("flipped");
        paper5.style.zIndex = 5;
        break;
      case 6:
        paper6.classList.add("flipped");
        paper6.style.zIndex = 6;
        break;
      case 7: // Add case for the new paper
        paper7.classList.add("flipped");
        paper7.style.zIndex = 7;
        closeBook(false);
        break;
      default:
        throw new Error("unknown state");
    }
    currentLocation++;
  }
}

function goPrevPage() {
  if (currentLocation > 1) {
    switch (currentLocation) {
      case 2:
        closeBook(true);
        paper1.classList.remove("flipped");
        paper1.style.zIndex = 7;
        break;
      case 3:
        paper2.classList.remove("flipped");
        paper2.style.zIndex = 6;
        break;
      case 4:
        paper3.classList.remove("flipped");
        paper3.style.zIndex = 5;
        break;
      case 5:
        paper4.classList.remove("flipped");
        paper4.style.zIndex = 4;
        break;
      case 6:
        paper5.classList.remove("flipped");
        paper5.style.zIndex = 3;
        break;
      case 7:
        paper6.classList.remove("flipped");
        paper6.style.zIndex = 2;
        break;
      case 8: // Add case for the new paper
        openBook();
        paper7.classList.remove("flipped");
        paper7.style.zIndex = 1;
        break;
      default:
        throw new Error("unknown state");
    }

    currentLocation--;
  }
}

let slideIndex2 = 0;
let interval;

function showSlides(className) {
  let slides = document.getElementsByClassName(className);
  let dots = document.getElementsByClassName("dot");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex2++;
  if (slideIndex2 > slides.length) {
    slideIndex2 = 1;
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex2 - 1].style.display = "block";
  dots[slideIndex2 - 1].className += " active";
}

function startSlideShow() {
  interval = setInterval(function () {
    showSlides("mySlides2");
  }, 5000);
}

window.onload = function () {
  closeBook(true); // Initial close from the front with a 10% shift
  showSlides("mySlides2");
  startSlideShow();
};

function currentSlide(n) {
  clearInterval(interval);
  slideIndex2 = n - 1;
  showSlides("mySlides2");
  startSlideShow();
}

let dots = document.getElementsByClassName("dot");

for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", function () {
    clearInterval(interval);
    currentSlide(i + 1);
  });
}
