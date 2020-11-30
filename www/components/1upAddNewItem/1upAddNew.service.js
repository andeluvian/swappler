angular.module('starter.controllers')


.service('oneUpAdd', function ($firebaseObject, user) {

  this.add = add;



  function add(loginID, cate, size) {

    var ItemID = cate + '-' + size + '-' + generateUTC();
    var itemRef = user.items($scope.loginID);

    var item = $firebaseObject(itemRef);


    function generateUTC() {
      var d = new Date().getTime();
      return d.toString();
    };
  }




})