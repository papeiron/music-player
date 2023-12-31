class MusicPlayer {
  constructor(musicList) {
    this.musicList = musicList;
    this.index = 0;
  }

  getMusic() {
    return this.musicList[this.index];
  }

  nextTrack() {
    if (this.index + 1 !== musicList.length) {
      this.index++;
    } else {
      this.index = 0;
    }
  }

  previousTrack() {
    if (this.index == 0) {
      this.index = this.musicList.length - 1;
    } else {
      this.index -= 1;
    }
  }
}
