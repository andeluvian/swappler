angular.module('swappler.wanted', [])

.controller('OneUpMyWantedCtrl', function ($scope, $stateParams, oneUpItems, profilefac, $firebaseArray, $firebaseObject, navigationService, oneUpItemsServices, mainFactory, oneUpWishList, $rootScope, oneUpDelete, $window) {

  $scope.$on('$ionicView.afterEnter', onViewAfterEnter);



  function onViewAfterEnter() {


    loadWishList();

  }

  function loadWishList() {
    console.log('load');
    var userID = $scope.loginID;
    var wishList = $firebaseArray(profilefac.wishList(userID));
    var itemtable = $firebaseArray(profilefac.itemtable());

    wishList.$watch(function (wishListEvent) {
      combineTable()
      if (wishListEvent.event === "child_removed") {
        combineTable();
      }
    })

    function combineTable() {
      itemtable.$loaded(function (itemInfo) {
        var mapWishList = wishList.map(function (data) {
          var itemQueue = $firebaseArray(mainFactory.child("itemQueue").child(data.$id));
          itemQueue.$watch(function () {
            data.myQueue = itemQueue.$indexFor(userID) + 1;
          })
          data.itemInfo = itemtable.$getRecord(data.$id);
          return data
        })
        $rootScope.wishList = mapWishList;

      })

    }
  }

  var itemtable = $firebaseObject(profilefac.itemtable());
  $scope.itemInfo = function (itemId) {
    return itemtable[itemId];
  }

  $scope.delete = function (itemID, itemName) {

    oneUpDelete.fromWishList(itemID, itemName);




  }

  $scope.itemdetails = function (itemID) {



    $window.location.href = '#/mywantedlist/' + itemID




  };

  $scope.backtoProfile = function () {
    navigationService.toPage('MyProfile');
  };
})