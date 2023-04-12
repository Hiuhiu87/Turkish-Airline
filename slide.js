let slideIndex = 1;
showSlides(slideIndex)

let nextBtn = document.querySelector("#next");
let previousBtn = document.querySelector("#previous");


function plusSlide(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let slideImage = document.querySelectorAll('.slide-img');
  console.log(slideImage);
  if (n > slideImage.length) slideIndex = 1;
  if (n < 1) slideIndex = slideImage.length;
  for (let i = 0; i < slideImage.length; i++) {
    slideImage[i].style.display = "none";
    slideImage[i].classList.add("slide-right");
  }
  slideImage[slideIndex - 1].style.display = "block";
}



nextBtn.addEventListener('click', function () {
    plusSlide(1);
});

previousBtn.addEventListener('click', function () {
  plusSlide(-1);
});

setInterval(function(){
  plusSlide(1);
},2000);
