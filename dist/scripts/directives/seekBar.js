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

//Retuning the object from the directive,which works like a factory.
      return {
        templateUrl: '/templates/directives/seek_bar.html',
        replace: true,
        restrict: 'E',
        scope: {
            onChange: '&'
        },
        link: function(scope, element, attributes) {
            // directive logic to return
            scope.value = 0;
            scope.max = 100;

            var seekBar = $(element);

            attributes.$observe('value', function(newValue) {
                scope.value = newValue;
            });

            attributes.$observe('max', function(newValue) {
                scope.max = newValue;
            });

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
            * @desc Return the width of the seek bar thumb by invoking fuction percentString()
            * @type {Object}
            */
            scope.thumbStyle = function() {
                return {left: percentString()};
            };

            /**
            * @desc Handle the seek Bar click event;calculate the percentage and the absolute value.
            * @type {Object}event
            */
            scope.onClickSeekBar = function(event) {
                var percent = calculatePercent(seekBar, event);
                scope.value = percent * scope.max;
                notifyOnChange(scope.value);
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
                        notifyOnChange(scope.value);
                    });
                });

                $document.bind('mouseup.thumb', function() {
                    $document.unbind('mousemove.thumb');
                    $document.unbind('mouseup.thumb');
                });
            };

            /**
            * @desc insert the local newValue variable as the value argument we pass into the SongPlayer.setCurrentTime()
            * function into the HTML on-change view
            * @type {number}
            */
            var notifyOnChange = function(newVal) {
                if (typeof scope.onChange === 'function') {
                    scope.onChange({value: newVal});
                }
            };
        }
};
    }

    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();
