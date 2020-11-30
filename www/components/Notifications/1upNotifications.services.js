angular.module('swappler.notifications', [])

.factory('msgBodyFactory', function (mainFactory) {

  var ref = mainFactory.child("MsgBody");

  return ref;
})


.factory('msgBody', function (msgBodyFactory, $firebaseObject, $firebaseArray) {

  return {
    general: general,
    users: users,
    items: items,
    chats: chats,
    misc: misc,
  };

  function general() {
    return $firebaseObject(msgBodyFactory);
  }

  function users() {
    return msgBodyFactory.child('users');
  }

  function items() {
    return msgBodyFactory.child('items');
  }

  function chats() {
    return msgBodyFactory.child('chats');
  }

  function misc() {
    return msgBodyFactory.child('misc');
  }
})

.factory('notificationFactory', function (mainFactory) {
  var ref = mainFactory.child("notifications");

  return ref;
})

.factory('notify', function (notificationFactory, $firebaseObject, $firebaseArray) {
  return {
    general: general,
    unread: unread,
    read: read,
    detail: detail,
    items: items,
    users: users,
    chats: chats,
    misc: misc,
    isReadChecking: isReadChecking
  };

  function general(userID, limit) {
    var limitNumber = Number(limit);

    return $firebaseArray(notificationFactory.child(userID).orderByKey().limitToLast(10));

  }

  function read(userID) {
    return $firebaseArray(notificationFactory.child(userID).orderByChild('isRead').equalTo(true));

  }


  function unread(userID) {
    return $firebaseArray(notificationFactory.child(userID).orderByChild('isRead').equalTo(false));

  }


  function isReadChecking(userId, notiId) {
    return notificationFactory.child(userId).child(notiId).child('isRead').set(true);

  }

  function detail(userID) {
    return notificationFactory.child(userID);
  }

  function items(userID) {
    return notificationFactory.child(userID).child('items');
  }

  function users(userID) {
    return notificationFactory.child(userID).child('users');
  }

  function chats(userID) {
    return notificationFactory.child(userID).child('vhats');
  }

  function misc(userID) {
    return notificationFactory.child(userID).child('misc');
  }
})




