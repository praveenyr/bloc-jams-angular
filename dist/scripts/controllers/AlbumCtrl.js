(function() {
    function AlbumCtrl(Fixtures)  {
      // this.albumData = angular.copy(albumPicasso);
      this.albumData = Fixtures.getAlbum;
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl',['Fixtures', AlbumCtrl] );
})();
