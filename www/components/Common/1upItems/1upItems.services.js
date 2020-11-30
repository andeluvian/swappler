/**
 * 1up.Items Module
 *
 * Description
 */

angular.module('1up.Items')

.factory('oneUpItems', function (mainFactory, $firebaseArray, $firebaseObject, userDump) {
  var ref = mainFactory.child("items");
  return {
    object: object,
    array: array,
    original: original,
    user: users,
    queue: queue,
    detail: detail,
    searchByCategory: searchByCategory,
    categoryList: categoryList,
    primaryCategory: primaryCategory,
    optGroup: optGroup,
    sellOptions: sellOptions
  };

  function object() {
    return $firebaseObject(ref);
  }

  function array() {
    return $firebaseArray(ref);
  }

  function original() {
    return ref;
  }

  function users() {
    return $firebaseObject(userDump);
  }

  function queue(itemId) {
    return mainFactory.child('itemQueue').child(itemId);
  }

  function detail(itemId) {
    var queryRef = ref.child(itemId);
    return $firebaseObject(queryRef);
  }

  function searchByCategory(categoryId) {
    if (categoryId === "All") {
      return ref;
    } else {
      return ref.orderByKey().startAt(categoryId + '-01-0000000000000').endAt(categoryId + '-99-9999999999999');
    }
  }

  function sellOptions() {
    var sellOptions = [
      {
        "name": 'Cash only. Chat with buyer and meet up.',
        "id": 'cash'
      },
      {
        "name": 'Via Posti(Cash On Delivery) only. I send it to the buyer',
        "id": 'postage'
      },
      {
        "name": 'Both ways are fine',
        "id": 'both'
      }
    ];
    return sellOptions;
  }

  function optGroup() {
    var optGroup = [
      {
        "name": 'Package thickness less than 3cm',
        "options": [
          {
            "name": 'Less than 50g',
            "price": '5.30'
          },
          {
            "name": 'Less than 100g',
            "price": '5.80'
          },
          {
            "name": 'Less than 250g',
            "price": '6.40'
          },
          {
            "name": 'Less than 500g',
            "price": '8.60'
          },
          {
            "name": 'Less than 1kg',
            "price": '10.80'
          },
          {
            "name": 'Less than 2kg',
            "price": '15.20'
          }
          ]

      },
      {
        "name": 'Package thickness more than 3cm',
        "options": [
          {
            "name": 'Less than 2kg',
            "price": '12.10'
          },
          {
            "name": 'Less than 5kg',
            "price": '13.50'
          },
          {
            "name": 'Less than 10kg',
            "price": '14.70'
          },
          {
            "name": 'Less than 15kg',
            "price": '18.20'
          },
          {
            "name": 'Less than 35kg',
            "price": '23.90'
          }
        ]
          }
            ];
    return optGroup;
  }

  function primaryCategory() {

    var primaryCategory = [
      {
        "id": 'secondhand',
        "name": 'Second Hand Product'
      },
      {
        "id": 'handmade',
        "name": 'Designer Product (handmade)'
      }

    ];
    return primaryCategory;
  }

  function categoryList() {
    var category = [
      {
        "id": 'All',
        "name": "All",
        default: 0
      },
      {
        "id": '01',
        "name": "Tops",
        default: 0
      },
      {
        "id": '02',
        "name": "Blouses & Shirts",
        default: 0
      },
      {
        "id": '03',
        "name": "Jackets & Coats",
        default: 0
      },
      {
        "id": '04',
        "name": "Dresses & Jumpsuits",
        default: 0
      },
      {
        "id": '05',
        "name": "Skirts & Shorts",
        default: 28
      },
      {
        "id": '06',
        "name": "Trousers & Jeans",
        default: 28
      },
      {
        "id": '07',
        "name": "Shoes",
        default: 28
      },
      {
        "id": '08',
        "name": "Accessories",
        default: 28
      }
    ];
    return category;
  }
})

.service('oneUpItemsServices', function (mainFactory, userDump, $rootScope, $firebaseArray, oneUpItems) {

  this.discard = discard;
  this.demand = demand;
  this.getQueueNumber = getQueueNumber;


  function discard(Array, itemId) {
    var indexMap = Array.map(function (item) {
      return item.$id;
    });
    var itemIndex = indexMap.indexOf(itemId);
    Array.splice(itemIndex, 1);
  }

  function demand(userId, itemId) {
    var UTC = new Date().getTime();
    oneUpItems.queue(itemId).child(userId).setWithPriority(true, UTC);
    userDump.child(userId).child('wishList').child(itemId).set(true);
    $rootScope.userQueue = 3;


    var itemQueue = $firebaseArray(oneUpItems.queue(itemId));
    itemQueue.$loaded(function () {
      var userQueueIndex = itemQueue.$indexFor(userId);
      $rootScope.userQueue = userQueueIndex + 1;
      if (userQueueIndex == 0) {
        mainFactory.child('chatRoom').child(itemId).child('buyer').set(userId);
      }
    })

  }


  function getQueueNumber(userId, itemId) {



  }
})