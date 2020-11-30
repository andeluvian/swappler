angular.module('swappler.authentication')



.factory('someAuth', function ($firebaseAuth, mainFactory) {


  var auth = $firebaseAuth(mainFactory);

  return auth;

})

.factory('getUserAuthID', function (someAuth) {
  return function () {

    someAuth.$onAuth(function (authData) {
      if (authData) {
        return authData.uid;
      }
    })
  }
})