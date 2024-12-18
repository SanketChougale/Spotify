let songIndex = 0;
let audioElement = new Audio('song1.mp3');                  //Need .mp3 extension
let masterPlay = document.getElementById('masterPlay');
let forwardPlay = document.getElementById('forwardPlay');
let backwardPlay = document.getElementById('backwardPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let items = Array.from(document.getElementsByClassName('item'));
let songPlay = Array.from(document.getElementsByClassName('songPlay'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: "Mere Mehboob Mere Sanam", filePath: "song1.mp3", coverPath: "cover1.jpg"},
    {songName: "Aaj Ki Raat", filePath: "song2.mp3", coverPath: "cover2.jpg"},
    {songName: "Jamal Kudu", filePath: "song3.mp3", coverPath: "cover3.jpg"},
    {songName: "Chaleya", filePath: "song4.mp3", coverPath: "cover4.jpg"},
    {songName: "Singham Again", filePath: "song5.mp3", coverPath: "cover5.jpg"},
    {songName: "O Mahi", filePath: "song6.mp3", coverPath: "cover6.jpg"},
]

items.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

    }
})

audioElement.addEventListener('timeupdate', ()=>{
   let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
   progressBar.value = progress;
})

progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

const makeAllPlay = ()=>{
    songPlay.forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

songPlay.forEach((element)=>{
    element.addEventListener('click', (e)=>{
        
        if(audioElement.paused){
            makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `song${songIndex}.mp3`;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        masterSongName.innerText = songs[songIndex-1].songName;
        gif.style.opacity = 1;

        }
        else{
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');   
            masterSongName.innerText = songs[songIndex-1].songName;
            gif.style.opacity = 0;
        }
    })
})

forwardPlay.addEventListener('click', ()=>{
    if(songIndex > 6){
        songIndex = 1;
    }else{
        songIndex++;
    }
    audioElement.src = `song${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play(); 
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle'); 
    masterSongName.innerText = songs[songIndex-1].songName;

})

backwardPlay.addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 1;
    }else{
        songIndex--;
    }
    audioElement.src = `song${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();  
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    masterSongName.innerText = songs[songIndex-1].songName;
})

