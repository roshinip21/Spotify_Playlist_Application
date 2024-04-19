const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".nav-bar");
const links=document.querySelector(".nav-bar .login");
const pause=document.getElementById("pause-icon")

hamburger.addEventListener("click", () => {
    navbar.classList.toggle("open");
});

function player()
{
    document.getElementById("player").style.visibility="visible"
}

pause.addEventListener("click",() => {
    pause.classList.replace("fa-pause","fa-play");
})
