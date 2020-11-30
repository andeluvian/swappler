angular.module('1up.Cards')

.factory('oneUpCardFactory', function (user, $firebaseObject) {

  return {
    userWishList: userWishList

  }

  function userWishList(userId) {
    var wishListRef = user.detail(userId).child('wishList');
    return $firebaseObject(wishListRef);

  }
})

.filter('wishListFilter', function () {
  return function (itemArray, wishListArray) {
    var filtered = [];
    angular.forEach(itemArray, function (item) {
      if (wishListArray.indexOf(item.$id) == -1) {
        filtered.push(item);
      } //end if function
    })
    return filtered;
  };
})

.service('oneUpCards', function ($ionicLoading) {

})