angular.module('1up.ChatRoom')

.factory("chatList", function ($firebaseArray) {
  return $firebaseArray.$extend({
    roomList: roomList
  })

  function roomList(type, userId) {
    var original = this.$list;

    function array() {
      var array = [];
      original.forEach(function (data) {
        if (type === "buying" && data.buyer === userId) {
          array.push(data)
        }
        if (type === "selling" &&
          data.owner === userId && data.buyer !== true) {
          array.push(data)
        }
      })
      return array;
    }

    var list = array().map(function (data) {
      var count = 0;
      var content = data.content;
      for (var i in content) {
        if (content[i].sender !== userId && content[i].isRead === false) {
          count++;
        }
      }
      data.unRead = count;
      return data
    })
    return list
  }
})