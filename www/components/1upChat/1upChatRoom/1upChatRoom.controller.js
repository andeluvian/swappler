angular.module('1up.ChatRoom')
  .controller('1upChatRoomCtrl', function ($scope, $stateParams, oneUpChatRoom, oneUpTimestamp, oneUpItems, navigationService, $ionicScrollDelegate, $firebaseObject, profilefac, user, $firebaseArray, notify, msgBody, $state, sendNotification, mainFactory, $ionicModal, userDump, OneUpAlert) {

    var roomId = $stateParams.roomId;
    var users = oneUpChatRoom.user();
    var items = oneUpItems.detail(roomId);
    var checkIfFirst = $scope.loginID;
    var isItemSold = $firebaseObject(mainFactory.child('chatRoom').child(roomId));

    isItemSold.$loaded()
      .then(function (bubu) {
        $scope.isSold = bubu.isSold;
      })

    $scope.roomDetails = oneUpChatRoom.roomObject(roomId);
    console.log($scope.roomDetails);


    $scope.chatRoomContent = oneUpChatRoom.roomContentArray(roomId);
    users.$loaded(function () {
      $scope.room = oneUpChatRoom.roomObject(roomId);
      $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();

    });

    $scope.chatRoomContent.$watch(function (event) {
      $scope.chatRoomContent.forEach(function (message) {
        if ($state.current.name === "chat" && event.event === "child_added" && message.sender !== $scope.loginID) {

          oneUpChatRoom.messageContent(roomId, message.$id).child('isRead').set(true);

        }
      })
    })


    $scope.data = [];
    $scope.items = items;
    $scope.addMessage = addDummyData;
    $scope.userArray = [];
    $scope.userInfo = userInfo;
    $scope.kickBuyer = kickBuyer;
    $scope.checkOwner = checkOwner;

    function userInfo(userId) {
      return users[userId];
    }

    function generateUTC() {
      var d = new Date().getTime();
      return d;
    };



    function addDummyData(buyerId, ownerId) {
      if ((buyerId === $scope.loginID) || (ownerId === $scope.loginID)) {
        $scope.chatRoomContent.$add({
          isRead: false,
          content: $scope.data.chatContent,
          sender: $scope.loginID,
          time: generateUTC()
        }).then(function () {
          $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
          $scope.data.chatContent = null;


        })
      } else {
        OneUpAlert.alert('You have been removed from this chatroom.');
      }
    }


    function kickBuyer(roomBuyer) {

      oneUpChatRoom.room(roomId).child('content').set(true);


      sendNotification.kickBuyer($scope.room.buyer, $scope.items.name);

      var deleteRef = $firebaseObject(profilefac.wishList($scope.room.buyer).child($scope.room.$id));
      deleteRef.$remove().then(function () {})

      var queueRef =
        $firebaseObject(oneUpItems.queue($scope.room.$id).child($scope.room.buyer));



      queueRef.$remove().then(function () {

        var newBuyer = $firebaseArray(oneUpItems.queue($scope.room.$id));

        newBuyer.$loaded(function () {
          var ref = newBuyer.$keyAt(0);


          if (ref === null || ref === undefined) {
            oneUpChatRoom.room(roomId).child('buyer').set(true);
          } else {
            oneUpChatRoom.room(roomId).child('buyer').set(ref);
          }
        })

      })

    }

    $scope.leave = function () {

      console.log('called');

      oneUpChatRoom.room(roomId).child('content').set(true);




      var deleteRef = $firebaseObject(profilefac.wishList($scope.room.buyer).child($scope.room.$id));
      deleteRef.$remove().then(function () {})

      var queueRef =
        $firebaseObject(oneUpItems.queue($scope.room.$id).child($scope.room.buyer));



      queueRef.$remove().then(function () {

        var newBuyer = $firebaseArray(oneUpItems.queue($scope.room.$id));

        newBuyer.$loaded(function () {
          var ref = newBuyer.$keyAt(0);


          if (ref === null || ref === undefined) {
            oneUpChatRoom.room(roomId).child('buyer').set(true);
          } else {
            oneUpChatRoom.room(roomId).child('buyer').set(ref);
          }
        })
      })

      navigationService.toPage('mychats');
    }



    function checkOwner(roomOwner) {
      if (roomOwner === $scope.loginID) {
        return true
      } else {
        return false
      }
    }

    $scope.close = function () {
      navigationService.toPage('mychats');
    }

    $scope.markAsSold = function () {
      var isItemSoldRef = mainFactory.child('chatRoom').child(roomId);


      $scope.salemodal.hide();
      isItemSoldRef.child('isSold').set(true);
      $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();

    }

    $scope.cancel = function () {
      $scope.salemodal.hide();

    }

    $scope.unSold = function () {

      var isItemSoldRef = mainFactory.child('chatRoom').child(roomId);

      $scope.salemodal.hide();

      isItemSoldRef.child('isSold').set(false);




    }



    $scope.list = $firebaseArray(mainFactory.child('chatRoom').child(roomId));

    $scope.list.$watch(function (event) {

      if (event.event === "child_changed") {

        if ($scope.isSold === false) {
          console.log('isSold === false');

          if (event.key === "isSold") {

            $scope.isSold = true;
          }

          return;
        }

        if ($scope.isSold === true) {
          console.log('isSold === true');

          if (event.key === "isSold") {
            $scope.isSold = false;
          }

          return;
        }

      }
    });

    $ionicModal.fromTemplateUrl('saleModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.salemodal = modal;
    });

    $scope.confirm = function (itemID, buyerName) {


      var ref = mainFactory.child('items').child(itemID);
      ref.on('value', function (data) {
        console.log(data);
        var soldItemsRef = mainFactory.child('soldItems').child(itemID);
        soldItemsRef.set({
          buyer: $scope.roomDetails.buyer,
          seller: $scope.roomDetails.owner,
          name: items.name,
          price: items.cost,
          desc: items.desc,
          imageURL: items.imageURL,
          postagePrice: items.postagePrice,
          sellingMethod: items.sellingMethod,
          bought: generateUTC(),
          rating: 'good'
        })


      })
      sendNotification.boughtYourItem($scope.room.owner, buyerName, $scope.items.name);

      sendNotification.youBoughtAnItem($scope.room.owner, $scope.room.buyer, $scope.items.name);

      var queueRef = oneUpItems.queue($scope.roomDetails.$id);


      queueRef.remove();
      ref.remove();
      OneUpAlert.alert("purchase confirmed");
      $scope.salemodal.hide();
      navigationService.toPage('transactions');

    }


    var queueRef = $firebaseArray(oneUpItems.queue($scope.roomDetails.$id));
    queueRef.$loaded()
      .then(function (data) {
        console.log(data.$id);
        console.log(data);
      })

  })