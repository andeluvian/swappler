angular.module('mainFooter', [])

.directive('cardsFooter', function (navigationService, $rootScope, notify) {
  return {
    templateUrl: 'components/Navigation/1upFooter.html',
    restrict: 'E',
    scope: {

    },
    link: link,
    controller: 'cardFooterCtrl'
  }




  function link(scope, elem, attrs) {
    var userID = $rootScope.loginID;
    if (userID != undefined) {
      var notificationTable = notify.general(userID);
      notificationTable.$watch(function () {
        var count = 0;
        notificationTable.forEach(function (noti) {
          if (noti.isRead === false) {
            count++;
          }
        })
        scope.unReadNotification = count;
      })
    }

    scope.toFilter = function () {
      navigationService.toPage('categories');
    }

    scope.toAddNew = function () {
      navigationService.toPage('Addnew');

    }
    scope.toProfile = function () {
      navigationService.toPage('profile');

    }

    scope.toNotifications = function () {
      navigationService.toPage('notifications');
      navigationService.transition('right')
    }

    scope.toSearch = function () {
      navigationService.toPage('peopleToFollow');
    }
  }



})

.directive('backFooter', function (navigationService) {
  return {
    templateUrl: 'components/Navigation/1upBackFooter.html',
    restrict: 'E',
    scope: {

    },
    link: lonk
  }


  function lonk(scope, elem, attrs) {
    scope.back = function () {
      navigationService.back();
    }
  }

})

.directive('closeFooter', function (navigationService) {
    return {
      templateUrl: 'components/Navigation/1upCloseFooter.html',
      restrict: 'E',
      scope: {
        direction: '=',
        transition: '='
      },
      link: lonk
    }


    function lonk(scope, elem, attrs) {
      scope.toProfile = function () {

        navigationService.toPage(scope.direction);
        navigationService.transition(scope.transition)
      }
    }

  }

)

.directive('cardFooter', function (navigationService) {
    return {
      templateUrl: 'components/Navigation/1upCardFooter.html',
      restrict: 'E',
      scope: {

      },
      link: lonk

    }


    function lonk(scope, elem, attrs) {
      scope.toCards = function () {
        navigationService.toPage('cards');

      }
    }

  }

)