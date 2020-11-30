angular.module('swappler.followers', [])

.controller('oneUpFollowersCtrl', function ($scope, $firebaseArray, profilefac, $ionicTabsDelegate, user, $window, $firebaseObject, sendNotification) {


  $scope.goForward = function () {
    var selected = $ionicTabsDelegate.selectedIndex();
    if (selected != -1) {
      $ionicTabsDelegate.select(selected + 1);
    }
  }

  $scope.goBack = function () {
    var selected = $ionicTabsDelegate.selectedIndex();
    if (selected != -1 && selected != 0) {
      $ionicTabsDelegate.select(selected - 1);
    }
  }


  var getUserInfo = user.original();

  var getname = $firebaseObject(user.detail($scope.loginID));
  getname.$loaded()
    .then(function (data) {
      $scope.myName = data.name;
    })

  $scope.userInfo = function (userID) {
    return getUserInfo[userID];
  }


  $scope.test = $firebaseArray(profilefac.following($scope.loginID));

  $scope.test.$watch(function () {
    var convertedArray = $scope.test.map(function (bao) {
      return bao.$id
    })

    $scope.clicked = function (id) {


      var a = convertedArray.indexOf(id);

      if (a !== -1) {
        return true
      } else {
        return false

      }

    }

  })



  $scope.profile =
    function (userID) {
      $window.location.href = '#/peopleDetails/' + userID;

    }


  $scope.follow = function (id) {


    profilefac.following($scope.loginID).child(id).set(true);
    profilefac.followers(id).child($scope.loginID).set(true);

    sendNotification.iFollowYou($scope.MyName, id)

  }

  $scope.unfollow = function (id) {

    profilefac.following($scope.loginID).child(id).remove();
    profilefac.followers(id).child($scope.loginID).remove();


  }





  var followerArray = $firebaseArray(profilefac.followers($scope.loginID));

  followerArray.$loaded()
    .then(function (data) {

      $scope.followerA = data;
    })


  var followingArray = $firebaseArray(profilefac.following($scope.loginID));


  followingArray.$loaded()
    .then(function (data) {

      $scope.followingA = data;
    })



})