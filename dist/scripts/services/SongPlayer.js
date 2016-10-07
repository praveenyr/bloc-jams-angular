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

      };

      /**
      * @function play
      * @desc Plays a new song when clicked, or plays the current song which has been paused
      * @param {Object} song
      */
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

      /**
      * @function puase
      * @desc Pauses the currently playing song when clicked
      * @param {Object} song
      */
      SongPlayer.pause = function(song) {
          currentBuzzObject.pause();
          song.playing = false;
      };

     return SongPlayer;
   }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
