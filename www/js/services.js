angular.module('starter.services', [])

/*.factory('ImageUploadService', function ())
 */


.factory('$localStorage', ['$window', function ($window) {
    return {
      set: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    }
    }])
  .factory('geoLocation', function ($localStorage) {
    return {
      setGeolocation: function (latitude, longitude) {
        var _position = {
          latitude: latitude,
          longitude: longitude
        }
        $localStorage.setObject('geoLocation', _position)
      },
      getGeolocation: function () {
        return glocation = {
          lat: $localStorage.getObject('geoLocation').latitude,
          lng: $localStorage.getObject('geoLocation').longitude
        }
      }
    }
  })

/*/*.factory("PeopleService", ["$firebaseArray", "$firebaseObject", 
  function($firebaseArray, $firebaseObject){

  var people = [];
  var followersArray = [];
  var followingsArray = [];
  var itemsArray = [];

  var fb = new Firebase('https://swapllerdummy.firebaseio.com/');     
  // create a reference to the Firebase where we will store our data     
  var ref = new Firebase("https://swapllerdummy.firebaseio.com/users");
  

  return {
    /*getFollowers: function(userID){

      var profileRef = ref.child(userID);
      var userprofile = $firebaseArray(profileRef);

      userprofile.$loaded().then(function() {
            angular.forEach(userprofile.followers,
                function(value, key) {
                    var followerID = value.user;
                console.log(followerID);
                    //userProfile = Profile(followerID); // retrieve firebaseobject profile from factory
                     var userData = $firebaseObject(fb.child('users/' + followerID));      
                    //    userData.$loaded(function(data) {    
                    //        followersArray.push(data);
                           
                    // });  
                       userData.$loaded().then(function(data){
                        followersArray.push(data);
                       })
                       .catch(function(error){
                        console.error("Error:", error);
                       });
                });           
                
                console.log(followersArray);
                return followersArray;
                
        });

    },*/

/*getFollowings: function(userID){

  var profileRef = ref.child(userID);
  var userprofile = $firebaseArray(profileRef);

  userprofile.$loaded().then(function() {
        angular.forEach(userprofile.following,
            function(value, key) {
            //console.log(key, value);

                var followerID = value.user;
            console.log(followerID);
                //userProfile = Profile(followerID); // retrieve firebaseobject profile from factory
                var userData = $firebaseObject(fb.child('users/' + followerID));      
                   userData.$loaded(function(data) {    
                       followingsArray.push(data);
                       
                });  
                 userData.$loaded().then(function(data){
                            followersArray.push(data);
                           })
                           .catch(function(error){
                            console.error("Error:", error);
                           });

            });          
            
             console.log(followingsArray);
            return followingsArray;
           
    });

},*/

/*getItems: function(userID){

      var profileRef = ref.child(userID);
      var userprofile = $firebaseArray(profileRef);

      userprofile.$loaded().then(function() {
            angular.forEach(userprofile.items,
                function(value, key) {
                    console.log(key, value);
                    var followerID = value.item;
                    console.log(value.item);
                    //userProfile = Profile(followerID); // retrieve firebaseobject profile from factory
                    var userData = $firebaseObject(fb.child('items/'+ followerID));      
                       userData.$loaded(function(data) {    
                           itemsArray.push(data);
                           //console.log(data);
                      userData.$loaded().then(function(data){
                          followersArray.push(data);
                         })
                         .catch(function(error){
                          console.error("Error:", error);
                         });
                           
                    });  
                });           
                
                console.log(itemsArray);
                return followingsArray;
                //console.log($scope.followers);
        }

    }
}])*/

.factory("Profile", ["$firebaseObject",
  function ($firebaseObject) {
    return function (username) {
      var fb = new Firebase('https://swappler.firebaseio.com');
      // create a reference to the Firebase where we will store our data     
      var ref = new Firebase("https://swappler.firebaseio.com/users");

      var profileRef = ref.child(username);

      // return it as a synchronized object
      return $firebaseObject(profileRef);
    }
  }
])



.service('buyershared', function () {
  var userprofile = 'none';
  var imgurl = 'none';

  return {
    getProfile: function () {
      return userprofile;
    },

    getProfileimageUrl: function () {
      return imgurl;
    },
    setProfileimageUrl: function (imageUrl) {
      imgurl = imageUrl;
    },


    /*getimageUrl: function () {
            for (var i = 0; i < userprofile.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;*/

    setProfile: function (auth) {
      userprofile = auth;
    }
  }
})

.service('sellershared', function () {
  var sellerprofile = 'none';
  var imgurl = 'none';
  var sellername = 'none';

  return {
    getProfile: function () {
      //console.log(sellerprofile.name);
      return sellerprofile;
    },

    getProfileimageUrl: function () {
      return imgurl;
    },
    setProfileimageUrl: function (imageUrl) {
      imgurl = imageUrl;
    },
    getSellername: function () {
      return imgurl;
    },
    setSellername: function (imageUrl) {
      imgurl = imageUrl;
    },

    setProfile: function (auth) {

      sellerprofile = auth;
    }
  }
})

