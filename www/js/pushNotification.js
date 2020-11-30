angular.module('starter')
.run(function ($rootScope, $ionicPlatform, mainFactory, $state, $ionicUser, $ionicPush) {
  $ionicPlatform.ready(function () {
      var push = PushNotification.init({
        "android": {
          "senderID": "474037862793",
          'foreground': false,
          "forceShow": 'false',
          'clearNotifications': 'true',
          "iconColor": "white",
          'sound': 'true'
        },
        "ios": {
          "sound": "true"
        },
        "windows": {}
      });
      onLoad();
      function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
        push.on('registration', function (data) {
          $rootScope.tokenID = data.registrationId;
          if ($rootScope.loginID != undefined) {
            mainFactory.child('users').child($rootScope.loginID).once('value', function (snapshot) {
              if (snapshot.exists() === true) {
                identifyUser();
              }
            })
          } //end if-$rootScope.loginID !=undefined function
        });
      }
      function onDeviceReady() {
        push.on('notification', function (data) {
          var isForeground = data.additionalData.foreground;
          if (isForeground === true) {} //end if- function
          else {
            if (data.additionalData.payload.category === "Users") {
              $state.go('peopleDetails', {
                'userId': data.additionalData.payload.senderID
              })
            }
          }
        })
      } // end onDeviceReady function
    }) //and ionic platform ready event
  function identifyUser() {
    var user = $ionicUser.get();
    if (!user.user_id) {
      // Set your user_id here, or generate a random one
      user.user_id = $rootScope.loginID;
    };
    $ionicUser.identify(user).then(function () {
      //alert('identified user ' + user.name + ' and ID ' + user.user_id);
      $ionicPush.register({
          canShowAlert: false,
          "debug": true,
          onNotification: function (notification) {
            mainFactory.child('users').child($rootScope.loginID).child('tokenID').set(notification.regid);
          }
        },
        // Some metadata to send through the webhook for your own
        // linking of device token and user
        {
          "user_id": user.user_id,
          "name": 'User'
        })
    })
  }
})
