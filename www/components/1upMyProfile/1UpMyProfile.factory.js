angular.module('swappler.myprofile')



.factory('profilefac', function ($firebaseObject, $firebaseArray, mainFactory) {


  var itemref = mainFactory.child('items');
  var usersref = mainFactory.child('users');

  return {

    userinformation: detail,
    items: items,
    itemqueue: itemqueue,
    followers: followers,
    following: following,
    myitems: myitems,
    mywanted: mywanted,
    itemtable: itemtable,
    usertable: usertable,
    wishList: wishList,
    wishlistdetail: wishlistdetail,
    itemownerdetail: itemownerdetail
  };

  function detail(userID) {
    return usersref.child(userID);
  }

  function items(userID) {
    return itemref.orderByChild('submitedby').equalTo(userID);
  }

  function followers(userID) {
    return usersref.child(userID).child('followers');
  }

  function following(userID) {
    return usersref.child(userID).child('following');
  }

  function myitems(userID) {
    return usersref.child(userID).child('sellItems');
  }

  function mywanted(userID) {
    return usersref.child(userID).child('items');
  }

  function itemtable() {
    return itemref;
  }

  function usertable() {
    return usersref;

  }

  function wishList(userID) {
    return usersref.child(userID).child('wishList');
  }

  function wishlistdetail(itemID) {
    return itemref.child(itemID);
  }

  function itemownerdetail(itemID) {
    return itemref.child(itemID).child('submitedby');
  }

  function itemqueue(itemID) {
    return itemref.child(itemID).child('queue');
  }
})

.filter('truncateFilter', function () {
  return function (input, length) {
    if (input.length >= length) {
      return input.substring(0, length) + ' ...';

    } else {
      return input;
    }
  }
})