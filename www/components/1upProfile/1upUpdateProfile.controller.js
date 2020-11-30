angular.module('starter.controllers')


.controller("OneUpUpdateProfileCtrl", function ($scope, $firebaseObject, user, userDump, navigationService) {



  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

    if (fromState.name == "login") {

      $scope.destination = 'peopleToFollow';
    }
    if (fromState.name == "MyProfile") {

      $scope.destination = 'MyProfile';
    }
  })


  var getData = $firebaseObject(user.detail($scope.loginID));

  getData.$loaded()
    .then(function (data) {

      console.log(data.premium);

      if (data.premium === true) {

        $scope.isPremium = true;

      } else {
        $scope.isPremium = false;

      }

      $scope.data.about = data.about;
      $scope.data.name = data.name;
      $scope.data.twitter = data.twitter;
      $scope.data.blog = data.blog;
      $scope.data.instagram = data.instagram;
      $scope.data.title = data.title;



      $scope.data.imageUrl = data.imageUrl;
    })



  $scope.data = [];







  $scope.update = function (destination) {
    var dumpRef = userDump.child($scope.loginID);

    dumpRef.child('about').set($scope.data.about);
    dumpRef.child('twitter').set($scope.data.twitter);
    dumpRef.child('instagram').set($scope.data.instagram);
    dumpRef.child('blog').set($scope.data.blog);
    dumpRef.child('title').set($scope.data.title);

    navigationService.toPage(destination);


  }

  $scope.cancel = function (destination) {
    navigationService.toPage(destination);
  }




})