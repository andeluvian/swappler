angular.module('starter.controllers')


.controller('oneUpMainMenuCtrl', function ($scope, navigationService, user, $firebaseObject) {


  var getData = $firebaseObject(user.detail($scope.loginID));

  getData.$loaded()
    .then(function (data) {

      $scope.data.name = data.name;
      $scope.data.imageUrl = data.imageUrl;
    })



  $scope.data = [];


  $scope.close = function () {
    navigationService.toPage('cards');
  };

  $scope.myProfile = function () {
    navigationService.toPage('MyProfile');
  };

  $scope.myWantedList = function () {
    navigationService.toPage('mywantedlist');
  };

  $scope.MyChats = function () {
    navigationService.toPage('mychats');
  };

  $scope.MySettings = function () {

    navigationService.toPage('userSettings');
  };
})
