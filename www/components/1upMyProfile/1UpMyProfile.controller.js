angular.module('swappler.myprofile', [])


.controller("OneUpMyProfileCtrl", function ($scope, $firebaseObject, navigationService, $firebaseArray, profilefac, $window, $ionicScrollDelegate) {

  var itemArray = $firebaseArray(profilefac.items($scope.loginID));
  var followerArray = $firebaseArray(profilefac.followers($scope.loginID));
  var followingArray = $firebaseArray(profilefac.following($scope.loginID));
  var getData = $firebaseObject(profilefac.userinformation($scope.loginID));


  var items = $firebaseObject(profilefac.items($scope.loginID));
  var userdata = $firebaseObject(profilefac.userinformation($scope.loginID));


  $scope.$on('$ionicView.afterEnter', onAfterEnter);
  $scope.$on('$ionicView.loaded', onLoaded);

  function onLoaded() {
    $scope.itemA = itemArray;
    $scope.follower = followerArray;
    $scope.followings = followingArray;
    $scope.limitItem = 0;
  }

  function onAfterEnter() {

    $scope.getScrollPosition = function () {

      var scrollPosition = $ionicScrollDelegate.getScrollPosition().top;
      if (scrollPosition > 0) {
        //$scope.itemA = itemArray;
        $scope.limitItem = 999999;
        console.log($scope.limitItem);
      }
    }
    getData.$loaded()
      .then(function (data) {
        console.log(data.premium);
        if (data.premium === true) {

          $scope.isPremium = true;
        } else {
          $scope.isPremium = false;

        }
        $scope.data = getData;

      })


    $scope.itemID = items;

    $scope.fb = function () {

      $window.open('' + $scope.data.facebook);

    }

    $scope.tw = function () {

      $window.open('https://twitter.com/intent/user?screen_name=' + $scope.data.twitter);

    }
    $scope.blog = function () {

      $window.open('https://' + $scope.data.blog);

    }
    $scope.ig = function () {

      $window.open('https://instagram.com/' + $scope.data.instagram);

    }
  }





  $scope.gotoedit = function () {
    console.log('Supposed to go to updateprofile');
    navigationService.toPage('updateprofile');
  };

  $scope.viewAll = function () {
    navigationService.toPage('transactions');

  }

  $scope.goToFollow = function () {

    navigationService.toPage('follwingAndFollowers');
  }


  $scope.backtoProfile = function () {

    navigationService.toPage('MyProfile');
  };



  $scope.expireDateCounter = function (expireDate) {
    var today = new Date().getTime();
    var dayLeft = Math.round((expireDate - today) / 86400000) - 1;

    if (dayLeft <= 1) {
      return dayLeft + ' day';
    } else {
      return dayLeft + ' days';
    }
  }
})