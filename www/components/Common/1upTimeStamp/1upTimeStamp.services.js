angular.module('1up.timestamp', [])

.factory('oneUpTimestamp', function () {
  function generateUTC() {
    var d = new Date().getTime();
    return d;
  };
  return generateUTC();
})