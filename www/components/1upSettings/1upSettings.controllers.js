angular.module('swappler.userSettings', [])

.controller('OneUpSettingsCtrl', function ($scope, notify, $firebaseObject, user, navigationService) {

  var obj = user.general($scope.loginID);
  obj.$loaded()
    .then(function (data) {

      $scope.selection = data.notificationSettings;
      console.log($scope.selection);
    })

  $scope.selection = {};
  $scope.data = [];




  $scope.categories = {
    "1": {
      "name": "Users"
    },
    "2": {
      "name": "Chats"
    },
    "3": {
      "name": "Items"
    },
    "4": {
      "name": "Misc"
    }
  };



  $scope.applyChanges = function () {
    var object = user.detail($scope.loginID).child('notificationSettings');
    object.set($scope.selection);

    console.log(object);
  }

  $scope.close = function () {
    navigationService.toPage('profile');
  }

  $scope.toTour = function () {
    navigationService.toPage('tour');

  }

})