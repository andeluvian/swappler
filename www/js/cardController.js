angular.module('starter.controllers')




.controller('CardsCtrl', function ($scope, $http, $state, $firebaseObject,
  $firebase, $firebaseArray, $firebaseAuth, $ionicPopup, $ionicModal,
  $cordovaCamera, $rootScope, TDCardDelegate, Profile, $ionicLoading, Rooms,
  buyershared, sellershared, $cordovaSocialSharing, geoLocation, $geofire, $ImageCacheFactory, lodash) {
  // Scopes.store("CardsCtrl", $scope);
  var fb = new Firebase('https://swappler.firebaseio.com/');
  var $geo = $geofire(new Firebase('https://swappler.firebaseio.com/locations'));
  //var ref = new Firebase("https://swapllerdummy.firebaseio.com/");



  $scope.cards = [];
  var fbAuth = $firebaseAuth(fb);
  // $scope.images = [];
  var authData = fbAuth.$getAuth();
  $scope.auth = authData;

  var currentItemRefId;
  var currentOwnerId = $rootScope.currentOwner; // current card owner id
  //var vm = this;
  if (authData) {
    var obj = $firebaseObject(fb.child("/users/" + authData.uid));
    obj.$loaded()
      .then(function (data) {
        console.log(data === obj); // true
        $scope.minprice = data.settings.minprice;
        $scope.maxprice = data.settings.maxprice;
        console.log($scope.minprice + "-" + $scope.maxprice);
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  } else {
    $state.go("login");
  }



  var cardTypes = [];

  //Profile(authData.uid).$bindTo($scope, "profile");

  //$scope.profile = Profile(authData.uid);

  //console.log($scope.profile);
  //console.log($scope.profile.settings);
  $scope.minprices = function (card) {
    console.log($scope.profile.minprice);
    return card.cost >= $scope.minprice;
    //return card.cost >= 100;
  };

  $scope.maxprices = function (card) {
    console.log($scope.profile.minprice);
    return card.cost <= $scope.maxprice;
    //return card.cost <= 500;
  };

  /*app.filter('range', function() {
     return function(input, min, max) {
     min = parseInt(min); //Make string input int
     max = parseInt(max);
     for (var i=min; i<max; i++)
     input.push(i);
     return input;
     };
   });*/

  //get current location
  $scope.location = geoLocation.getGeolocation();
  console.log($scope.location);

  //$scope.cardLocation
  /*$geo.$get($scope.cardLocation)
      .then(function (location) {
          $scope.objLocation = location;
      });*/

  var usersids = [];


  var connectedPlayerRef = $firebaseObject(fb.child("users/" + authData.uid + "/myLikes"));
  connectedPlayerRef.$loaded().then(function (data) {
    $scope.connectedPlayer = data;
    console.log($scope.connectedPlayer);

  }).catch(function (error) {

  });


  /*$scope.alreadyAddedValues = function() {
    $scope.myLikes = $firebaseObject(fb.child("users/" + authData.uid + "/myLikes"));
    //console.log($scope.myLikes);
      return $scope.myLikes;
  }*/

  /*$scope.filterAlreadyAdded = function(item) {
         //console.log($scope.alreadyAddedValues.indexOf(item).item == -1);
           return ($scope.alreadyAddedValues.indexOf(item) == -1);
   
       };*/



  var query = $geo.$query({
    center: [$scope.location.lat, $scope.location.lng],
    //center: [60.17, 24.93],
    radius: 20
  });

  // Setup Angular Broadcast event for when an object enters our query
  var geoQueryCallback = query.on("key_entered", "SEARCH:KEY_ENTERED");

  //  $ionicLoading.show({noBackdrop: false, template: '<ion-spinner icon="ripple" class="spinner-assertive"/>'})

  // Listen for Angular Broadcast
  $scope.$on("SEARCH:KEY_ENTERED", function (event, key, location, distance) {

    // Do something interesting with object
    console.log(key);
    console.log(location);
    console.log(distance);
    //$scope.searchResults.push({key: key, location: location, distance: distance});
    //usersids.push({key: key, location: location, distance: distance});

    /*playersObj.$loaded().then(function(data) {
               var connectedId = _.pluck($scope.connectedPlayer, "$id");
               if(connectedId.indexOf(data.$id) < 0){
   
                 $scope.geoPlayers.push(data);
               }
   
   
             }).catch(function(error) {
               console.error("Error:", error);
   
             });        */

    var productData = $firebaseObject(fb.child('items/' + key));
    productData.$loaded(function (user) {
      //usersids.push(data);
      var connectedId = lodash.pluck($scope.connectedPlayer, "item");

      console.log(connectedId);
      console.log(user.submitedby);
      if (user.submitedby != authData.uid && connectedId.indexOf(user.$id) < 0) {
        //if (connectedId.indexOf(data.$id) < 0) {
        //console.log(user.name);

        cardTypes.push(user);

        //$scope.cards = Array.prototype.slice.call(cardTypes, 0);
        $scope.cards = cardTypes;
        //Build the list of images to preload
        /*$scope.images = [];
        for(var i=0; i< $scope.cards.length;i++){
          $scope.images.push("data:image/jpeg;base64," + $scope.cards[i].image);
        }

        $ImageCacheFactory.Cache($scope.images);*/

        //set rootscopes and stuff once cards are stacked
        $rootScope.currentOwner = $scope.cards[$scope.cards.length - 1].submitedby;
        //console.log("Error on this ID" + key);
        $scope.cardOwner = Profile($rootScope.currentOwner);
        $scope.cardLocation = $scope.cards[$scope.cards.length - 1].$id;


      } else {
        console.log(user.submitedby + authData.uid);
      }

    });


    /*ItemsService.child_added(key, function(addedChild){
      $scope.cards.push(addedChild);
    });*/

    // Cancel the query if the distance is > 20 km
    if (distance > 20) {
      geoQueryCallback.cancel();
    }

    //           $ionicLoading.hide(); //hide loader
  });

  /*$scope.availableGroups = (function () {
      var assignedGroupsIds = {};
      var groupsIds = {};
      var result = [];
       
      $scope.myLikes.forEach(function (el, i) {
        //console.log(el);
        assignedGroupsIds[el.item] = $scope.myLikes[i];
      });
       
      $scope.cards.forEach(function (el, i) {
        groupsIds[el.$id] = $scope.cards[i];
      });
       
      for (var i in groupsIds) {
       
          if (!assignedGroupsIds.hasOwnProperty(i)) {
            console.log(groupsIds[i]);
              result.push(groupsIds[i]);
          }
      }
       
       
      return result;
  }());
       
   console.log($scope.availableGroups);*/

  /*$scope.searchResults = usersids;
   
       console.log($scope.searchResults);*/


  if ($rootScope.currentOwner) {
    $scope.cardOwner = Profile($rootScope.currentOwner);
    console.log($scope.cardOwner);
  }
  //$scope.cardOwner = [];

  // var userData = $firebaseArray(fb.child('items').orderByChild('cost').startAt('80').endAt('250'));
  var userData = $firebaseArray(fb.child('items'));

  //modal methods
  $ionicModal.fromTemplateUrl('queueFirst-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal
  })

  $scope.openFirstModal = function () {
    $scope.modal.show()
  }

  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function () {
    $scope.modal.remove();
    $scope.modalSecond.remove();
    $scope.modalThird.remove();
    $scope.modalReport.remove();

  });

  $ionicModal.fromTemplateUrl('queueSecond-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modalSecond) {
    $scope.modalSecond = modalSecond
  })

  $scope.openSecondModal = function () {
    $scope.modalSecond.show()
  }

  $scope.closeSecondModal = function () {
    $scope.modalSecond.hide();
  };

  //Modal for Card Details
  $ionicModal.fromTemplateUrl('templates/product-details.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modalThird) {
    $scope.modalThird = modalThird
  })

  $scope.openThirdModal = function () {
    $scope.modalThird.show()
  }

  $scope.closeThirdModal = function () {
    $scope.modalThird.hide();
  };

  //modal for Reporting
  $ionicModal.fromTemplateUrl('templates/report.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modalReport) {
    $scope.modalReport = modalReport
  })

  $scope.openReportModal = function () {
    $scope.modalReport.show()
  }

  $scope.closeReportModal = function () {
    $scope.modalReport.hide();
  };

  //modal for Sharing
  $ionicModal.fromTemplateUrl('templates/sharing.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modalShare) {
    $scope.modalShare = modalShare
  })

  $scope.openShareModal = function () {
    $scope.modalShare.show()
  }

  $scope.closeShareModal = function () {
    $scope.modalShare.hide();
  };



  /*$ionicLoading.show({noBackdrop: true, template: '<ion-spinner icon="ripple" class="spinner-assertive"/>'})
      //firebase methods
    userData.$loaded()
      .then(function(){
          angular.forEach(userData, function(user) {
  
              if (user.submitedby != authData.uid) {
                  //console.log(user.submitedby);
                  cardTypes.push(user);
                  //console.log("Found and item near you :" + user);
                  $scope.cards = Array.prototype.slice.call(cardTypes, 0);
  
                  $rootScope.currentOwner = $scope.cards[$scope.cards.length - 1].submitedby;
                  $scope.cardOwner = Profile( $rootScope.currentOwner);
                  $scope.cardLocation = $scope.cards[$scope.cards.length - 1].$id;
                        //Build the list of images to preload
                  $scope.images = [];
  
                  for(var i=0; i< $scope.cards.length;i++){
                    $scope.images.push("data:image/jpeg;base64," + $scope.cards[i].image);
                  }
  
                  $ImageCacheFactory.Cache($scope.images);
               $ionicLoading.hide();
              }else{
                console.log(user.submitedby + authData.uid);
              }
          })
    });*/

  $scope.cardsControl = {};
  //$rootScope.currentOwner = TDCardDelegate.$getByHandle('friends').getFirstCard()

  $scope.reload = function () {
    $scope.cards = Array.prototype.slice.call(cardTypes, 0);
    console.log(TDCardDelegate.$getByHandle('friends').getFirstCard());
    //$rootScope.currentOwner = $scope.cards[index - 1].submitedby;
  }

  $scope.cardDestroyed = function (index) {
    $scope.cards.splice(index, 1);

  };

  $scope.addCard = function () {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  };

  $scope.yesClick = function () {
    var userId = authData.uid;
    //$scope.cardsControl.swipeRight();
    TDCardDelegate.$getByHandle('friends').getFirstCard().swipe('right').then(function () {
      $scope.isAnimating = false;
    });

    $rootScope.thisCard = $scope.cards[index];
    //var cardID = $scope.cards[index].$id;

    if ((index - 1) != null) {
      //$rootScope.currentOwner = $scope.cards[index - 1].submitedby;
      $rootScope.currentOwner = $scope.cards[index].submitedby;
      $scope.cardOwner = Profile($rootScope.currentOwner);
      console.log($scope.cardOwner);
    }

    var cardID = $scope.cards[index].$id;
    var upvotesRef = fb.child("items/" + cardID + "/likes");
    var userLikeRef = fb.child("users/" + authData.uid + "/myLikes/");
    $scope.cardObject = $firebaseObject(upvotesRef);
    var myLikes = $firebaseArray(userLikeRef);

    var userpr = fb.child("users/" + $rootScope.currentOwner);
    var sellerProf = $firebaseArray(userpr);

    sellerProf.$loaded(function (x) {
      sellershared.setProfile(x);
      //var rec = x.$keyAt(6);
      $scope.temp = x.$getRecord("imageUrl");
      //console.log(rec);
      console.log($scope.temp.$value);
      sellershared.setProfileimageUrl($scope.temp.$value);
      console.log("get method" + sellershared.getProfile());
      console.log("get method" + sellershared.getProfileimageUrl());

    }, function (error) {
      console.error("Error in 1504 ", error);
    })

    var list = $firebaseArray(upvotesRef);
    //list.$add({ user: authData.uid }).then(function(ref) {
    list.$add({
      userId: true
    }).then(function (ref) {
      var id = ref.key();
      console.log("added record with id " + id);
      $scope.likerId = list.$indexFor(id);

      if ($scope.likerId > 0) {
        console.log($scope.likerId); // returns location in the array
        $scope.openSecondModal();

      } else {
        console.log($scope.likerId); // returns location in the array
        $scope.openFirstModal();
      }
    });

    myLikes.$add({
      item: cardID
    }).then(function (ref) {
      var id = ref.key();
      console.log("Added item Id to" + authData.uid + "my likes");
    })
  };

  $scope.noClick = function () {
    // $scope.cardsControl.swipeLeft();
    //console.log( TDCardDelegate.getSwipeableCard($scope));
    //TDCardDelegate.getSwipeableCard($scope).swipe();
    TDCardDelegate.$getByHandle('friends').getFirstCard().swipe('left').then(function () {
      $scope.isAnimating = true;
    });
    console.log(TDCardDelegate.$getByHandle('friends').getFirstCard());

    /*$rootScope.currentOwner = $scope.cards[index - 1].submitedby;
          //$rootScope.currentOwner = $scope.cards[index].submitedby;
          $scope.cardOwner = Profile( $rootScope.currentOwner);
          console.log($scope.cardOwner);     */
  };

  //Social sharing methods

  $scope.shareViaInstagram = function () {
    $cordovaSocialSharing
      .canShareVia('Instagram', "Swappler Mobile App - Your way to buy and sell beautiful products",
        "https://www.swapplerapp.com/images/swappler-tw.jpg", "https://www.swapplerapp.com")
      .then(function (result) {
        // Success!
        alert("posted successfully");
      }, function (err) {
        // An error occurred. Show a message to the user
        console.log("Error :" + err);
        alert("Please install Instagram app");
      });
  }

  $scope.shareViaTwitter = function () {
    $cordovaSocialSharing
      .shareViaTwitter("Swappler Mobile App - Your way to buy and sell beautiful products",
        "https://www.swapplerapp.com/images/swappler-tw.jpg", "https://www.swapplerapp.com")
      .then(function (result) {
        // Success!
        alert("posted successfully");
      }, function (err) {
        // An error occurred. Show a message to the user
        console.log("Error :" + err);
        alert("Please install Twitter app");
      });
  }

  $scope.shareViaFacebook = function () {
    $cordovaSocialSharing
      .shareViaFacebook("Swappler Mobile App - Your way to buy and sell beautiful products",
        "https://www.swapplerapp.com/images/swappler-tw.jpg", "https://www.swapplerapp.com")
      .then(function (result) {
        // Success!
        alert("posted successfully");
      }, function (err) {
        // An error occurred. Show a message to the user
        console.log("Error :" + err);
        alert("Please install Facebook app");
      });
  }

  $scope.shareAnywhere = function () {
    $cordovaSocialSharing.share("Swappler", "Swappler Mobile App - Your way to buy and sell beautiful products",
      "https://www.swapplerapp.com/images/swappler-tw.jpg", "https://www.swapplerapp.com");
  }

  //Socail sharing metods End

  $scope.Notifications = function () {
    console.log('Supposed to go to Cards page');
    $state.go('notifications');
  };
  $scope.Categories = function () {
    $state.go('categories');
  };
  $scope.Addnew = function () {
    $state.go('Addnew');
  };

  $scope.chat = function () {
    $scope.modal.hide();
    var room = Rooms.createRoom();

    console.log(room);
    $state.go('chat', {
      roomId: room
    });
  };

  $scope.Ownerprofile = function () {
    $state.go("addprofile");
  };
  $scope.menu = function () {
    console.log("go to profile page")
    $state.go('profile');
    // $state.go('chat')
    //$state.go('addprofile');
  };


  //$scope.addCards(2);
  $scope.cardSwipedLeft = function (index) {


    $rootScope.currentOwner = $scope.cards[index - 1].submitedby;
    //$rootScope.currentOwner = $scope.cards[index].submitedby;
    $scope.cardOwner = Profile($rootScope.currentOwner);
    console.log($scope.cardOwner);

  };


  $scope.cardSwipedRight = function (index) {
    $rootScope.thisCard = $scope.cards[index];
    //var cardID = $scope.cards[index].$id;
    var userId = authData.uid;
    console.log(userId);

    if ((index - 1) != null) {
      $rootScope.currentOwner = $scope.cards[index].submitedby;
      //$rootScope.currentOwner = $scope.cards[index].submitedby;
      $scope.cardOwner = Profile($rootScope.currentOwner);
      console.log($scope.cardOwner);
    }


    var cardID = $scope.cards[index].$id;
    var upvotesRef = fb.child("items/" + cardID + "/likes");
    var userLikeRef = fb.child("users/" + authData.uid + "/myLikes/");
    $scope.cardObject = $firebaseObject(upvotesRef);
    var myLikes = $firebaseArray(userLikeRef);

    var userpr = fb.child("users/" + $rootScope.currentOwner);
    var sellerProf = $firebaseArray(userpr);

    sellerProf.$loaded(function (x) {
      sellershared.setProfile(x);
      //var rec = x.$keyAt(6);
      $scope.temp = x.$getRecord("imageUrl");
      //console.log(rec);
      console.log($scope.temp.$value);
      sellershared.setProfileimageUrl($scope.temp.$value);
      sellershared.setSellername($scope.temp.name);
      //console.log("get method" + sellershared.getProfile());
      //console.log("get method" + sellershared.getProfileimageUrl());

    }, function (error) {
      console.error("Error in 1504 ", error);
    })

    var list = $firebaseArray(upvotesRef);
    list.$add({
      user: authData.uid
    }).then(function (ref) {
      //list.$add({ userId: true }).then(function(ref) {

      var id = ref.key();
      upvotesRef.child(id).child(authData.uid).set(true);
      console.log("added record with id " + id);
      $scope.likerId = list.$indexFor(id);

      if ($scope.likerId > 0) {
        console.log($scope.likerId); // returns location in the array
        $scope.openSecondModal();

      } else {
        console.log($scope.likerId); // returns location in the array
        $scope.openFirstModal();
      }
    });

    myLikes.$add({
      item: cardID
    }).then(function (ref) {
      var id = ref.key();
      console.log("Added item Id to" + authData.uid + "my likes");
    })



  };
  $scope.cardClicked = function (index) {

    $scope.index = index;
    //console.log('Clicked');
    //  $rootScope.currentOwner = $scope.cards[index].submitedby;
    // var cardID = $scope.cards[index].$id;
    // var upvotesRef =  fb.child("items/" + cardID);
    // $scope.currentCard = $firebaseObject(upvotesRef);
    // $scope.cardObject = $firebaseObject(upvotesRef);
    // $state.go("addprofile");
    $scope.openThirdModal();
  };

  // This method is temprory as it stores rooscope only after swipe, we need to it from the start...
  $scope.cardSwiped = function (index) {
    //console.log('cardSwiped', $scope.cards[index].submitedby);

  };

  /* $scope.cardDestroyed = function(index) {
       $scope.cards.splice(index, 1);
        //$scope.cards.splice(index, 1);
      //$scope.addCards(1);
       //$scope.addCard();
   };*/
  //var currentCard =  TDCardDelegate.$getByHandle('friends').getFirstCard();



})
