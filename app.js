const player = new MusicPlayer(musicList);
let music = player.getMusic();
const music_body = document.querySelector('#music-body');
const forward_button = document.querySelector('#forward-button');
const backward_button = document.querySelector('#backward-button');
const play_button = document.querySelector('#play-button');
const audio = document.querySelector('#music-file');
const main_div = document.querySelector('.main-div');
const img = document.querySelector('#img');
const progress_bar = document.querySelector('#progress-bar');
const volume_controller = document.querySelector('#volume-controller');
let elapsed_time = document.querySelector('#elapsed-time');
let track_length = document.querySelector('#track-length');
let volume_mute = document.getElementById('volume-mute');
const music_list = document.querySelector('#music-list');
const music_list_menu = document.querySelector('#music-list-menu');
let music_list__track_name = document.querySelector('#music-list__track-name');

let isPlaying;
let isMuted = 0;
let vol_cont_value;
let opened = 0;

const displayMusic = (music) => {
  let track_name = music.track_name;
  let artist = music.artist;
  let img = music.img;
  let music_file = music.music_file;

  let tag = `
    <div id="music-text" class="music-text">
        <h2 id="music-name-text">${track_name}</h2>
        <p id="music-artist-text">${artist}</p>
    </div>
    <div id="music-img" class="music-img">
        <img id="img" src="./img/${img}" alt="">
        <div class="circle"></div>
    </div>
    `;

  music_body.innerHTML = tag;

  audio.src = './music/' + music_file;
};

displayMusic(music);
progress_bar.value = 0;

forward_button.addEventListener('click', () => {
  next_Track();
});

const next_Track = () => {
  player.nextTrack();
  let music = player.getMusic();
  displayMusic(music);

  isPlaying = main_div.classList.contains('playing');
  isPlaying ? playMusic() : pauseMusic();
};

backward_button.addEventListener('click', () => {
  previous_Track();
});

const previous_Track = () => {
  player.previousTrack();
  let music = player.getMusic();
  displayMusic(music);

  isPlaying = main_div.classList.contains('playing');
  isPlaying ? playMusic() : pauseMusic();
};

play_button.addEventListener('click', () => {
  isPlaying = main_div.classList.contains('playing');

  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

const playMusic = () => {
  audio.play();
  main_div.classList.add('playing');
  play_button.querySelector('i').classList = 'fa-solid fa-pause';
  document.getElementById('img').style.animationPlayState = 'running';
};

const pauseMusic = () => {
  audio.pause();
  main_div.classList.remove('playing');
  play_button.querySelector('i').classList = 'fa-solid fa-play';
  document.getElementById('img').style.animationPlayState = 'paused';
};

const timeConvert = (value) => {
  const minute = Math.floor(value / 60);
  const second = Math.floor(value % 60);
  const second2 = second < 10 ? `0${second}` : second;

  return `${minute}:${second2}`;
};

//progress bar
audio.addEventListener('loadedmetadata', () => {
  track_length.innerText = timeConvert(audio.duration);
  progress_bar.max = Math.floor(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  elapsed_time.innerText = timeConvert(audio.currentTime);
  progress_bar.value = audio.currentTime;
});

progress_bar.addEventListener('input', () => {
  elapsed_time.innerText = timeConvert(progress_bar.value);
  audio.currentTime = progress_bar.value;
});

//music controller
volume_controller.addEventListener('loadedmetadata', () => {
  volume_controller.max = 100;
  volume_controller.min = 0;
});

volume_controller.addEventListener('input', () => {
  vol_cont_value = volume_controller.value;
  audio.volume = vol_cont_value / 100;
});

volume_mute.addEventListener('click', () => {
  if (isMuted) {
    unmuteMusic();
  } else {
    muteMusic();
  }
});

const muteMusic = () => {
  audio.muted = true;
  isMuted = true;
  volume_mute.innerText = 'volume_off';
  volume_controller.value = 0;
};

const unmuteMusic = () => {
  audio.muted = false;
  isMuted = false;
  volume_mute.innerText = 'volume_up';
  volume_controller.value = vol_cont_value;
};

music_list_menu.addEventListener('click', () => {
  let x = music_list.classList.contains('hide');
  opened ? 0 : musiclistDisplay();
  x ? music_list.classList.remove('hide') : music_list.classList.add('hide');
});

music_list.addEventListener('mouseleave', () => {
  music_list.classList.add('hide');
});

const musiclistDisplay = () => {
  let track_name = music.track_name;
  let artist = music.artist;
  let img = music.img;
  let index;
  let tag;

  for (let musics of musicList) {
    tag = `
        <li onclick="selectedMusic(this)" class="track-box">   
            <div class="music-list-img">
                <img src="./img/${musics.img}" alt="">
            </div>
            <div class="music-list-song-info">
                <span id="music-list__track-name">${musics.track_name}</span>
                <p>${musics.artist}</p>
                <hr class="hr">
            </div>
        </li>
        `;
    music_list.insertAdjacentHTML('beforeend', tag);
  }

  opened = 1;
};

const selectedMusic = (whichsong) => {
  let selected;

  for (let song of musicList) {
    if (
      whichsong.children[1].querySelector('span').textContent == song.track_name
    ) {
      selected = song;
    }
  }
  displayMusic(selected);
  playMusic();
  isPlaying = false;
};
