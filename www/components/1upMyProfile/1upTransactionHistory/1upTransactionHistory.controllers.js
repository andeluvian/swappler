angular.module('swappler.transaction', [])

.controller('oneUpTransactionsCtrl', function ($stateParams, $scope, $firebaseObject, $firebaseArray, $ionicTabsDelegate, transactions, user) {

  var getUserInfo = user.original();

  $scope.sellerInfo = function (userID) {
    return getUserInfo[userID];
  }

  var soldItemArray = $firebaseArray(transactions.soldItems($scope.loginID));

  soldItemArray.$loaded()
    .then(function (data) {


      $scope.sellingItems = data;
      var price = 0;
      var totalPrice = 0;
      data.forEach(function (bao) {

        price = bao.price;
        totalPrice = totalPrice + price;

      })
      $scope.totalP = totalPrice;
    })


  var boughtItemArray = $firebaseArray(transactions.boughtItems($scope.loginID));
  boughtItemArray.$loaded()
    .then(function (data) {

      $scope.purchasedItems = data;

      var price = 0;
      var totalPrice = 0;
      data.forEach(function (bao) {

        price = bao.price;
        totalPrice = totalPrice + price;

      })

      $scope.totalP2 = totalPrice;


    })







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



  $scope.positiveRating = function (itemID) {
    var object =

      transactions.general().child(itemID).child('rating');

    object.set('good');
  }
  $scope.negativeRating = function (itemID) {
    var object = transactions.general().child(itemID).child('rating');

    object.set('bad');
  }
})