.service('shared', function () {

  var authentication = 'none';

  return {
    getAuth: function () {
      return authentication;
    },
    setAuth: function (auth) {
      authentication = auth;
    }
  };
})


/*
.factory("chatMessages", ["$firebaseArray", "$rootScope", function($firebaseArray, $rootScope){
     // create a reference to the Firebase where we will store our data
     var ref = new Firebase("https://swapllerdummy.firebaseio.com/chats");
 
     // this uses AngularFire to create the synchronized array
     // We limit the results to 10
     return $firebaseArray(ref.limitToLast(10));
}])
*/

.factory("chatMessages", ["$firebaseArray", "$firebaseAuth", "$rootScope",
  function ($firebaseArray, $firebaseAuth, $rootScope) {
    var fb = new Firebase('https://swappler.firebaseio.com/');
    var fbAuth = $firebaseAuth(fb);
    var authData = fbAuth.$getAuth();
    // create a reference to the Firebase where we will store our data
    var randomRoomId = Math.round(Math.random() * 100000000);
    // var randomRoomId = "chats70010146";
    // Get this Room ID and store it in cardowners profile as well as current user's profile
    // so that I can retrieve their chats.
    var userRef = new Firebase("https://swappler.firebaseio.com/users");
    var currentUserRef = $firebaseArray(userRef.child(authData.uid + "/chats"));
    var cardOwnerRef = $firebaseArray(userRef.child($rootScope.currentOwner + "/chats"));
    currentUserRef.$add({
      chatroom: randomRoomId
    });
    cardOwnerRef.$add({
      chatroom: randomRoomId
    });

    // var profileRef = ref.child(username);

    var ref = new Firebase("https://swappler.firebaseio.com/chatRooms/" + randomRoomId);

    return $firebaseArray(ref);
  }
])

