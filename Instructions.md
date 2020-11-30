# Swappler Mobile application modules

## Components

- This folder contains all of the modules for Swappler mobile application.

##### 1upAddNewItem

- This is the Add new item module, the folder contains the controller, the service and the HTML page for uploading new items to the Firebase database.

##### 1upCards

- This is the Card module, the folder contains the controller, the service, and the HTML page for the discovery page and everything that has to do with the swiping cards.

##### 1upChat

- This is the Chat module, the folder contains the Chatroom and Chatlist services, controllers and HTML pages for both the LIST and the ROOMS.

##### 1upFilter

- This is the filter module, the folder contains the controller, service and HTML page that handles all filter settings and is connected with the Discovery page / Card page.

##### 1upGeoFire

- This is the geolocation module, it contains only a service file, this module is connected with the user profile , the card page and filter page.

##### 1upMenu

- This is the main menu module, this folder contains the controller and HTML page. This module is connected with the MyProfile page, it is also a main hub to the settings , chat, wishlist and MyProfile.

##### 1upMyProfile

- This is the MyProfile module, and is a heavy module, it contains a factory, html page and many controllers, the controllers 
are for Wishlist, Wishlist details , Productdetails , people details, transaction history and followers, all these sub modules contain a controller , HTML page and all use the factory of MyProfile.

##### 1upNotifications

- This is the notification module, it contains a controller and a HTML page, it handles all the In app notifications in the Activity feed page.

##### 1upProfile

- This is the Profile module, it contains a controller and a HTML page, this module handles updating user profiles.

##### 1upSearch

- This is the Search module, it contains a controller and a HTML page, currently this module is not 100% complete, this module only contains the people to follow, this module will be expanded and made into a heavy module, it will be equal in size as MyProfile except for items and premium users.

##### 1upSettings

- This is the settings module, it contains a controller and a HTML Page, this handles the users settings for the notifications and push notifications, anything changed here will either disable or enable push / in app notifications to the user

##### 1upTour

- This is the tour module, it contains a controller and a HTML page, this is for the take a tour part of the swappler app and is the smallest and has no dependencies.

##### Authentication

- This is the authentication module, it contains a authentication method, a controller, factory and a HTML page, this is the 2nd most important module after the main factory, this will handle the authentication of the users, check firebase if the user exist, register the user data into firebase and store user tokens for push notification.

##### Common

- This is the common module, this is shared among all other modules and is the most important module, it contains the main factory which is the firebase URL and is shared among all other modules, this module contains 1 factory and 3 services. Item service contains all of the item data that is being sent to and retrieved from Firebase, the ExpiredItem service is not being used, but it will check the current timestamp of items compared to current timestamp, if the item is older thant X days it will move the item into a expiredItem node in firebase and delete it after 30days.

##### Navigation

- This is the navigation Module, it contains all of the footers in the Swappler application, a controller, a service and a directive to handle all the buttons the footer contains.

##### Notifications

- This is the notification module, it contains a service, this is where all the notifications are created, it will pick premade messages from firebase MsgBody and create a notification depending on the event that calls for a notification to be created.

##### Userdata

- This is the Userdata module, the 3rd most important module, it contains a service for the registration data of users, once a user has been authenticated this is the data that will be stored and retrieved from Facebook to be stored in the users profile, any changes here can effect the users profile to become corrupt so do not make modifications to this service.

##### Styles

- This is the styles folder, it is not a direct module but it contains all the custom CSS and LESS files for each page created, any styles that require to be changed can be made here in the corresponding page, they are all named according to the page they will style.

## Main Factory
The Swappler application has been created into modules, these modules are all dependant on 1 file, the MainFactory, this contains the Firebase URL that is shared with all the modules, if you want to change from production to test or vice versa remmeber to change from Main Factory the URL String!

Test environment| Production environment
----------------|-----------------------
https://swappler.firebaseio.com/ | https://swapllerdummy.firebaseio.com/

 **The main factory is located in** www/components/common/1upCommon.factory.js


# Firebase

