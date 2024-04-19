const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".nav-bar");
const links=document.querySelector(".nav-bar .login");
const play=document.getElementById("play-icon");
const next=document.getElementById("next-icon");
const prev = document.getElementById("prev-icon");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const audio = document.getElementById("audio")
const volumeCol = document.getElementById("volume-hover");
const volumeManager = document.getElementById("volumeManager");
const volume=document.getElementById("volume-icon");
const cover=document.getElementById("cover");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const repeat = document.getElementById("repeat");
const mode = document.getElementById("mode");
const random = document.getElementById("shuffle");

let isPlaying =false;
let counter=0;
let counting=0;

//hamburger
hamburger.addEventListener("click", () => {
    navbar.classList.toggle("open");
});

const songs =[
    {
        name:'Emls',
        artist:'Eminem',
        title:'Lose Yourself',
    },
    {
        name:'Mortals',
        artist:'Warriyo',
        title:  'Mortals',
    },
    {
        name:'lknumb',
        artist:'Linkin Park',
        title:'Numb',
    },
    {
        name:'TWSB',
        artist:'Weekend',
        title:'Star Boy',
    },
    {
        name:'Childish',
        artist:'Childish Gambino',
        title:'This is America',
    },
    {
        name:'BEE',
        artist:'Billie Eilish',
        title:'Everything i wanted',
    },
    {
        name:'jl',
        artist:'Solomon',
        title:  'All of me',
    },
];

function loadSong(songs)
{
    artist.textContent = songs.artist;
    title.textContent =songs.title;
    audio.src= `static/music/${songs.name}.mp3`;
    cover.src = `static/images/${songs.name}.jpg`;
};
var songIndex=0;

loadSong(songs[songIndex]);

//display volume
function volumeShow()
{
    document.getElementById("volumeManager").style.display="inline-flex";
}
function volumenone()
{
    document.getElementById("volumeManager").style.display="none";
}

//volume
function volumeChange()
{
    audio.volume = volumeManager.value / 100;
}

//call the media player
function player()
{
    document.getElementById("player").style.visibility="visible";
    loadSong(songs[0]);
    playMusic();
}
function player1()
{
    document.getElementById("player").style.visibility="visible";
    loadSong(songs[1]);
    playMusic();
}
function player2()
{
    document.getElementById("player").style.visibility="visible";
    loadSong(songs[2]);
    playMusic();
}
function player3()
{
    document.getElementById("player").style.visibility="visible";
    loadSong(songs[3]);
    playMusic();
}
function player4()
{
    document.getElementById("player").style.visibility="visible";
    loadSong(songs[4]);
    playMusic();
}
function player5()
{
    document.getElementById("player").style.visibility="visible";
    loadSong(songs[5]);
    playMusic();
}
function player6()
{
    document.getElementById("player").style.visibility="visible";
    loadSong(songs[6]);
    playMusic();
}

