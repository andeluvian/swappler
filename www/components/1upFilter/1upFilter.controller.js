angular.module('starter.controllers')

.controller('oneUpFiltersCtrl', function ($scope, $state, $timeout, $firebaseAuth, $firebaseObject, Profile, navigationService, user, userDump, oneUpItems) {

    $scope.mainCategory = oneUpItems.primaryCategory();



    $scope.selection = [];
    $scope.mainCategorySelection = [];
    var obj = $firebaseObject(user.settings($scope.loginID));
    obj.$loaded()
      .then(function (data) {
        $scope.filterData.distance = data.distance;
        $scope.filterData.maxprice = data.maxprice;
        $scope.filterData.minprice = data.minprice;
        $scope.filterData.maxshoe = data.maxshoe;
        $scope.filterData.minshoe = data.minshoe;
        $scope.filterData.price = data.price;
        $scope.filterData.size = data.size;
        $scope.filterData.maxSize = data.maxSize;


        $scope.selection.id = data.searchCategory;
        $scope.mainCategorySelection.id = data.mainCategory;
      })
      .catch(function (error) {
        console.error("Error:", error);
      });

    var numberArray = [00, 01, 02, 03, 04, 05, 06];
    var alphabetArray = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
    var topsArray = ['01', '02', '03', '04'];
    $scope.letterMax = numberArray.length - 1;

    $scope.alphabetTranslate = function (value) {
      numberArray[value] = alphabetArray[value];

      return alphabetArray[value];
    };

    $scope.close = function () {
      console.log('Supposed to go to Cards page');
      navigationService.toPage('cards');
    };

    $scope.filterData = [];




    $scope.applyChanges = function () {

      var object = user.settings($scope.loginID);
      object.child('distance').set($scope.filterData.distance);
      object.child('minprice').set($scope.filterData.minprice);
      object.child('maxprice').set($scope.filterData.maxprice);

      object.child('minshoe').set($scope.filterData.minshoe);
      object.child('maxshoe').set($scope.filterData.maxshoe);
      object.child('size').set($scope.filterData.size);
      object.child('maxSize').set($scope.filterData.maxSize);

      object.child('searchCategory').set($scope.selection.id);
      object.child('mainCategory').set($scope.mainCategorySelection.id);
      navigationService.toPage('cards');

    }

    $scope.categories = [
      {
        "id": 'All',
        "name": "All"
      },
      {
        "id": '01',
        "name": "Tops"
      },
      {
        "id": '02',
        "name": "Blouses & Shirts"
      },
      {
        "id": '03',
        "name": "Jackets & Coats"
      },
      {
        "id": '04',
        "name": "Dresses & Jumpsuits"
      },
      {
        "id": '05',
        "name": "Skirts & Shorts"
      },
      {
        "id": '06',
        "name": "Trousers & Jeans"
      },
      {
        "id": '07',
        "name": "Shoes"
      },
      {
        "id": '08',
        "name": "Accessories"
      }
    ];


    $scope.checkCategorySearch = function (category) {
      if (topsArray.indexOf(category) !== -1) {
        return true
      } else {
        return false

      }
    }

    $scope.sliderTranslate = function (value) {
      var currencySymbol = '€';
      if (value == 251) {
        return currencySymbol + '250+';
      } else {

        return currencySymbol + ' ' + value;
      }
    }



  }) // JavaScript source code