# AWS S3 Image Uploads
Kenneth Falck \<kennu@iki.fi\> 2015

## Overview

The system uses four AWS services: API Gateway, Lambda, S3 and CloudFront.
To upload a new image, the client application will 

## API Gateway Setup

API Gateway processes upload API requests and passes them to Lambda.

API URL: https://itdbpkw4ui.execute-api.eu-west-1.amazonaws.com/prod/authorize-upload?querystringargs

Query string arguments:
- access_token: Facebook access token
- content_type: Content type of image to upload (e.g. image/jpeg)
- filename: Filename of image to upload (e.g. image.jpg)

API response example (JSON):

    {
        "filename": "test.jpg",
        "contentType": "image/jpeg",
        "uploadUrlExpires": "2015-10-12T23:35:18.557Z",
        "downloadUrl": "https://dtspdoz56doiv.cloudfront.net/images/56b5f4ac4aa5dfe26df325341df1f3e854e9443e/test.jpg",
        "uploadUrl": "https://swapplerapp.s3-eu-west-1.amazonaws.com/images/56b5f4ac4aa5dfe26df325341df1f3e854e9443e/test.jpg?AWSAccessKeyId=ASIAIP..."
    }

Use the uploadUrl to PUT the image (using the specified content type) and the downloadUrl
to link to the image in the client application.

## Lambda Setup

Lambda processes upload API requests with a Node.js function. It checks
that the Facebook access_token matches a valid User ID and generates
a signed S3 Upload URL that contains a hashed version of the User ID.

The Node.js function is defined in lambda/index.js.

## S3 Setup

S3 stores the uploaded files.

- Bucket name: swapplerapp
- Bucket region: eu-west-1 (Ireland)
- File path: images/\<facebook-uid-hash\>/filename

## CloudFront

CloudFront provides a CDN distribution for downloading the uploaded files.
Its main added value is enabling https (SSL) downloads.

Distribution URL: https://dtspdoz56doiv.cloudfront.net
