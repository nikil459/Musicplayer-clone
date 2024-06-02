console.log("welcome to spotify clone")
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let masterPlays = document.getElementById('masterPlays');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let next= document.getElementById('next');
let previous = document.getElementById('previous');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItems'));
let songs = [
    { songName: "papa Meri Jaan", filePath: "songs/1.mp3", coverPath: "covers/1.jpg",duration:"05:21" },
    { songName: "Abrars Entry Jamal", filePath: "songs/2.mp3", coverPath: "covers/2.jpg",duration:"02:14" },
    { songName: "Chalte Chalte", filePath: "songs/3.mp3", coverPath: "covers/3.jpg",duration:"07:38" },
    { songName: "Ho Nahi Sakta", filePath: "songs/4.mp3", coverPath: "covers/4.jpg",duration:"07:43" },
    { songName: "Mera Mulk Mera Desh", filePath: "songs/5.mp3", coverPath: "covers/4.jpg",duration:"06:11" },
    { songName: "Saari Duniya Jalaa ", filePath: "songs/6.mp3", coverPath: "covers/1.jpg",duration:"03:02" },
    { songName: "Satranga", filePath: "songs/7.mp3", coverPath: "covers/1.jpg",duration:"04:31" },
    { songName: "Zinda Rehti Hain", filePath: "songs/8.mp3", coverPath: "covers/3.jpg",duration:"02:23" },
    { songName: "Lollypop Lagelu", filePath: "songs/9.mp3", coverPath: "covers/9.jpg",duration:"05:36" }
]
songItems.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("timeSpan")[0].innerText=songs[i].duration;
})
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        gif.style.opacity = 1;
        // masterPlay.classList.remove('fa-play-circle')
        // masterPlay.classList.add('fa-pause-circle')
    }
    // else{
    //     audioElement.pause();
    //     masterPlay.classList.remove('fa-pause-circle')
    //     masterPlay.classList.add('fa-play-circle')
    // }
})
masterPlays.addEventListener('click', () => {
    if (audioElement.played || audioElement.currentTime > 0) {
        audioElement.pause();
        gif.style.opacity = 0;
    }
})
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration) / 100);
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('pause')
        element.classList.add('play')
        // Assuming the image has an ID of 'myImage'
        // let element = document.getElementById('masterPlay');
        // element.src='pause.png';
        // let condition = true; // Change this condition as needed

        // if (condition) {
        //     imageElement.src = 'play-button.png'; // Change to the first image URL
        // } else {
        //     imageElement.src = 'pause.png'; // Change to the second image URL
        // }

    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        // makeAllPlays();
        // e.target.classList.remove('play');
        // e.target.classList.add('pause');
        songIndex = parseInt(e.target.id);
        // // console.log(songIndex);
        // let a = e.target.id;
        // console.log("index is",a);
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        // audioElement.src = `songs/6.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        // masterPlay.classList.remove('play');
        // masterPlay.classList.add('pause');
    })
})
next.addEventListener('click', () => {
    if (songIndex >= songs.length-1) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('play');
    masterPlay.classList.add('pause');
})
previous.addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length-1;
    }
    else {
        songIndex-= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('play');
    masterPlay.classList.add('pause');
})
audioElement.addEventListener('ended', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    playNextSong();
});
function playNextSong() {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('play');
    masterPlay.classList.add('pause');
}