class Music {
    constructor(track_name, artist, img, music_file){
        this.track_name=track_name;
        this.artist=artist;
        this.img=img;
        this.music_file=music_file;
    }

    getName(){
        return this.title + " " + this.artist;
    }
}

const musicList = [
    new Music("awaken","OYStudio","awaken OYStudio.jpg","1.mp3"),
    new Music("hip hop beat","Enheee","hip hop beat ENheee.jpg","2.mp3"),
    new Music("space","Music Unlimited","space Music Unlimited.jpg","3.mp3"),
    new Music("Blast","AlexiAction","Blast AlexiAction.jpg","4.mp3"),
    new Music("The Blackest Bouquet","Leonell Cassio","Leonell Cassio - The Blackest Bouquet.jpg","5.mp3"),
    new Music("Lifelike","AlexiAction","Lifelike AlexiAction.jpg","6.mp3")
];