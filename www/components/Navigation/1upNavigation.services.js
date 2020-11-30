angular.module('mainFooter')

.service('navigationService', function ($state, $window) {


  this.toPage = function (navigation) {
    $state.go(navigation);
  }


  this.back = function () {
    console.log("called");
    $window.history.back();
  }



  this.transition = function (direction) {
    window.plugins.nativepagetransitions.slide({
      "direction": direction
    })
  }

})