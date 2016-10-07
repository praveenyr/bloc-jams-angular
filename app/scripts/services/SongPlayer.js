(function() {
    function SongPlayer(Fixtures) {
      var SongPlayer = {};

      /**
      * @desc Retrives and stores the current album
      * @type {Object}
      */
     var currentAlbum = Fixtures.getAlbum();

      /**
      * @desc Buzz object audio file
      * @type {Object}
      */
      var currentBuzzObject = null;

      /**
      * @function setSong
      * @desc Stops currently playing song,loads new audio file as currentBuzzObject and then sets the current song
      * @param {Object} song
      */
      var setSong = function(song) {
         if (currentBuzzObject) {
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
         }

         currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
         });

         SongPlayer.currentSong = song;
      };

      /**
      * @function playSong
      * @desc Plays currently playing song and sets 'playing' property on song object to true
      * @param {Object} song
      */
      var playSong = function(song) {
          currentBuzzObject.play();
          song.playing = true;

      };

      /**
      * @desc Retrieves the index of the curently playing song
      * @type {Object} song
      */
      var getSongIndex = function(song) {
          return currentAlbum.songs.indexOf(song);
      };

      /**
      * @desc Curently playing song
      * @type {Object}
      */
      SongPlayer.currentSong = null;
      /**
      * @function play
      * @desc Plays a new song when clicked, or plays the current song which has been paused
      * @param {Object} song
      */
      SongPlayer.play = function(song) {
        // assign (1) the value of song or (2) the value of SongPlayer.currentSong to the song variable.
        //The first condition occurs when we call the methods from the Album view's song rows, and the second condition occurs when we call the methods from the player bar.
        song = song || SongPlayer.currentSong;
         //If the clicked song is not the currently playing song
         if (SongPlayer.currentSong !== song) {
            setSong(song);
            playSong(song);
            //Else if the clicked song is actually the currently playing song
          } else if (SongPlayer.currentSong === song) {
               if (currentBuzzObject.isPaused()) {
                   playSong(song);
               }
          }

      };

      /**
      * @function puase
      * @desc Pauses the currently playing song when clicked
      * @param {Object} song
      */
      SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;

          currentBuzzObject.pause();
          song.playing = false;
      };

      /**
      * @function previous
      * @desc Retreives the current playing song index and calculates the previous index
      * @param {Object} song
      */
      SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

          if (currentSongIndex < 0) {
              currentBuzzObject.stop();
              SongPlayer.currentSong.playing = null;
          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }

      };

     return SongPlayer;
   }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
