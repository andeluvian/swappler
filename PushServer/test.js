var gcm = require('node-gcm');
var message = new gcm.Message();

var sender = new gcm.Sender('AIzaSyDgPu-TvKsPy4xdfW16RADozR7EwxRJz5A');
var registrationIds = ['swapplerpush'];

message.addData('message', "\u270C Peace, Love \u2764 and PhoneGap \u2706!");
message.addData('title', 'Push Notification Sample');
message.addData('msgcnt', '3');
message.addData('soundname', 'beep9.mp3');
message.collapseKey = 'demo';
message.delayWhileIdle = true;
message.addData('image', "https://dl.dropboxusercontent.com/u/887989/antshot.png");
message.addData('style', 'picture');
message.addData('picture', "http://36.media.tumblr.com/c066cc2238103856c9ac506faa6f3bc2/tumblr_nmstmqtuo81tssmyno1_1280.jpg");
message.timeToLive = 3000;
message.addData('ledColor', [204, 102, 0, 0]);
message.addData('foreground', false);

registrationIds.push("APA91bFenAnKlQvIEQhntcPhw3F1YaiUR69POP_4pLaeaPO8sMJx5NQWEXvgu17ya1caTjkKI8ps3qidh7zYiFy9_expHvP78DIFmSQstw_ysarJ9pXjH7PcYQvUQXRmHco6vBTAvVDu3TmS0136fqEZfln_FL9OpQ");


sender.send(message, registrationIds, 4, function (result) {
  console.log(message);
});