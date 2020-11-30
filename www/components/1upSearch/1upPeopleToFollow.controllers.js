angular.module('starter')

.controller('OneUpPeopleToFollowCtrl', function ($scope, $firebaseObject, $firebaseArray, userDump, profilefac, sendNotification, navigationService, user, $window) {



  $scope.back = function () {
    navigationService.toPage('cards');
  }


  var getPremium = userDump.orderByChild('premium').equalTo(true);

  var myName = user.general($scope.loginID);
  myName.$loaded()
    .then(function (data) {

      $scope.MyName = data.name;
    })

  $scope.premiumArray = $firebaseArray(getPremium);

  $scope.isMe = $scope.loginID;




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

})