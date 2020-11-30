angular.module('starter.controllers')

.controller("MyProfileCtrl", ["$scope", "$firebaseObject", "$firebaseArray", "$firebaseAuth", "Profile", "$state",
  function ($scope, $firebaseObject, $firebaseArray, $firebaseAuth, Profile, $state, $rootScope) {

    var fb = new Firebase('https://swappler.firebaseio.com/');
    var fbAuth = $firebaseAuth(fb);

    $scope.listCanSwipe = true;
    $scope.shouldShowDelete = false;
    $scope.whichItem = $state.params.itemId;
    //console.log($scope.whichItem);



    var authData = fbAuth.$getAuth();
    $scope.authData = authData
    $scope.profile = Profile(authData.uid);
    console.log($scope.profile);


    var followersArray = [];
    var followingsArray = [];
    var itemsArray = [];


    $scope.profile.$loaded().then(function () {
      angular.forEach($scope.profile.followers,
        function (value, key) {


          var followerID = value.user;
          var userData = $firebaseObject(fb.child('users/' + followerID));
          userData.$loaded(function (data) {
            followersArray.push(data);

          });
        });

      $scope.followers = followersArray;
    });


    $scope.profile.$loaded().then(function () {
      angular.forEach($scope.profile.following,
        function (value, key) {

          var followerID = value.user;
          console.log(followerID);
          var userData = $firebaseObject(fb.child('users/' + followerID));
          userData.$loaded(function (data) {
            followingsArray.push(data);

          });
        });

      $scope.followings = followingsArray;
    });

    //loop through profile to get items ids  and their details
    $scope.profile.$loaded().then(function () {
      angular.forEach($scope.profile.items,
        function (value, key) {
          //console.log(key, value);

          var followerID = value.item;
          var userData = $firebaseObject(fb.child('items/' + followerID));
          userData.$loaded(function (data) {
            itemsArray.push(data);
            console.log(data);

          });
        });

      $scope.userItems = itemsArray;
      console.log($scope.userItems);

    });


    $scope.delete = function (item, index) {
      var obj = $firebaseObject(fb.child('items/' + item.$id));
      $scope.items = $firebaseArray(fb.child("users/" + authData.uid + "/items"));
      obj.$remove().then(function (ref) {
        // data has been deleted locally and in the Firebase database
        $scope.items.$remove($scope.items[index]).then(function (ref) {
          ref.key() === item.$id; // true
          $scope.userItems.splice(index, 1)
          alert('Deleted item :' + ref.key());
        });
        // Have to Remove the item reference from user Profile aswell Here.....

      }, function (error) {
        console.log("Error:", error);
      });

      //Delete from main item list also
      obj.$remove().obj[index].then(function (ref) {
        ref.key() === item.$id;

      }, function (error) {
        console.log("Error = ", error);
      });




    };

    $scope.gotoedit = function () {
      console.log('Supposed to go to updateprofile');
      $state.go('updateprofile');
    };


    $scope.close = function () {
      console.log('Supposed to go to Cards page');
      $state.go('profile');
    };

    $scope.backtoProfile = function () {

      $state.go('MyProfile');
    };

    $scope.edit = function (item) {

      alert('Edit Item: ' + item.$id);
    }


  }])

// JavaScript source code