//popup toogle
function popup()
{
    var x = document.getElementById("popform");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

//play
const playMusic = () => {
    isPlaying = true;
    var audio = document.getElementById("audio");
    audio.play();
    play.classList.replace("fa-play","fa-pause");
};

//pause
const pauseMusic = () => {
    isPlaying = false;
    var audio = document.getElementById("audio");
    audio.pause();
    play.classList.replace("fa-pause","fa-play");
};

//nextsong
function nextSong(){
    songIndex = (songIndex + 1)% songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

//prevsong
function prevSong(){
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}
//update progress
function updateProgress(e){
    const {duration,currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration)* 100;
    progress.style.width = `${progressPercent}%`;
}

//click progress
function setProgress(e){
    const width= this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime=(clickX/width)*duration;
}

//volumemute
volumeManager.addEventListener("change", volumeIcon);


//change volume icon
function volumeIcon()
{
    if(volumeManager.value<1)
    {
        volume.classList.replace("fa-volume-up","fa-volume-mute");
        volume.classList.replace("fa-volume-down","fa-volume-mute");
    }
    else if(volumeManager.value<50)
    {
        volume.classList.replace("fa-volume-up","fa-volume-down");
        volume.classList.replace("fa-volume-mute","fa-volume-down");
    }
    else
    {
        volume.classList.replace("fa-volume-down","fa-volume-up");
        volume.classList.replace("fa-volume-mute","fa-volume-up");
    }
}

//mute and reset
const mutevolume =() =>
{
    audio.volume=0;
    volumeManager.value=0;
    volume.classList.replace("fa-volume-up","fa-volume-mute");
    volume.classList.replace("fa-volume-down","fa-volume-mute");

};

const resetvolume=() =>
{
    audio.volume= .4;
    volumeManager.value=35;
    volume.classList.replace("fa-volume-up","fa-volume-down");
    volume.classList.replace("fa-volume-mute","fa-volume-down");

};


//play,pause condition
play.addEventListener("click" , () => {
    if(isPlaying)
    {
        pauseMusic();
    }
    else
    {
        playMusic();
    }
});


//reset and mute condtion
volume.addEventListener("click", () => {
    if(volumeManager.value==0)
    {
        resetvolume();
    }
    else
    {
        mutevolume();
    }
});

//light and drak theme
function Modes()
{
    if( document.getElementById("player").style.background!=="white")
    {
        document.getElementById("player").style.background="white";
        document.getElementById("player").style.color="rgb(68, 136, 0)";
        artist.style.color="rgba(34, 34, 34, 0.979)";
        title.style.color="rgba(34, 34, 34, 0.979)";
        progressContainer.style.background="rgba(34, 34, 34, 0.979)";
        progress.style.background="grey";
        document.getElementById("player").style.transition="all 1s"
    }
    else
    {
        document.getElementById("player").style.background="rgba(34, 34, 34, 0.979)";
        document.getElementById("player").style.color="rgb(68, 136, 0)";
        artist.style.color="white";
        title.style.color="white";
        progressContainer.style.background="rgb(65, 64, 64)";
        progress.style.background="white";
    }
}

//loop
repeat.addEventListener("click", () => {
    counter++;
    if(counter%2==1)
    {
        audio.loop = true;
        repeat.style.transform= "rotate(360deg)";
        repeat.style.fontSize = "20px"
        repeat.style.boxShadow = " 0 0 2px green";
        repeat.style.transition= "all 1s"

    }
    else
    {
        audio.loop = false;
        repeat.style.transform= "none";
        repeat.style.fontSize = "16px";
        repeat.style.boxShadow = " none";
        repeat.style.transition= "all 1s";

    }
});

function shuffle()
{
    audio.addEventListener("ended",()=>{
        var newsong= Math.floor((Math.random()*10)+1);
        loadSong(songs[newsong]);
        playMusic();
    })
}

function resetsong()
{
    audio.addEventListener("ended",()=>{
        songIndex=0;
        loadSong(songs[songIndex]);
        playMusic();
        audio.addEventListener("ended",()=>{
            loadSong(songs[songIndex]);
            playMusic();
            nextSong();
        })
    })
}

//next,prev define
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

//update Time
audio.addEventListener("timeupdate", updateProgress);

//clicked on progressbar
progressContainer.addEventListener("click", setProgress);

//autoplay
audio.addEventListener("ended", nextSong);

//light and dark
mode.addEventListener("click" , Modes);


function search()
{
    let filter = document.getElementById("myInput").value.toUpperCase();
    let ul=document.getElementById("Myul");
    let li = ul.getElementsByTagName("li");

    for(i=0;i<li.length;i++)
    {
        let a =li[i].getElementsByTagName("a")[0];
        let textVaule= a.textContent || a.innerHTML;

        if(textVaule.toUpperCase().indexOf(filter)> -1)
        {
            li[i].style.display = '';
        }
        else
        {
            li[i].style.display="none";
        }
    }
}





random.addEventListener("click" , () =>{
    counting++;
    console.log(counting);
    if(counting%2==1)
    {
        random.style.transform= "rotate(180deg)";
        random.style.fontSize = "20px";
        random.style.boxShadow = " 0 0 2px green";
        random.style.transition= "all 1s";
        shuffle();
    }
    else
    {
        random.style.transform= "none";
        random.style.fontSize = "16px"
        random.style.transition= "all 1s";
        random.style.boxShadow = " none";
        resetsong();
    }
});