.service('sendNotification', function (user, $firebaseObject, msgBody, $firebaseArray, notify, $rootScope, mainFactory) {

  var msgBodyChats = $firebaseObject(msgBody.chats());
  var msgBodyUsers = $firebaseObject(msgBody.users());
  var msgBodyItems = $firebaseObject(msgBody.items());


  this.kickBuyer = kickBuyer;
  this.iFollowYou = iFollowYou;
  this.becomeFirst = becomeFirst;
  this.boughtYourItem = boughtYourItem;
  this.youBoughtAnItem = youBoughtAnItem;
  this.queuedItemIsSold = queuedItemIsSold;


  function queuedItemIsSold(receivers, sender, itemName) {


    var receiverOptions = $firebaseObject(user.detail(receivers).child('notificationSettings'));

    var notifyRef = $firebaseArray(notify.detail(receivers));

    msgBodyItems.$loaded(function (data) {

      receiverOptions.$loaded()
        .then(function (bubu) {
          var check = bubu.Items;
          var msgBodyItems = data;
          console.log(check);

          if (check === true) {

            notifyRef.$add({
              category: 'Items',
              time: new Date().getTime(),
              sender: sender,
              isRead: false,
              content: itemName + " from your wishlist " + msgBodyItems['01']
            }).then(function (notifiData) {


              notifyRef.$loaded(function () {
                var record = notifyRef.$getRecord(notifiData.key());
                console.log(record);
                mainFactory.child('pushNotification').child(receiver).set({
                  category: record.category,
                  content: record.content,
                  sender: record.sender,
                  time: record.time
                });
              })

            })

          }
        })
    })

  }

  function youBoughtAnItem(seller, buyer, itemName) {



    var receiverOptions = $firebaseObject(user.detail(buyer).child('notificationSettings'));

    var notifyRef = $firebaseArray(notify.detail(buyer));

    msgBodyItems.$loaded(function (data) {

      receiverOptions.$loaded()
        .then(function (bubu) {
          var check = bubu.Items;
          var msgBodyItems = data;
          console.log(check);

          if (check === true) {

            notifyRef.$add({
              category: 'Items',
              time: new Date().getTime(),
              sender: $rootScope.loginID,
              isRead: false,
              content: msgBodyItems['05'] + itemName + " from " + seller
            }).then(function (notifiData) {


              notifyRef.$loaded(function () {
                var record = notifyRef.$getRecord(notifiData.key());
                console.log(record);
                mainFactory.child('pushNotification').child(receiver).set({
                  category: record.category,
                  content: record.content,
                  sender: record.sender,
                  time: record.time
                });
              })

            })

          }
        })
    })
  }

  function boughtYourItem(receiver, buyer, itemName) {



    var receiverOptions = $firebaseObject(user.detail(receiver).child('notificationSettings'));

    var notifyRef = $firebaseArray(notify.detail(receiver));

    msgBodyItems.$loaded(function (data) {

      receiverOptions.$loaded()
        .then(function (bubu) {
          var check = bubu.Items;
          var msgBodyItems = data;
          console.log(check);

          if (check === true) {

            notifyRef.$add({
              category: 'Items',
              time: new Date().getTime(),
              sender: $rootScope.loginID,
              isRead: false,
              content: buyer + " " + msgBodyItems['03'] + " " +
                itemName
            }).then(function (notifiData) {


              notifyRef.$loaded(function () {
                var record = notifyRef.$getRecord(notifiData.key());
                console.log(record);
                mainFactory.child('pushNotification').child(receiver).set({
                  category: record.category,
                  content: record.content,
                  sender: record.sender,
                  time: record.time
                });
              })

            })

          }
        })
    })
  }



  function kickBuyer(receiver, itemName) {





    var receiverOptions = $firebaseObject(user.detail(receiver).child('notificationSettings'));

    var notifyRef = $firebaseArray(notify.detail(receiver));

    msgBodyChats.$loaded(function (data) {

      receiverOptions.$loaded()
        .then(function (bubu) {
          var check = bubu.Chats;
          var msgBodyChats = data;
          console.log(check);

          if (check === true) {

            notifyRef.$add({
              category: 'Chats',
              time: new Date().getTime(),
              sender: $rootScope.loginID,
              isRead: false,
              content: msgBodyChats['01'] + " " + itemName + " chatroom"
            }).then(function (notifiData) {


              notifyRef.$loaded(function () {
                var record = notifyRef.$getRecord(notifiData.key());
                console.log(record);
                mainFactory.child('pushNotification').child(receiver).set({
                  category: record.category,
                  content: record.content,
                  sender: record.sender,
                  time: record.time
                });
              })

            })

          }
        })
    })
  }

  function iFollowYou(senderName, receiver) {

    console.log('myname =' + senderName);


    var receiverOptions = $firebaseObject(user.detail(receiver).child('notificationSettings'));

    var notifyRef = $firebaseArray(notify.detail(receiver));

    msgBodyUsers.$loaded(function (data) {

      receiverOptions.$loaded()
        .then(function (bubu) {
          var check = bubu.Users;
          var msgBodyUsers = data;


          if (check === true) {

            notifyRef.$add({
              category: 'Users',
              time: new Date().getTime(),
              sender: $rootScope.loginID,
              isRead: false,
              content: senderName + " " + msgBodyUsers['01']
            }).then(function (notifiData) {


              notifyRef.$loaded(function () {
                var record = notifyRef.$getRecord(notifiData.key());
                console.log(record);
                mainFactory.child('pushNotification').child(receiver).set({
                  category: record.category,
                  content: record.content,
                  sender: record.sender,
                  time: record.time
                });
              })

            })

          }
        })
    })
  }

  function becomeFirst(receiver, sender, itemName) {
    var receiverOptions = $firebaseObject(user.detail(receiver).child('notificationSettings'));

    var notifyRef = $firebaseArray(notify.detail(receiver));

    msgBodyItems.$loaded(function (data) {

      receiverOptions.$loaded()
        .then(function (bubu) {
          var check = bubu.Items;
          var msgBodyItems = data;
          console.log(check);

          if (check === true) {

            notifyRef.$add({
              category: 'Items',
              time: new Date().getTime(),
              sender: sender,
              isRead: false,
              content: msgBodyItems['02'] + " " + itemName
            }).then(function (notifiData) {


              notifyRef.$loaded(function () {
                var record = notifyRef.$getRecord(notifiData.key());
                console.log(record);
                mainFactory.child('pushNotification').child(receiver).set({
                  category: record.category,
                  content: record.content,
                  sender: record.sender,
                  time: record.time
                });
              })

            })

          }
        })
    })
  }


})