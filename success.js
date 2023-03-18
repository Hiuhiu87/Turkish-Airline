const submitBtn = document.querySelector("#submit");
const popUpSuccess = document.querySelector(".pop-up-success");
const resetBtn = document.querySelector("#reset");
const closeBtn = document.querySelector("#close-success");

submitBtn.addEventListener('click', function () {
    popUpSuccess.style.display = "block";
})

closeBtn.addEventListener('click', function () {
    popUpSuccess.style.display = "none";
})


resetBtn.addEventListener('click', function () {
    window.onload;
})