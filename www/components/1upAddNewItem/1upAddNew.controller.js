angular.module('starter.controllers')


.controller("oneUpAddnewCtrl", function ($scope, $http, $state, $firebaseObject, $firebaseArray, $firebaseAuth, $ionicPopup, $ionicModal, user, oneUpItems, navigationService,
  $cordovaCamera, Profile, geoLocation, $geofire, oneUpChatRoom, profilefac, userDump, OneUpAlert) {


  $scope.items = {};
  $scope.items.meetingPlace = '';

  var getData = $firebaseObject(profilefac.userinformation($scope.loginID));

  getData.$loaded()
    .then(function (data) {

      console.log(data.premium);
      if (data.premium === true) {

        $scope.isPremium = true;
      } else {
        $scope.isPremium = false;

      }

    })


  $scope.close = function () {

    navigationService.toPage('cards');
  };

  $scope.submit = function (selectionId) {
    var ItemID = $scope.selection.id + '-' + ('0' + $scope.items.size).slice(-2) + '-' + $scope.generateUTC();
    var item = $firebaseObject(oneUpItems.original().child(ItemID));
    var clothes = ['01', '02', '03', '04'];

    item.imageURL = $scope.items.image;
    item.name = $scope.items.name;
    item.size = $scope.items.size;
    item.cost = $scope.items.cost;
    item.desc = $scope.items.desc;
    item.meetingPlace = $scope.items.meetingPlace;
    item.category = $scope.selection.id;
    item.subCategory = $scope.CategorySelection.id;
    item.sellingMethod = $scope.options.id;
    item.submitedby = $scope.loginID;
    item.postagePrice = $scope.postageSelection.id;
    item.createdAt = $scope.generateUTC();
    item.location = {
      lat: $scope.deviceLocation.lat,
      long: $scope.deviceLocation.long
    };




    if ($scope.items.name === undefined || $scope.items.size === undefined || $scope.items.desc === undefined || $scope.items.cost === undefined || $scope.selection.id === undefined) {

      OneUpAlert.alert('Fill all the fields to submit a product');

    } else {
      item.$save().then(function (ref) {

        oneUpChatRoom.room(ref.key()).child('owner').set($scope.loginID);
        oneUpChatRoom.room(ref.key()).child('buyer').set(true);
        oneUpChatRoom.room(ref.key()).child('isSold').set(false);
        userDump.child($scope.loginID).child('sellItems').child(ref.key()).set(true);

        $scope.items.name = undefined;
        $scope.items.size = undefined;
        $scope.items.desc = undefined;
        $scope.items.cost = undefined;
        $scope.items.meetingPlace = '';
        $scope.items.sellingMethod = undefined;
        $scope.selection.id = '0';
        $scope.CategorySelection.id = 'secondhand';
        $scope.postageSelection.id = '0';
        OneUpAlert.alert('Product succesfully submited');
        $scope.closeModal();

      })


    }
  };


  $scope.generateUTC = function () {


    var d = new Date().getTime();
    return d.toString();

  }



  $scope.upload = function () {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 600,
      targetHeight: 600,
      saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function (imageData) {

      $scope.imgSrc = "data:image/jpeg;base64," + imageData;
      $scope.items.image = imageData;
      $scope.showModal('image-popover.html');

    }, function (error) {
      OneUpAlert.alert(error);

    })
  };

  $scope.selectPicture = function () {
    var options = {
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 600,
      targetHeight: 600,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function (imageData) {

      $scope.imgSrc = "data:image/jpeg;base64," + imageData;
      $scope.items.image = imageData;
      $scope.showModal('image-popover.html');

    }, function (err) {

      OneUpAlert.alert(err);

    })
  };

  $scope.showImages = function (index) {
    $scope.activeSlide = index;
    $scope.showModal('image-popover.html');
  }
  $scope.showModal = function (templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  }


  $scope.closeModal = function () {
    $scope.modal.hide();
    $scope.modal.remove()
  };
  console.log(categoryArray(oneUpItems.categoryList()));

  function categoryArray(array) {
    return array.splice(0, 0);
  }

  $scope.categories = oneUpItems.categoryList();
  $scope.primaryCategories = oneUpItems.primaryCategory();
  $scope.OptionGroups = oneUpItems.optGroup();
  $scope.sellOptions = oneUpItems.sellOptions();

  $scope.options = {};

  $scope.postageSelection = {
    id: '0'
  };
  $scope.selection = {
    id: '0'

  };

  $scope.CategorySelection = {
    id: 'secondhand'

  };


  $scope.choosedAddress = "defaultAddress";



  $scope.filterSizeInput = filterSizeInput;

  function filterSizeInput(selectionId) {

    var clothes = ['01', '02', '03', '04'];
    var bottom = ['05', '06'];


    if (clothes.indexOf(selectionId) != -1) {

      return true

    }

  }

})