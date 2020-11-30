angular.module('swappler.user', [])


.factory('userDump', function (mainFactory) {

  var ref = mainFactory.child("users");


  return ref;
})


.factory('user', function (userDump, $firebaseObject, $firebaseArray) {

  return {
    general: general,
    settings: settings,
    detail: detail,
    items: items,
    original: original,
    notificationSettings: notificationSettings,
    wishList: wishList
  };

  function notificationSettings(userID) {

    return $firebaseArray(userDump.child(userID).child('notificationSettings'))
  }

  function general(userID) {

    return $firebaseObject(userDump.child(userID));
  }

  function settings(userID) {
    return userDump.child(userID).child('settings');
  }

  function detail(userID) {

    return userDump.child(userID);


  }

  function items(userID) {

    return userDump.child(userID).child('sellItems');

  }

  function original() {
    return $firebaseObject(userDump);
  }

  function wishList(userID) {
    return userDump.child(userID).child('wishList')
  }


})




.service('initUserData', function (mainFactory, userDump, navigationService, $rootScope) {


  this.add = add;



  function add(userID) {
    var dumpRef = userDump.child(userID.uid);

    dumpRef.on('value', function (snapshot) {
      var exists = (snapshot.val() === null);

      if (exists) {
        dumpRef.set({
          title: '',
          name: userID.facebook.displayName,
          provider: userID.provider,
          followers: false,
          following: false,
          items: false,
          imageUrl: 'http://graph.facebook.com/' + userID.facebook.id + '/picture?width=1000&height=1000',
          about: 'enter description',
          address: '',
          facebook: userID.facebook.cachedUserProfile.link,
          twitter: false,
          instagram: false,
          blog: false,
          pinterest: false,
          thumbsup: 0,
          thumbsdown: 0,
          premium: false,
          premiumexpires: null,
          mycurrentlocation: false,
          tokenID: false,
          mycurrentdevice: false,
          status: 'regular'
        })
        dumpRef.child("settings").set({

          distance: 100,
          price: 0,
          size: 4,
          maxSize: 6,
          minprice: 50,
          maxprice: 220,
          minshoe: 32,
          maxshoe: 40,
          searchCategory: "All",
          mainCategory: "secondhand"
        })
        dumpRef.child("notificationSettings").set({
          Users: true,
          Items: true,
          Chats: true,
          Misc: true


        })
        mainFactory.child('pushNotification').child(userID).set(true);

      } else {


      }

    })



  }
})