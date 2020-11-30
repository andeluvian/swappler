angular.module('starter')

.controller("authenticationCtrl", function ($scope, $state, $cordovaOauth, $location, initUserData, userDump, someAuth, navigationService, user, $window, expiredItemCheck, $rootScope, $ionicPush, $ionicUser, mainFactory, oneUpLoad, $ionicPlatform, OneUpAlert) {

  $scope.$on('$ionicView.beforeLeave', function () {

  });
  expiredItemCheck.check()

  $ionicPlatform.onHardwareBackButton(function () {
    if ($state.current.name === 'cards') {
      $state.go('login');
      OneUpAlert.exitApp();

    }
  })




  function identifyUser() {
    var user = $ionicUser.get();
    if (!user.user_id) {

      user.user_id = $ionicUser.generateGUID()
    };

    angular.extend(user, {
      name: 'Test User',
      message: 'I come from planet Ion'
    });

    $ionicUser.identify(user).then(function () {

      $ionicPush.register({
          canShowAlert: false,
          onNotification: function (notification) {
            console.log('onNotification', JSON.stringify(notification));

            $scope.lastNotification = JSON.stringify(notification);
          }
        },


        {
          "user_id": user.user_id,
          "email": "tester@example.com",

        })
    })

  }

  function registerToken() {

    $ionicPush.register({
      canShowAlert: false,
      onNotification: function (notification) {
        var regid = notification.regid;

        alert('token registered')
      }
    })
  }

  $scope.loginfb = function () {


    $cordovaOauth.facebook("248086702028600", ["email", "public_profile"]).then(function (result) {

      someAuth.$authWithOAuthToken("facebook", result.access_token).then(function (authData) {
        $scope.auth = authData;


        oneUpLoad.show('Logging in');

        initUserData.add(authData);

      })
    })


  }

  $scope.beginTour = function () {

    navigationService.toPage('tour');

  }

  $scope.login = function (username, password) {

    someAuth.$authWithPassword({
      email: username,
      password: password
    }).then(function (authData) {
      oneUpLoad.show('Logging in');

      $scope.auth = authData;
      $window.localStorage['storedLoginID'] = $scope.auth;
      navigationService.toPage('cards');
    }).catch(function (error) {
      console.error("ERROR: " + error);
    });
  }
})