.factory('Chats', function ($firebase, Rooms, $firebaseArray, $firebaseAuth, $rootScope) {

  var selectedRoomId;

  var ref = new Firebase(firebaseUrl);
  var chats;

  return {
    all: function () {
      return chats;
    },

    remove: function (chat) {
      chats.$remove(chat).then(function (ref) {
        ref.key() === chat.$id; // true item has been removed
      });
    },
    get: function (chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
    getSelectedRoomName: function () {
      var selectedRoom;
      if (selectedRoomId && selectedRoomId != null) {
        selectedRoom = Rooms.get(selectedRoomId);
        if (selectedRoom)
          return selectedRoom.name;
        else
          return null;
      } else
        return null;
    },
    getSelectedRoomOwnerName: function () {
      var selectedRoom;
      if (selectedRoomId && selectedRoomId != null) {
        selectedRoom = Rooms.get(selectedRoomId);
        if (selectedRoom)
          return selectedRoom.roomOwner;
        else
          return null;
      } else
        return null;
    },
    getSelectedRoomCard: function () {
      var selectedRoom;
      if (selectedRoomId && selectedRoomId != null) {
        selectedRoom = Rooms.get(selectedRoomId);
        if (selectedRoom)
          return selectedRoom.cardId;
        else
          return null;
      } else
        return null;
    },

    getbuyerImage: function () {
      var selectedRoom;
      if (selectedRoomId && selectedRoomId != null) {
        selectedRoom = Rooms.get(selectedRoomId);
        if (selectedRoom)
          return selectedRoom.buyerImg;
        else
          return null;
      } else
        return null;
    },

    getsellerImage: function () {
      var selectedRoom;
      if (selectedRoomId && selectedRoomId != null) {
        selectedRoom = Rooms.get(selectedRoomId);
        if (selectedRoom)
          return selectedRoom.sellerImg;
        else
          return null;
      } else
        return null;
    },
    selectRoom: function (roomId) {
      console.log("selecting the room with id: " + roomId);
      selectedRoomId = roomId;
      console.log(roomId);
      if (!isNaN(roomId)) {
        chats = $firebaseArray(ref.child('chatRooms').child(selectedRoomId).child('chats'));
        // chats = $firebaseArray(ref.child('rooms').child(selectedRoomId).child('chats'));
      }
    },
    send: function (from, message) {
      console.log("sending message from :" + from.name + " & message is " + message);
      if (from && message) {
        var chatMessage = {
          from: from.name,
          message: message,
          createdAt: Firebase.ServerValue.TIMESTAMP
        };
        chats.$add(chatMessage).then(function (data) {
          console.log("message added");
        });
      }
    }
  }
})

/**
 * Simple Service which returns Rooms collection as Array from Salesforce & binds to the Scope in Controller
 */
.factory('Rooms', function ($firebase, $firebaseArray, $firebaseAuth, $rootScope, Profile, buyershared, sellershared) {
  // Might use a resource here that returns a JSON array
  var ref = new Firebase(firebaseUrl);
  var rooms = $firebaseArray(ref.child('chatRooms'));
  //var buyerchat = $firebaseArray(ref.child(''))
  var fb = new Firebase('https://swappler.firebaseio.com/');
  var fbAuth = $firebaseAuth(fb);
  var authData = fbAuth.$getAuth();


  return {
    all: function () {
      return rooms;
    },
    get: function (roomId) {
      // Simple index lookup
      return rooms.$getRecord(roomId);
    },

    remove: function (roomId) {
      var buyer = $firebaseObject(ref.child('users/' + authData.uid + '/chats'));

      var seller = $firebaseObject(ref.child('users/' + $rootScope.currentOwner + '/chats'));
      // Simple index lookup
      rooms.$remove(roomId).then(function (ref) {
        ref.key() === room.$id;

      });
      buyer.$remove(roomId).then(function (ref) {
        ref.key() === room.$id;
      });
      seller.$remove(roomId).then(function (ref) {
        ref.key() === room.$id;
      });
    },

    userRooms: function () {

      // var fb = new Firebase('https://swapllerdummy.firebaseio.com/');     
      var fbAuth = $firebaseAuth(ref);
      var authData = fbAuth.$getAuth();
      var userProfile = Profile(authData.uid);
      var cardownersProfile = Profile($rootScope.currentOwner);
      var chatRoomArray = [];

      //loop through profile to get following ids  and their profiles
      userProfile.$loaded().then(function () {
        angular.forEach(userProfile.chats,
          function (value, key) {
            //console.log(key, value);

            var chatroomId = value.chatroom;
            console.log(chatroomId);
            //userProfile = Profile(followerID); // retrieve firebaseobject profile from factory
            var chatData = $firebaseArray(ref.child("/chatRooms/" + chatroomId));

            chatData.$loaded(function (data) {
              chatRoomArray.push(data);
              //console.log(data);

            });
          });

        console.log(chatRoomArray);

      });

      return chatRoomArray;

    },

    createRoom: function () {

      /*var fb = new Firebase('https://swapllerdummy.firebaseio.com/');     
      var fbAuth = $firebaseAuth(fb);
      var authData = fbAuth.$getAuth();*/
      var randomRoomId = Math.round(Math.random() * 100000000);
      var userRef = new Firebase("https://swappler.firebaseio.com/users");
      var currentUserRef = $firebaseArray(userRef.child(authData.uid + "/chats"));
      var cardOwnerRef = $firebaseArray(userRef.child($rootScope.currentOwner + "/chats"));

      var userProfile = Profile(authData.uid);
      var cardownersProfile = Profile($rootScope.currentOwner);
      var buyerImage = buyershared.getProfileimageUrl();
      var sellerImage = sellershared.getProfileimageUrl();

      console.log(buyerImage);

      currentUserRef.$add({
        chatroom: randomRoomId
      });
      cardOwnerRef.$add({
        chatroom: randomRoomId
      });

      var ref = new Firebase("https://swappler.firebaseio.com/chatRooms/" + randomRoomId);
      ref.set({
        id: randomRoomId,
        name: $rootScope.thisCard.name,
        cardId: $rootScope.thisCard.$id,
        roomOwner: $rootScope.currentOwner,
        //sellerName: sellershared.getSellername(),
        //buyerImg: angular.fromJson(angular.toJson(buyerImage)),
        //sellerImg: angular.fromJson(angular.toJson(sellerImage))
      });
      return randomRoomId;

    },

    createNewRoom: function (newBuyer, seller, buyersList) {

      console.log("Buyer" + newBuyer);
      console.log("Seller" + seller);

      var randomRoomId = Math.round(Math.random() * 100000000);
      var userRef = new Firebase("https://swappler.firebaseio.com/users");
      var currentUserRef = $firebaseArray(userRef.child(newBuyer + "/chats"));
      //var cardOwnerRef =  $firebaseArray(userRef.child($rootScope.currentOwner + "/chats"));
      var cardOwnerRef = $firebaseArray(userRef.child(seller + "/chats"));
      //var cardOwnerRef = newBuyer;
      console.log("New Room id" + "=" + randomRoomId);

      var userProfile = Profile(newBuyer);
      var cardownersProfile = Profile(seller);

      currentUserRef.$add({
        chatroom: randomRoomId
      });
      cardOwnerRef.$add({
        chatroom: randomRoomId
      });

      var ref = new Firebase("https://swappler.firebaseio.com/chatRooms/" + randomRoomId);
      ref.set({
        id: randomRoomId,
        name: buyersList.name,
        cardId: buyersList.$id,
        roomOwner: seller,

      });
      return randomRoomId;

    }


  }
});