Firebase has a new Schema, so after any wipes or changes to the database or moving to a new host or anything few things have to be checked.
Please check that the structure of the database is accurate.

Firebase structure is automatically created except for MsgBody thread, this has to be manually inserted into the database or use a SwapplerDB clone that has the msgbody already.


### User in firebase
Users  
facebookuserid -Users facebookID
*  about: -About message, the user can add a description about himself
*  address: - User cab add his address, currently not being used in swappler app
*  blog: - URL to users blog, user can add this by himself in the update profile
*  facebook: - Facebook URL
*  followers: - Users who are following, current user
*  following: - Users whom the user is currently following
*  imageUrl: - Facebook profile picture URL string
*  instagram: - Instagram URL of the user, can be added in the Update profile section
*  items: - Items the user is currently selling
*  mycurrentdevice: - Current device ID that the user is logged onto, not used currently
*  mycurrentlocation: - Users current location, not being used currently
*  name: - The users name, retrieved from Facebook
*  notificationSettings - The settings the user has added for himself for notifications and push notifications in the apps settings page.
*  pinterest: - Users pinterest URL, currently not being used
*  premium: - Is the user premium True or false, if the user is true new premium features are unlocked in the mobile application
*  provider: - Whom is the provider of the user details , currently Facebook
*  settings - Users filter settings
   *  distance: - Distance 0 -> 450km radiums
   *  mainCategory: - Is the user looking for secondhand or designer goods
   *  maxSize: - The max size of the clothing
   *  maxprice: - The maximum price range
   *  maxshoe: - Maximum shoe range
   *  minprice: - the minimum price range for the slider settings in filter page
   *  minshoe: - Minimum shoe range
   *  price: - Minimum price range
   *  searchCategory:  - What is the  category the user is looking for, MainCategory is All , Shirt , Pants ..etc
   *  size: - This is the size of clothing with letters , such as M L XXS ..etc
*  status:  - This is the title set for this user, default is Regular
*  thumbsdown: - How many positive likes the user has gotten from transactions
*  thumbsup:  - How many negative likes the user has gotten from transactions
*  title: - the current title being used for the user, fashion, designer, retailer ..etc
*  tokenID: - The users current tokenID for mobile devices and push notification, currently not being saved in Firebase
*  twitter: - Users twitter URL

### Items in firebase


Items 
*  cost - how much the item costs
*  category - is it pants , shoes , accessories 
*  createdAt: - When the item has been created, this uses UTC timestamp format.
*  desc:  - Description of the item
*  imageURL: - The image URL string 
*  location - Current location data is stored here
   *  lat: - latitude
   *  long: - longitude
*  meetingPlace: - Where the user wants to meet
*  name: - Name of the item
*  postagePrice: - The amount for postage 
*  sellingMethod: - Cash on delivery , Cash only , or both
*  size: - Size of the item 
*  subCategory: - Is it second hand or designer
*  submitedby: - Who posted the item




### Message body
The message body is used by the client to assign in app notifications for certain events. The notifications work in the app and with the push notification service. 
>> example case: Userid + Messagebody-01-02 + chatroomName = "Kenneth Forsman You were kicked from Fancy purple dress."

MsgBody has to be manually added to firebase, there is no client side module currently that generates this content to firebase, it has to exist for pushnotifications and in app notifications to work.


MsgBody  
1. chats
 *  01:"You were kicked from"
 *  02: "has started a chat  with you."
 *  03: "You have a new message in chatroom "
 *  kick: "babaaaaa"
1. items
 * 01: "has been sold."
 * 02: "You are first in the queue for "
 *  03: "has purchased your item"
 *  04: "has been removed "
 *  05: "You have bought an item "
1. misc
 *  01: "has been reported."
 *  02: "You have been reported for"
 *  03: "Your account has been suspended."
 *  04: "Your premium has expired."
 *  05: "Your account is now premium."
1. users
 *  01: "has followed you."
 *  02: "has added a new item for sale."
 *  03: "You have received a positive rating."
 *  04: "You have received a negative rating."
 *  05: "has unfollowed you."


