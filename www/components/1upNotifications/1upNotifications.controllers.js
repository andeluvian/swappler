angular.module('starter')

.controller('OneUpNotificationsCtrl', function ($scope, user, notify, $firebaseObject, $state, notificationFactory, $firebaseArray, $ionicScrollDelegate, $timeout) {
  $scope.limit = 3;
  var originalNotification = $firebaseArray(notificationFactory.child($scope.loginID));

  var getNotificationCategory = $firebaseObject(notificationFactory.child($scope.loginID).orderByKey().limitToLast(6));
  var getUserInfo = user.original();

  $scope.$on('$ionicView.afterEnter', onViewAfterEnter);
  $scope.$on('$ionicView.afterLeave', onViewAfterLeave);


  function onNotificationLoad() {

    getNotificationCategory.$loaded(function (notiMsg) {
      var read = [];
      var unRead = [];
      notiMsg.forEach(function (notiData) {
        if (notiData.isRead === true) {
          read.push(notiData);
        } else {
          unRead.push(notiData);
        }
      })

      $scope.readNotification = read;
      $scope.unReadNotification = unRead;

      $scope.getScrollPosition = onScrollAction;

      console.log($scope.readNotification.length);


      function onScrollAction() {
        var maxTop = $ionicScrollDelegate.getScrollView().__maxScrollTop;
        var scrollPosition = $ionicScrollDelegate.getScrollPosition().top;

        if (maxTop === scrollPosition) {




          var loadNumber = 10;

          originalNotification.$loaded(function (data) {
            if (originalNotification.length >= $scope.readNotification.length && originalNotification.length >= $scope.limit) {

              for (var i = 1; i <= loadNumber; i++) {
                var pushValue = originalNotification[originalNotification.length - $scope.readNotification.length - i];
                if ($scope.readNotification.indexOf(pushValue) == -1) {

                  $scope.readNotification.push(pushValue);

                }
                console.log($scope.readNotification.length);
              }

            }



          })

        } else {
          $scope.showLoading = false;
        }
      }



      if ($scope.unReadNotification.length == 0) {
        $scope.showUnRead = false;
      } else {
        $scope.showUnRead = true;
      }
    })

  }

  function onViewAfterEnter() {
    onNotificationLoad()
    $scope.notificationInfo = function (userId) {
      return getNotificationCategory[userId];
    }

    $scope.userInfo = function (userID) {
      return getUserInfo[userID];
    }

  }

  function onViewAfterLeave() {

    $firebaseArray(notificationFactory.child($scope.loginID).orderByChild('isRead').equalTo(false)).$loaded(function (notiMsg) {

      console.log(notiMsg.length);
      for (var i = 0; i < notiMsg.length; i++) {

        notiMsg[i].isRead = true;
        notiMsg.$save(i);
      }


    })
  }


})