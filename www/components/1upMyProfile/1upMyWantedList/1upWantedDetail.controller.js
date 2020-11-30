angular.module('swappler.wanted')

.controller('OneUpWantedDetailCtrl', function ($scope, $stateParams, profilefac, $firebaseArray, $firebaseObject, navigationService, $state, oneUpItems, oneUpChatRoom, sendNotification, oneUpDelete) {
  var itemId = $stateParams.itemId;
  var returnedObject = [];



  for (var i in $scope.wishList) {
    if ($scope.wishList[i].$id === $stateParams.itemId) {
      returnedObject.push($scope.wishList[i]);
    }
  }

  $scope.detailItem = returnedObject[0].itemInfo;
  $scope.queueNumber = returnedObject[0].myQueue;
  var ownerID = returnedObject[0].itemInfo.submitedby;

  $scope.ownerInfo = $firebaseObject(profilefac.usertable().child(ownerID));

  $scope.delete = function () {
    var itemName = $scope.detailItem.name;

    oneUpDelete.fromWishList(itemId, itemName);




  }
  $scope.backtoProfile = function () {
    navigationService.toPage('mywantedlist');
  };
})