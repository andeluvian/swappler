// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var firebaseUrl = "https://swappler.firebaseio.com/";
angular.module('starter', [
    'ionic', 'ngCordova', 'ionic.service.core', 'ionic.service.push',
    'swappler.authentication',
    'starter.controllers',
    'starter.services',
    'starter.directives',
    'ionic.contrib.ui.tinderCards',
    'firebase',
  'ngIOS9UIWebViewPatch',
    'ngCordovaOauth',
    'angularMoment',
    'angularGeoFire',
    /*'ionic.ion.imageCacheFactory',*/
    'rzModule',
    'ngLodash',
    'mainFooter',
    'swappler.user',
    '1up.Cards',
    '1up.Items',
    '1up.GeoFire',
  'swappler.notifications',
  'swappler.userSettings',
  'swappler.transaction',
  'swappler.wanted',
  '1up.timestamp',
  '1up.ChatRoom',
  'swappler.tour',
  'swappler.followers',
  'swappler.myprofile'
])
  .directive('noScroll', function () {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attr) {
        $element.on('touchmove', function (e) {
          e.preventDefault();
        });
      }
    }
  })
  .config(['$ionicAppProvider', function ($ionicAppProvider) {
    // Identify app
    $ionicAppProvider.identify({
      // Your App ID

      app_id: 'e4529683',
      // The public API key services will use for this app
      api_key: '2d195ad5cb6820d1c46446bdf93984790ba460f8b8eb5a53',

      // Your GCM sender ID/project number (Uncomment if supporting Android)
      gcm_id: '474037862793'
    });
}])
  .run(function ($ionicPlatform, $cordovaGeolocation, $rootScope, $cordovaDevice, $cordovaPush, mainFactory, $state, $document, $cordovaLocalNotification, $window, OneUpAlert) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
        var posOptions = {
          timeout: 10000,
          enableHighAccuracy: true
        };
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {

            $rootScope.deviceLocation = {
              lat: position.coords.latitude,
              long: position.coords.longitude
            }
          }, function (err) {
            OneUpAlert.alert('GPS is not enabled!');
          });
        //Start test location
        /*        $rootScope.deviceLocation = {
                  lat: 60.2207834,
                  long: 24.7778194
                }*/

        //End test location




      }) //end device ready
  }) //end run function
  .config(['$ionicConfigProvider', function ($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('top'); //other values: top
    $ionicConfigProvider.views.transition('none');
    //$ionicConfigProvider.scrolling.jsScrolling(false);
}])
  .constant('FBURL', 'https://swappler.firebaseio.com/')
  .config(function ($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      .state('mywantedlist', {
        url: "/mywantedlist",
        templateUrl: "components/1upMyProfile/1UpMyWantedList.html",
        controller: 'OneUpMyWantedCtrl'
      })
      .state('mywantedlistDetail', {
        url: "/mywantedlist/:itemId",
        templateUrl: "components/1upMyProfile/1UpMyWantedListDetail.html",
        controller: 'OneUpWantedDetailCtrl'
      })
      .state('tour', {
        url: "/tour",
        templateUrl: "components/1upTour/1upTour.html",
        controller: 'OneUpTourCtrl'
      })
      .state('peopleDetails', {
        url: "/peopleDetails/:userId",
        templateUrl: "components/1upMyProfile/1UpPeopleDetail.html",
        controller: 'OneUpPeopleDetailCtrl'
      })
      .state('transactions', {
        url: "/transactions",
        templateUrl: "components/1upMyProfile/1upTransactionHistory/1upTransactionHistory.html",
        controller: 'oneUpTransactionsCtrl'
      })
      .state('userSettings', {
        url: "/userSettings",
        templateUrl: "components/1upSettings/1upSettings.html",
        controller: 'OneUpSettingsCtrl'
      })
      .state('notifications', {
        url: "/notifications",
        templateUrl: "components/1upNotifications/1upNotifications.html",
        controller: 'OneUpNotificationsCtrl'
      })
      .state('follwingAndFollowers', {
        url: "/followingAndFollowers",
        templateUrl: "components/1upMyProfile/1upFollow/1upFollow.html",
        controller: 'oneUpFollowersCtrl'
      })
      .state('peopleToFollow', {
        url: "/peopleToFollow",
        templateUrl: "components/1upSearch/1upPeopleToFollow.html",
        controller: 'OneUpPeopleToFollowCtrl'
      })
      .state('MyProfile', {
        url: "/MyProfile",
        templateUrl: "components/1upMyProfile/1UpMyProfile.html",
        controller: 'OneUpMyProfileCtrl'
      })
      // Master-Details for profile items -- uses Master's controller so no Extra calls to database.
      .state('MyProfileItemDetail', {
        url: "/MyProfile/:itemId",
        templateUrl: "templates/profileItemDetail.html",
        controller: 'MyProfileCtrl'
      })
      .state('product-details', {
        url: "/product-details/:itemId",
        templateUrl: "components/1upMyProfile/1UpProductDetail.html",
        controller: 'OneUpProductDetailCtrl'
      })
      .state('Addnew', {
        url: "/Addnew",
        templateUrl: "components/1upAddNewItem/1upAddNew.html",
        controller: 'oneUpAddnewCtrl'
      })
      .state('login', {
        url: "/login",
        templateUrl: "components/Authentication/1upLogin.html",
        controller: 'authenticationCtrl'
      })
      .state('profile', {
        url: "/profile",
        templateUrl: "components/1upMenu/1upMainMenu.html",
        controller: 'oneUpMainMenuCtrl'
      })
      .state('updateprofile', {
        url: "/updateprofile",
        templateUrl: "components/1upProfile/1upUpdateProfile.html",
        controller: 'OneUpUpdateProfileCtrl'
      })
      .state('chat', {
        url: "/chat/:roomId",
        templateUrl: "components/1upChat/1upChatRoom/1upChatRoom.html",
        controller: '1upChatRoomCtrl'
      })
      .state('mychats', {
        url: "/mychats",
        templateUrl: "components/1upChat/1upChatList/1upChatList.html",
        controller: '1upChatListCtrl'
      })
      .state('categories', {
        url: "/categories",
        templateUrl: "components/1upFilter/1upFilters.html",
        controller: 'oneUpFiltersCtrl'
      })
      .state('cards', {
        url: "/cards",
        templateUrl: "components/1upCards/1upCards.html",
        controller: "1upCardsCtrl"
      })
      // if none of the above states are matched, use this as the fallback

    $urlRouterProvider.otherwise('/cards');
  });
