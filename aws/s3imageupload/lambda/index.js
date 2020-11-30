/**
 * Lambda function Swappler-Authorize-Upload
 * Kenneth Falck <kennu@iki.fi> 2015
 */
var AWS = require('aws-sdk');
var https = require('https');
var urlmodule = require('url');
var crypto = require('crypto');

var GRAPH_API_URL = 'https://graph.facebook.com/v2.5/me';
var KEY_PREFIX = 'images/';
var ALLOWED_FILENAME_REGEXP = /^[^\/]+$/;
var ALLOWED_CONTENT_TYPE_REGEXP = /^image\/[a-zA-Z0-9-]+/;
var DOWNLOAD_URL_PREFIX = 'https://dtspdoz56doiv.cloudfront.net/' + KEY_PREFIX;
var UPLOAD_EXPIRE_SECONDS = 3600;
var USER_ID_SALT = 'WRE7Whs76dqVStFR';

/**
 * Pre-sign an upload URL and return it to the API Gateway.
 */
function authorizeUpload(userId, filename, contentType, context) {
    var s3 = new AWS.S3();
    var expires = new Date();
    expires.setTime(expires.getTime() + UPLOAD_EXPIRE_SECONDS*1000);
    var params = {
        Bucket: 'swapplerapp',
        Key: KEY_PREFIX + userId + '/' + filename,
        ContentType: contentType,
        Expires: UPLOAD_EXPIRE_SECONDS
    };
    s3.getSignedUrl('putObject', params, function (err, url) {
        console.log('Authorized upload for', userId, filename, contentType, 'as', url);
        context.succeed({
            filename: filename,
            contentType: contentType,
            uploadUrlExpires: expires.toISOString(),
            downloadUrl: DOWNLOAD_URL_PREFIX + userId + '/' + filename,
            uploadUrl: url
        });
    });
}

function obfuscateUserId(userId) {
    return crypto.createHash('sha1').update(USER_ID_SALT + userId).digest('hex');
}

/**
 * Event must contain the user's Facebook OAuth access token as
 * event.access_token, the upload filename as event.filename,
 * and the Content-Type of the file as event.content_type.
 */
exports.handler = function(event, context) {
    var url = GRAPH_API_URL + '?access_token=' + encodeURIComponent(event.access_token);
    var filename = event.filename;
    if (!filename || !filename.match || !filename.match(ALLOWED_FILENAME_REGEXP)) {
        return context.fail('Invalid filename');
    }
    var contentType = event.content_type;
    if (!contentType || !contentType.match || !contentType.match(ALLOWED_CONTENT_TYPE_REGEXP)) {
        return context.fail('Invalid content type');
    }
    var req = https.request(urlmodule.parse(url), function(res) {
        var body = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            var userInfo;
            try {
                userInfo = JSON.parse(body);
            } catch (err) {
                return context.fail(err);
            }
            if (!userInfo || !userInfo.id) {
                return context.fail('Invalid authentication');
            }
            authorizeUpload(obfuscateUserId(userInfo.id), filename, contentType, context);
        });
    });
    req.on('error', context.fail);
    req.end();
};
