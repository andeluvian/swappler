angular.module('swappler.transaction')

.factory('transactions', function ($firebaseObject, $firebaseArray, mainFactory) {


  var itemRef = mainFactory.child('soldItems');
  var usersRef = mainFactory.child('users');

  return {

    soldItems: soldItems,
    boughtItems: boughtItems,
    seller: seller,
    general: general
  };

  function general() {
    return itemRef;
  }

  function seller(sellerID) {
    return usersRef.equalTo(sellerID);
  }

  function soldItems(userID) {
    return itemRef.orderByChild('seller').equalTo(userID);
  }

  function boughtItems(userID) {
    return itemRef.orderByChild('buyer').equalTo(userID);
  }

})