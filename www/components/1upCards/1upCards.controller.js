angular.module('1up.Cards')

.controller('1upCardsCtrl', function ($scope, oneUpItems, oneUpItemsServices, userDump, $firebaseArray, $firebaseObject, mainFactory, oneUpTimestamp, $ionicModal, $state, oneUpChatRoom, user, oneUpCardFactory, $ionicPlatform, $ionicPopup, $window, $ionicLoading, getUserAuthID, filterCard, navigationService, oneUpCards, oneUpLoad, $rootScope, $cordovaGeolocation, OneUpAlert) {

  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

    if (fromState.name == "categories") {

      $scope.$on('$ionicView.enter', listLoad);
    }
  })
  $scope.$on('$ionicView.afterEnter', function () {

    if ($scope.loginID != undefined) {

      listLoad();
    }

  });

  var items = oneUpItems.array();
  var users = oneUpItems.user();

  $ionicPlatform.onHardwareBackButton(function () {
    if ($state.current.name === 'cards') {
      $state.go('cards');
      OneUpAlert.exitApp();

    }
  })



  var itemRef = oneUpItems.original();


  function listLoad() {


    oneUpLoad.show('Loading products...');
    var userSetting = $firebaseObject(user.settings($scope.loginID));
    userSetting.$loaded(function () {

      var list = new filterCard(oneUpItems.searchByCategory(userSetting.searchCategory));
      list.$loaded(function () {

        console.log('card is loaded');
        oneUpLoad.hide();

        var topArrays = ['01', '02', '03', '04'];
        var minshoe = userSetting.minshoe;
        var maxshoe = userSetting.maxshoe;
        var distance = userSetting.distance;
        var clothesSize = userSetting.size;
        var minprice = userSetting.minprice;
        var maxprice = userSetting.maxprice;
        var searchCategory = userSetting.searchCategory;
        var maxClotheSize = userSetting.maxSize;
        var subCategory = userSetting.mainCategory;

        var maxPrice = function () {
          if (userSetting.maxprice === 251) {
            return Infinity;
          } else {
            return userSetting.maxprice
          }
        }

        var cards = list.single($scope.deviceLocation.lat, $scope.deviceLocation.long, distance, $scope.loginID, minprice, maxPrice(), subCategory);

        var filteredCardArray = [];
        var pushCardArray = [];
        cards.forEach(function (data) {

          if (topArrays.indexOf(searchCategory) == -1) {
            pushToArray(minshoe, maxshoe);
          } else {
            pushToArray(clothesSize, maxClotheSize);

          }

          function pushToArray(minSize, maxSize) {
            if (data.size >= minSize && data.size <= maxSize) {
              pushCardArray.push(data);
            }
          }
        })

        if (searchCategory === "All") {
          filteredCardArray = cards;
        } else {
          filteredCardArray = pushCardArray;
        }


        var wishListRef = user.detail($scope.loginID).child('wishList');
        $scope.wishListItem = [];
        wishListRef.on('value', function (dataSnapshot) {
          dataSnapshot.forEach(function (data) {
            $scope.wishListItem.push(data.key());
          })
        })


        var cardFilteredByWishList = [];
        angular.forEach(filteredCardArray, function (item) {
          if ($scope.wishListItem.indexOf(item.$id) == -1) {
            cardFilteredByWishList.push(item);
          }
        })

        $scope.cards = cardFilteredByWishList;
      })
    });
  }


  $scope.ownerInfo = ownerInfo;
  $scope.discard = discard;
  $scope.swipeRight = swipeRight;
  $scope.chat = chat;

  function discard(itemId) {
    oneUpItemsServices.discard($scope.cards, itemId);

  }

  function chat(itemId) {
    $state.go('chat', {
      roomId: itemId
    });
  }

  function ownerInfo(userId) {
    return users[userId];
  }

  function swipeRight(itemId) {

    discard(itemId);
    oneUpItemsServices.demand($scope.loginID, itemId);
    $scope.queueModal.show();
    $scope.itemID = itemId;
  };

  $scope.clickedyclack = function () {
    $scope.queueModal.hide();
    navigationService.toPage('cards');
  };


  $ionicModal.fromTemplateUrl('queueModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.queueModal = modal;
  });

  $scope.test = function (quote) {
    alert(quote);
  }

  $scope.moveItem = function (itemID) {

    alert('check card controller hehe');
  }
})