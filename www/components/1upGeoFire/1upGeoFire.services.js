angular.module('1up.GeoFire', [])

.factory('geoFireFactory', function ($geofire, mainFactory, oneUpItems) {
  var mainRef = mainFactory;
  return {
    items: items
  }

  function items() {
    var itemRef = mainFactory.child('items-location');
    var geo = $geofire(itemRef);
    return geo;
  }
})

.factory('testFilterItemByDistance', function ($firebaseArray) {

  return $firebaseArray.$extend({
    distance: function (deviceLat, deviceLong, radius, userId) {
      var returnArray = [];
      angular.forEach(this.$list, function (data) {
        var itemLat = data.location.lat;
        var itemLong = data.location.long;
        var owner = data.submitedby;

        var dX = itemLong - deviceLong;
        var dY = itemLat - deviceLat;
        var distance = (Math.sqrt((dX * dX) + (dY * dY))) * 100;

        if (distance <= radius && distance !== undefined && owner !== userId) {
          returnArray.push(data);
        }
      })
      return returnArray;
    }
  })
})