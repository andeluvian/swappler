angular.module('swappler.authentication', [])

.run(function ($rootScope, someAuth, $state, navigationService, initUserData, userDump, oneUpLoad) {
  someAuth.$onAuth(function (authData) {

    if (authData) {

      $rootScope.loginID = authData.uid;
      $rootScope.baoID = authData.uid;


      userDump.child(authData.uid).once('value', function (data) {
        if (data.exists() === true) {
          navigationService.toPage('cards');
        } else {
          navigationService.toPage('updateprofile');


        }
      })


    } else {
      navigationService.toPage('login');

      console.log("you're not logged in");

    }

  })

})