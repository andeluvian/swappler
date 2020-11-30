angular.module('swappler.tour', [])

.controller('OneUpTourCtrl', function ($scope, navigationService) {


  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    console.log(fromState.name);
    if (fromState.name !== "login") {

      $scope.ref = false;
    }
    if (fromState.name == "login") {

      $scope.ref = true;
    }
  })


  $scope.endTour = function () {

    if ($scope.ref === true) {

      $scope.myLogin();

    } else {

      $scope.mySettings();

    }



  }

  $scope.mySettings = function () {
    navigationService.toPage('userSettings');
  }

  $scope.myLogin = function () {
    navigationService.toPage('login');
  }
})