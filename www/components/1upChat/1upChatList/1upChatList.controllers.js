angular.module('1up.ChatRoom')

.controller('1upChatListCtrl', function ($scope, chatList, $firebaseArray, mainFactory, $firebaseObject, user, oneUpItems, $location, $ionicTabsDelegate) {

  var list = new chatList(mainFactory.child('chatRoom'));

  var getUserInfo = user.original();
  var getItemInfo = oneUpItems.object();

  list.$watch(function () {
    $scope.sellerList = list.roomList("selling", $scope.loginID);
    $scope.buyerList = list.roomList("buying", $scope.loginID);
  })

  $scope.userInfo = userInfo;
  $scope.itemInfo = itemInfo;

  function userInfo(userId) {
    return getUserInfo[userId];
  }

  function itemInfo(itemId) {
    return getItemInfo[itemId];
  }

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
})