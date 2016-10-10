(function() {
    function seekBar($document) {

      /**
      * @desc Calculate the seekBar percentage
      * @type {Object}seekBar,{Object}event
      */
      var calculatePercent = function(seekBar, event) {
          var offsetX = event.pageX - seekBar.offset().left;
          var seekBarWidth = seekBar.width();
          var offsetXPercent = offsetX / seekBarWidth;
          offsetXPercent = Math.max(0, offsetXPercent);
          offsetXPercent = Math.min(1, offsetXPercent);
          return offsetXPercent;
      };

//Retuning the object as part of the directory,which works like a factory.
      return {
        templateUrl: '/templates/seek_bar.html',
        replace: true,
        restrict: 'E',
        scope: { },
        link: function(scope, element, attributes) {
            // directive logic to return
            scope.value = 0;
            scope.max = 100;

            var seekBar = $(element);

            /**
            * @desc Determine the % width of the seekBar
            * @type {Object}
            */
            var percentString = function () {
                var value = scope.value;
                var max = scope.max;
                var percent = value / max * 100;
                return percent + "%";
            };

            /**
            * @desc Return the actual width of the seek bar by invoking fuction percentString()
            * @type {Object}
            */
            scope.fillStyle = function() {
                return {width: percentString()};
            };

            /**
            * @desc Handle the seek Bar click event;calculate the percentage and the absolute value.
            * @type {Object}event
            */
            scope.onClickSeekBar = function(event) {
                var percent = calculatePercent(seekBar, event);
                scope.value = percent * scope.max;
            };

            /**
            * @desc Calculate the seek Bar position when the users clicks mousedown and drags the thumbnail
            * @type {Object}event
            */
            scope.trackThumb = function() {
                $document.bind('mousemove.thumb', function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.$apply(function() {
                        scope.value = percent * scope.max;
                    });
                });

                $document.bind('mouseup.thumb', function() {
                    $document.unbind('mousemove.thumb');
                    $document.unbind('mouseup.thumb');
                });
            };
        }
};
    }

    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();
