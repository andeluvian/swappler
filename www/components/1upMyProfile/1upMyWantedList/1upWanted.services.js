angular.module('swappler.wanted')

.factory('oneUpWishList', function ($rootScope, $q, $firebaseObject, mainFactory, $firebaseArray, profilefac) {
  var userID = $rootScope.loginID;
  var deferred = $q.defer();

  var wishList = $firebaseArray(profilefac.wishList(userID));
  var itemtable = $firebaseArray(profilefac.itemtable());
  itemtable.$loaded(function (itemInfo) {
    var mapWishList = wishList.map(function (data) {
      var itemQueue = $firebaseArray(mainFactory.child("itemQueue").child(data.$id));
      itemQueue.$watch(function () {
        data.myQueue = itemQueue.$indexFor(userID) + 1;
      })

      data.itemInfo = itemtable.$getRecord(data.$id);
      return data
    })
    deferred.resolve(mapWishList);

  })
  return deferred.promise;
})

.service('oneUpDelete', function ($firebaseArray, oneUpItems, oneUpChatRoom, $rootScope, sendNotification, profilefac, $firebaseObject, $state) {

  this.fromWishList = fromWishList;


  function fromWishList(itemId, itemName) {
    var itemQueue = $firebaseArray(oneUpItems.queue(itemId));
    var chatRoom = oneUpChatRoom.roomObject(itemId);

    itemQueue.$loaded(function () {
      var myQueue = itemQueue.$indexFor($rootScope.loginID);
      var nextBuyer = itemQueue.$keyAt(1);
      chatRoom.$loaded(function (chatRoomData) {
        if (chatRoomData.buyer === $rootScope.loginID) {
          replaceBuyer();
          removeFromWishList();
        } else {
          removeFromWishList();
          removeFromItemQueue()
        }


        function replaceBuyer() {
          console.log('you have the right to access');
          chatRoom.content = true;
          if (nextBuyer !== null) {
            chatRoom.buyer = nextBuyer;
            sendNotification.becomeFirst(nextBuyer, chatRoomData.owner, itemName);
          } else {
            chatRoom.buyer = true
          }

          chatRoom.$save().then(function () {
            console.log('buyer ID is changed');
            removeFromItemQueue()
          })
        }

        function removeFromWishList() {
          var itemData = $firebaseObject(profilefac.wishList($rootScope.loginID).child(itemId));
          itemData.$remove().then(function (ref) {
            $state.go('mywantedlist');
          })
        }

        function removeFromItemQueue() {
          itemQueue.$remove(itemQueue[myQueue]).then(function () {
            console.log('removed from itemQueue');
          })
        }
      })
    })




  }
})