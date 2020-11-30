var Firebase = require('firebase');
var ionicPushServer = require('ionic-push-server');
var stringify = require('node-stringify');
var mainFactory = new Firebase('https://swappler.firebaseio.com');
var notificationRef = mainFactory.child('notifications');
var userInfoRef = mainFactory.child('users');
var pushNotificationRef = mainFactory.child('pushNotification');

pushNotificationRef.on('child_changed', function (dataSnapshot) {
  var userID = dataSnapshot.key();
  var message = dataSnapshot.val().content;
  var senderID = dataSnapshot.val().sender;
  var category = dataSnapshot.val().category;

  userInfoRef.child(userID).child('tokenID').on('value', function (users) {
    var token = users.val();

    console.log('notification has been sent to user : ' + userID);
    sendPushNotification(token, message, senderID, category);
  })
})

function sendPushNotification(token, message, senderID, category) {
  var credentials = {
    IonicApplicationID: "e63a5ae6",
    IonicApplicationAPIsecret: "78b189d4a8d363de072a54e4293211294e10ad338462bc8d"
  };

  var notification = {
    "tokens": [token],
    "notification": {
      "title": 'helloMoto',
      'foreground': false,
      "collapse_key": "1",
      "coldstart": false,
      "ios": {
        "badge": 1,
        "sound": "chime.aiff",
        "expiry": 1444983966000,
        "priority": 10,
        "contentAvailable": true,
        "payload": {
          "key1": "value",
          "key2": "value"
        }
      }, // end ioS
      "android": {
        'title': 'Swappler',
        'coldstart': false,
        soundname: "beep9",
        ledColor: [0, 0, 255, 0],
        "alert": message,
        "payload": {
          "foreground": false,
          "category": category,
          'senderID': senderID
        }
      } //end android
    } //end notification variable
  };

  ionicPushServer(credentials, notification);

}