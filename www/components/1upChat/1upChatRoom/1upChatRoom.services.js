angular.module('1up.ChatRoom', [])

.factory('oneUpChatRoom', function (mainFactory, $firebaseArray, $firebaseObject, userDump) {
  var ref = mainFactory.child('chatRoom');
  return {
    array: array,
    original: original,
    room: room,
    roomContentArray: roomContentArray,
    messageContent: messageContent,
    roomObject: roomObject,
    roomArray: roomArray,
    user: user,
    userInfo: userInfo
  }

  function array(roomId) {
    return $firebaseArray(ref.child(roomId));
  }

  function original() {
    return ref;
  }

  function room(roomId) {
    return ref.child(roomId);
  }

  function roomContentArray(roomId) {
    return $firebaseArray(ref.child(roomId).child('content'));
  }

  function messageContent(roomId, msgId) {
    return ref.child(roomId).child('content').child(msgId);
  }


  function roomObject(roomId) {
    return $firebaseObject(ref.child(roomId));
  }

  function roomArray(roomId) {
    return $firebaseArray(ref.child(roomId));
  }


  function user() {
    return $firebaseObject(userDump);
  }

  function userInfo(userId) {
    var userRef = userDump.child(userId);
    return $firebaseObject(userRef);

  }
})