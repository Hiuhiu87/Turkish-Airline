const popUp = document.querySelector("#pop-up");
const close = document.querySelector("#close-popup");

window.onload = function () {
    popUp.style.display = "block";
};

close.addEventListener('click', function() {
   popUp.style.display = "none"; 
});

