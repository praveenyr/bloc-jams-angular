(function() {
    function LandingCtrl() {
        this.heroTitle = "Turn the Music Up!";
    }
console.log("Inside LandingCtrl");
    angular
        .module('blocJams')
        .controller('LandingCtrl', LandingCtrl);
})();
