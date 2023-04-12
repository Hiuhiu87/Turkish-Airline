const popUp = document.querySelector("#pop-up-main");
const close = document.querySelector("#close-popup");
const allWeb = document.querySelector('.pop-up');

window.onload = function () {
    popUp.style.display = "block";
    allWeb.style.display = "block";
};

close.addEventListener('click', function() {
   popUp.style.display = "none"; 
   allWeb.style.display = "none";
});

// function alert1() {
//     swal({
//         title: "Are you sure?",
//         text: "You will not be able to recover this imaginary file!",
//         icon: "https://www.shutterstock.com/image-vector/hi-hello-banner-speech-bubble-260nw-1567971259.jpg",
//         buttons: true,
//         dangerMode: true,
//     })
// }
