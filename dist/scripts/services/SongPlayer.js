(function() {
    function SongPlayer() {
      var SongPlayer = {};

      /**
      * @desc Curently playing song
      * @type {Object}
      */
      var currentSong = null;

      /**
      * @desc Buzz object audio file
      * @type {Object}
      */
      var currentBuzzObject = null;

      /**
      * @function setSong
      * @desc Stops currently playing song and loads new audio file as currentBuzzObject
      * @param {Object} song
      */
      var setSong = function(song) {
         if (currentBuzzObject) {
             currentBuzzObject.stop();
             currentSong.playing = null;
         }

         currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
         });

         currentSong = song;
      };

      /**
      * @function playSong
      * @desc Plays currently playing song and sets 'playing' property on song object to true
      * @param {Object} song
      */
      var playSong = function(song) {
          currentBuzzObject.play();
          song.playing = true;
          console.log(currentSong);
          console.log(song);
      };

      SongPlayer.play = function(song) {
         //If the clicked song is not the currently playing song
         if (currentSong !== song) {
            setSong(song);
            playSong(song);
            //Else if the clicked song is actually the currently playing song
          } else if (currentSong === song) {
               if (currentBuzzObject.isPaused()) {
                   playSong(song);
               }
          }

      };

      SongPlayer.pause = function(song) {
        console.log("Inside Pause");
          currentBuzzObject.pause();
          song.playing = false;
          console.log("currentBuzzObject is Paused ? : " + currentBuzzObject.isPaused());
          console.log("song.playing :" + song.playing);
      };

     return SongPlayer;
   }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
