angular.module('starter')


.controller('OneUpPeopleDetailCtrl', function ($scope, $stateParams, profilefac, $firebaseArray, $firebaseObject, navigationService, sendNotification, $window) {


  var followers = $firebaseArray(profilefac.followers($stateParams.userId));
  var following = $firebaseArray(profilefac.following($stateParams.userId));
  var userdetail = $firebaseObject(profilefac.userinformation($stateParams.userId));

  var myInfo = $firebaseObject(profilefac.userinformation($scope.loginID));


  $scope.$on('$ionicView.afterEnter', viewLoaded);

  function viewLoaded() {
    console.log('view is loaded');
  }

  userdetail.$loaded()
    .then(function (data) {
      console.log(data.premium);

      if (data.premium === true) {
        $scope.isPremium = true;
      } else {
        $scope.isPremium = false;

      }
    })

  $scope.data = userdetail;
  var solditems = $firebaseArray(profilefac.userinformation($stateParams.userId).child('sellItems'));

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





  var wishList = $firebaseArray(profilefac.myitems($stateParams.userId));
  var itemtable = $firebaseObject(profilefac.itemtable());


  $scope.wishList = wishList;
  $scope.itemInfo = function (itemId) {
    return itemtable[itemId];
  }

  var followingList = $firebaseArray(profilefac.following($stateParams.userId));
  var followingtable = $firebaseObject(profilefac.usertable());


  $scope.followingList = followingList;
  $scope.followingInfo = function (followingId) {
    return followingtable[followingId];
  }

  var followerList = $firebaseArray(profilefac.followers($stateParams.userId));
  var followertable = $firebaseObject(profilefac.usertable());


  $scope.followerList = followerList;
  $scope.followerInfo = function (followerId) {
    return followertable[followerId];
  }



  $scope.ifollow = function () {
    console.log($stateParams.userId);
    profilefac.following($scope.loginID).child($stateParams.userId).set(true);
    profilefac.followers($stateParams.userId).child($scope.loginID).set(true);


    myInfo.$loaded(function (data) {
      sendNotification.iFollowYou(data.name, $stateParams.userId);

    })

  }


  $scope.unfollow = function () {
    console.log($scope.loginID);
    profilefac.following($scope.loginID).child($stateParams.userId).remove();
    profilefac.followers($stateParams.userId).child($scope.loginID).remove();

  }

  var obj = $firebaseArray(profilefac.following($scope.loginID));

  obj.$watch(function () {

    var index = obj.$indexFor($stateParams.userId);

    console.log(index);
    if (index === -1) {
      $scope.isFollow = true;
    } else {
      $scope.isFollow = false;
    }
  });








  $scope.userdetail = userdetail;
  $scope.followers = followers;
  $scope.following = following;
  $scope.deals = solditems;

  console.log($stateParams.myitems);

  $scope.testFollowBtn = function () {
    $scope.isFollow = false;
  }

})