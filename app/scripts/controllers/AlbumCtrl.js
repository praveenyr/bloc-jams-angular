(function() {
    function AlbumCtrl(Fixtures,SongPlayer)  {
      // this.albumData = angular.copy(albumPicasso);
          this.albumData = Fixtures.getAlbum();
          this.songPlayer = SongPlayer;
      }

    angular
        .module('blocJams')
        .controller('AlbumCtrl',['Fixtures', 'SongPlayer', AlbumCtrl] );
})();
