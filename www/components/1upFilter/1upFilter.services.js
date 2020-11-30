angular.module('starter')

.factory('filterCard', function ($firebaseArray) {

  return $firebaseArray.$extend({
    single: single,
    all: all
  })

  function single(deviceLat, deviceLong, radius, userId, minprice, maxprice, subCategory) {
    var returnArray = [];
    angular.forEach(this.$list, function (data) {
      var itemLat = data.location.lat;
      var itemLong = data.location.long;
      var owner = data.submitedby;

      var dX = itemLong - deviceLong;
      var dY = itemLat - deviceLat;
      var distance = (Math.sqrt((dX * dX) + (dY * dY))) * 100;

      if (distance <= radius && distance !== undefined && owner !== userId && data.cost >= minprice && data.cost <= maxprice && data.subCategory === subCategory) {
        returnArray.push(data);
      }
    })
    return returnArray;
  }

  function all() {
    return null;
  }



})