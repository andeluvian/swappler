angular.module('starter')

.factory('mainFactory', function () {


  var ref = new Firebase("https://swapllerdummy.firebaseio.com/");

  return ref;
})

.service('oneUpLoad', function ($ionicLoading) {

  this.show = show;
  this.hide = hide;

  function show(content) {
    $ionicLoading.show({

      content: 'Loading',
      template: '<ion-spinner icon="ripple" class="spinner-assertive"/></ion-spinner><br>' + content,
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    })
  }

  function hide() {
    $ionicLoading.hide();
  }
})

.service('OneUpAlert', function ($ionicPopup) {

  this.alert = alert;
  this.exitApp = exitApp;


  function alert(error) {
    $ionicPopup.alert({
      title: 'Swappler says:',
      content: error,
      cssClass: 'alertBox'
    });
  }

  function exitApp() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Swappler says:',
      template: 'Do you wanna leave?'
    });
    confirmPopup.then(function (res) {
      if (res) {
        ionic.Platform.exitApp();
      } else {
        confirmPopup.close();
      }
    });
  }
})