angular.module('swappler.myprofile')

.controller('OneUpProductDetailCtrl', function ($scope, $document, $stateParams, profilefac, $firebaseArray, $firebaseObject, navigationService, $ionicModal, oneUpItemsServices, $state) {




  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    console.log(fromState.name);
    if (fromState.name == "chat") {

      $scope.ref = true;
    }


  })



  var actualitem = $firebaseObject(profilefac.wishlistdetail($stateParams.itemId));
  console.log(actualitem);

  var itemowner = $firebaseObject(profilefac.itemownerdetail($stateParams.itemId));
  console.log(itemowner);



  $scope.itemdetail = actualitem;


  $scope.$on('$ionicView.afterEnter', onViewAfterEnter);



  function onViewAfterEnter() {


    itemowner.$loaded(function () {
      $scope.sellerID = itemowner.$value;
      console.log($scope.sellerID);

      $scope.userinfo = $firebaseObject(profilefac.userinformation($scope.sellerID));

      console.log($scope.userinfo);
    })
  }






  $scope.iwant = iwant;


  function iwant() {
    var itemId = $stateParams.itemId;
    oneUpItemsServices.demand($scope.loginID, itemId);
    $scope.queueModal.show();
    $scope.itemID = itemId;
  }






  function iwantOldVersion() {
    var date = new Date();
    var newTimestamp = date.getTime();


    console.log($stateParams.itemId);
    profilefac.wishList($scope.loginID).child($stateParams.itemId).set(true);

    var queueArray = $firebaseArray(profilefac.itemqueue($stateParams.itemId));
    queueArray.$loaded(function () {

      var index = queueArray.$indexFor($scope.loginID);
      if (queueArray.length == 0) {

        profilefac.itemqueue($stateParams.itemId).child($scope.loginID).setWithPriority(true, newTimestamp);
      }
      if (index == -1) {
        profilefac.itemqueue($stateParams.itemId).child($scope.loginID).setWithPriority(true, newTimestamp, onComplete);


        function onComplete() {

          $scope.userQueue;
          $scope.queueModal.show();
        }
      } else {
        $scope.userQueue = index + 1;
        $scope.queueModal.show();
      }
    })


  };

  $scope.unwant = function () {
    console.log($scope.loginID);
    profilefac.wishList($scope.loginID).child($stateParams.itemId).remove();
    profilefac.itemqueue($stateParams.itemId).child($scope.loginID).remove();
  }




  var obj = $firebaseObject(profilefac.wishList($scope.loginID).child($stateParams.itemId));

  obj.$loaded(function (obj) {
    console.log(obj === $stateParams.itemId);
    console.log(obj);
    console.log(obj.$priority);
    console.log($stateParams.itemId);
    console.log($scope.loginID);

    if (obj.$id === true) {
      $scope.wantbutton = true;


    } else {
      $scope.wantbutton = false;
    }

  });

  $scope.chat = function (itemId) {
    $state.go('chat', {
      roomId: $stateParams.itemId
    });
  }

  $scope.clickedyclack = function () {
    $scope.queueModal.hide();
    navigationService.toPage('cards');
  };


  $ionicModal.fromTemplateUrl('queueModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.queueModal = modal;
  });




})