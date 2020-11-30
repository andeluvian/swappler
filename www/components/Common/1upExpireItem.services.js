angular.module('starter')

.service('expiredItemCheck', function (oneUpItems, oneUpChatRoom, user) {
  this.check = check;

  function check() {
    oneUpItems.original().on('value', function (item) {
      var today = new Date().getTime();
      var expiredItemID = [];
      var itemValue = item.val();
      for (var i in itemValue) {

        var expireDate = itemValue[i].expireDate;

        if (expireDate <= today) {
          var expItemID = i;
          console.log(expItemID);
          deleteChatRoom(expItemID);
          deleteItemQueue(expItemID);
        }

      }

    })

    function deleteChatRoom(expItemID) {
      var chatRoom = oneUpChatRoom.room(expItemID);
      chatRoom.remove();
    }

    function deleteItemQueue(expItemID) {
      var queue = oneUpItems.queue(expItemID);

      queue.on('value', function (userQueue) {
        userQueue.forEach(function (data) {
          var userID = data.key();
          deleteItemInWishList(userID, expItemID)
          queue.remove();
          deleteItems(expItemID);
        });
      })
    }

    function deleteItemInWishList(userID, itemID) {
      var userWishListRef = user.wishList(userID).child(itemID);

      userWishListRef.remove();
    }

    function deleteItems(itemID) {
      oneUpItems.original().child(itemID).remove();
    }
  }
})