angular.module('1up.Cards')

.controller('backupCardCtrl', function ($scope, oneUpItems, userDump, $firebaseArray, $firebaseObject, geoLocation, geoFireFactory, testFilterItemByDistance, mainFactory, oneUpTimestamp, $ionicModal, $state, oneUpChatRoom, user, oneUpCardFactory, $ionicPlatform, $ionicPopup, $window, $ionicLoading) {


  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    if (fromState.name == "categories") {
      listLoad();
    }
  })

  var items = oneUpItems.array();
  var users = oneUpItems.user();

  $ionicPlatform.onHardwareBackButton(function () {
    if ($state.current.name === 'cards') {
      $state.go('cards');
      ionic.Platform.exitApp();
    }
  })

  var deviceLocation = {
    lat: geoLocation.getGeolocation().lat,
    long: geoLocation.getGeolocation().lng
  };



  var itemRef = oneUpItems.original();
  var list = new testFilterItemByDistance(itemRef);

  beforeLoading();
  listLoad();

  function listLoad() {

    list.$loaded(function () {
      $ionicLoading.hide();

      var userSetting = $firebaseObject(user.settings($scope.loginID));
      userSetting.$loaded(function () {
        var maxshoe = userSetting.maxshoe;
        var distance = userSetting.distance;
        var clothesSize = userSetting.size;
        var minprice = userSetting.minprice;
        var maxprice = userSetting.maxprice;

        var cards = list.distance(deviceLocation.lat, deviceLocation.long, distance, $scope.loginID);

        function category(categoryId) {
          return userSetting.categorylist[categoryId];
        }


        var cardArray = cards.map(function (data) {
          return data
        })
        console.log(cardArray);

        var finalArray = [];

        if (category('01') === true) {

          cardArray.forEach(function (data) {
            if (data.category === '01' && data.size == clothesSize && data.cost >= minprice && data.cost <= maxprice) {

              finalArray.push(data);
            }
          })

        }

        if (category('02') === true) {

          cardArray.forEach(function (data) {
            if (data.category === '02' && data.size == clothesSize && data.cost >= minprice && data.cost <= maxprice) {

              finalArray.push(data);
            }
          })
        }

        if (category('03') === true) {

          cardArray.forEach(function (data) {
            if (data.category === '03' && data.size == clothesSize && data.cost >= minprice && data.cost <= maxprice) {

              finalArray.push(data);
            }
          })
        }

        if (category('04') === true) {
          cardArray.forEach(function (data) {
            if (data.category === '04' && data.size == clothesSize && data.cost >= minprice && data.cost <= maxprice) {

              finalArray.push(data);
            }
          })
        }

        if (category('05') === true) {
          cardArray.forEach(function (data) {
            if (data.category === '05' && data.size == clothesSize && data.cost >= minprice && data.cost <= maxprice) {

              finalArray.push(data);
            }
          })
        }

        var wishListRef = user.detail($scope.loginID).child('wishList');
        $scope.wishListItem = [];
        wishListRef.on('value', function (dataSnapshot) {
          dataSnapshot.forEach(function (data) {
            $scope.wishListItem.push(data.key());
          })
        })
        var cardFilteredByWishList = [];
        angular.forEach(finalArray, function (item) {
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
  $scope.cancelExit = cancelExit;
  $scope.exit = exit;


  function beforeLoading() {
    $ionicLoading.show({
      noBackdrop: false,
      template: '<ion-spinner icon="ripple" class="spinner-assertive"/>'
    })

  }

  function cancelExit() {
    $scope.exitModal.hide();
    $state.go('cards');
  }

  function exit() {
    ionic.Platform.exitApp();
  }

  function discard(itemId) {

    var indexMap = $scope.cards.map(function (item) {
      return item.$id;
    })
    var itemIndex = indexMap.indexOf(itemId);
    $scope.cards.splice(itemIndex, 1);

  }

  function chat(itemId) {
    oneUpChatRoom.room(itemId).child('buyer').set($scope.loginID);
    $state.go('chat', {
      roomId: itemId
    });
  }


  function ownerInfo(userId) {
    return users[userId];
  }

  function swipeRight(itemId) {
    var tempUserId = $scope.loginID;
    var queueRef = oneUpItems.queue(itemId);
    var itemRef = queueRef.child(tempUserId);
    var queueObject = $firebaseObject(queueRef);
    var queueArray = $firebaseArray(queueRef);
    userDump.child($scope.loginID).child('wishList').child(itemId).set(true);
    queueArray.$loaded(function () {
      var index = queueArray.$indexFor(tempUserId);
      if (queueArray.length == 0) {
        itemRef.setWithPriority(true, oneUpTimestamp);
      }
      if (index == -1) {
        itemRef.setWithPriority(true, oneUpTimestamp, onComplete);

        function onComplete() {
          $scope.userQueue = queueArray.length;
          $scope.queueModal.show();
        }
      } else {
        $scope.userQueue = index + 1;
        $scope.queueModal.show();
      }
    })
    $scope.itemID = itemId;
  };

  $ionicModal.fromTemplateUrl('queueModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.queueModal = modal;
  });

  $ionicModal.fromTemplateUrl('exit.html', {
    scope: $scope,
    animation: 'slide-in-up',
    hardwareBackButtonClose: false
  }).then(function (modal) {
    $scope.exitModal = modal;
  });

})