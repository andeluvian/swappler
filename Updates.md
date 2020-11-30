# Description
### version 1.0
Added components folder, this folder contains all modules for Swappler mobile application.All modules are named for page specific purposes.

> Example: 1upAddNewItems contains the html file, the services that page requires and controller to handle all the functions to push itemdata to firebase.

Each task has its own controller, service or factory. This is to spread the application thin and increase performance. Creating separate modules makes to add new features by creating a new module for that feature.
Styles folder contains all the styles, they are page specific, any styles that require to be changed in that page can be found within that pages stylesheet. There are some exceptions, some styles are shared and will be moved to Common subfolder.

## Changes made:

* Removed all hardcoded styles and added them to separate css files.
* Removed all previous application logic that was created in Swappler prototype.
* Removed all previous code dependencies from html files.
* Added Modules for each page.
* Added 1upCommon.factory.js to handle firebaseURL references.
* Added New geolocation service 1upGeoFire.services.js this service handles the GPS data from the mobile device to firebase.
* Added In application notification service, will be tied to the push notification service once that is enabled. This service  handles notifications from followers, sold items ,new chats and other notifications that happen in the app.
* Added Chat controller to handle the chat feature between two users, kicking , selling and inviting new users.
* Added 1upMyProfile all files handle user profile data, how its retrieved from firebase and how it is displayed
* Added angular-ios9-uiwebview-patch.js to fix issues with IOS9
* Added Stylesheets for individual pages
* Added Common folder in styles will be used to split shared and page specific styles.
* Added Alerts to the GPS to indicate the user that the GPS is turned off.

### Added New Firebase schema
  - MsgBody contains predefined notification message bodies for the in-app notification feature.
  - Chatroom contains the chat information , current buyer , seller, and message history
  - ItemQueue contains the user queue position information. This is for "you are X in queue for this item" modal  within the mobile application.
  - Item  contains concated itemdata, this will allow for multiple chocie queries to be created.
  - Notification contains all notification messages for each user.
  - Solditems contains all sold/bought items for each user.
  - User schema contains all user specific data.
  - Queue Will be added later, is currently used by Nilesh for push notification messages.
  - Disabled telephonenumber detection on IOS devices


###TODO
  - Polish the styles and remove redundancy
  - Create Animation directive to handle smooth native animations
  - Add push notification service
  - Add payment system
  - Flatten heavy controllers by creating more services

###BUGS
  - Bugs with radio buttons on IOS9 needs to be fixed
  - Styles need to be optimized for IOS



# Folder structure:

* \index.html 
* \js
* \js\angular-ios9-uiwebview-patch.js
* \js\anim.js
* \js\app.js
* \js\controllers.js
* \js\directives.js
* \js\services.js

### \components\

 	\components\1upAddNewItem
 		\components\1upAddNewItem\1upAddNew.controller.js
	 	\components\1upAddNewItem\1upAddNew.html
 		\components\1upAddNewItem\1upAddNew.service.js

 	\components\1upCards
 		\components\1upCards\1upCards.controller.js
 		\components\1upCards\1upCards.html
 		\components\1upCards\1upCards.js
 		\components\1upCards\1upCards.services.js
 		\components\1upCards\backUp.1upCard.controller.js

 	\components\1upChat
 		\components\1upChat\1upChatList
 		\components\1upChat\1upChatRoom
 		\components\1upChat\1upChatList\1upChatList.controllers.js
 		\components\1upChat\1upChatList\1upChatList.html
 		\components\1upChat\1upChatList\1upChatList.services.js
 		\components\1upChat\1upChatRoom\1upChatRoom.controller.js
 		\components\1upChat\1upChatRoom\1upChatRoom.html
 		\components\1upChat\1upChatRoom\1upChatRoom.services.js

 	\components\1upFilter
 		\components\1upFilter\1upFilter.controller.js
 		\components\1upFilter\1upFilter.services.js
		\components\1upFilter\1upFilters.html

 	\components\1upGeoFire
 		\components\1upGeoFire\1upGeoFire.services.js

 	\components\1upMenu
 		\components\1upMenu\1upMainMenu.controllers.js
 		\components\1upMenu\1upMainMenu.html

 	\components\1upMyProfile
 		\components\1upMyProfile\1UpMyProfile.controller.js
 		\components\1upMyProfile\1UpMyProfile.factory.js
 		\components\1upMyProfile\1UpMyProfile.html
 		\components\1upMyProfile\1UpMyWantedList.html
 		\components\1upMyProfile\1UpMyWantedListDetail.html
 		\components\1upMyProfile\1UpPeopleDetail.html
 		\components\1upMyProfile\1UpProductDetail.html
 		\components\1upMyProfile\1upMyWantedList\1upWanted.controller.js
			
			\components\1upMyProfile\1upMyWantedList
				\components\1upMyProfile\1upMyWantedList\1upWanted.services.js
				\components\1upMyProfile\1upMyWantedList\1upWantedDetail.controller.js
	
			\components\1upMyProfile\1UpPeopleDetail
				\components\1upMyProfile\1UpPeopleDetail\1UpPeopleDetail.controller.js

	 		\components\1upMyProfile\1UpProductDetail
 				\components\1upMyProfile\1UpProductDetail\1UpProductDetail.controller.js

	 		\components\1upMyProfile\1upTransactionHistory
 				\components\1upMyProfile\1upTransactionHistory\1upTransactionHistory.controllers.js
				\components\1upMyProfile\1upTransactionHistory\1upTransactionHistory.css
				\components\1upMyProfile\1upTransactionHistory\1upTransactionHistory.html

 	\components\1upNotifications
 		\components\1upNotifications\.DS_Store
 		\components\1upNotifications\1upNotifications.controllers.js
 		\components\1upNotifications\1upNotifications.html

 	\components\1upProfile
 		\components\1upProfile\1upUpdateProfile.controller.js
 		\components\1upProfile\1upUpdateProfile.html
 
 	\components\1upSearch
 		\components\1upSearch\1upPeopleToFollow.controllers.js
 		\components\1upSearch\1upPeopleToFollow.html
 
 	\components\1upSettings
 		\components\1upSettings\1upSettings.controllers.js
 		\components\1upSettings\1upSettings.html

 	\components\1upTour
 		\components\1upTour\1upTour.controllers.js
		\components\1upTour\1upTour.html

 	\components\Authentication
 		\components\Authentication\.DS_Store
 		\components\Authentication\1upAuthentication.controller.js
 		\components\Authentication\1upAuthentication.js
 		\components\Authentication\1upAuthentication.services.js
 		\components\Authentication\1upLogin.html
 		\components\Authentication\1upLogin.scss

 	\components\Common
 		\components\Common\1upCommon.factory.js
 		\components\Common\1upExpireItem.services.js
 		\components\Common\1upItems
 		\components\Common\1upTimeStamp
 		\components\Common\1upItems\1upItems.js
 		\components\Common\1upItems\1upItems.services.js
 		\components\Common\1upTimeStamp\1upTimeStamp.services.js

	 \components\Navigation
		\components\Navigation\1upBackFooter.html
		\components\Navigation\1upCardFooter.html
		\components\Navigation\1upCloseFooter.html
		\components\Navigation\1upFooter.html
		\components\Navigation\1upFooter.scss
		\components\Navigation\1upNavigation.controller.js
		\components\Navigation\1upNavigation.directive.js
		\components\Navigation\1upNavigation.services.js

	\components\Notifications
		\components\Notifications\1upNotifications.services.js

	\components\Styles
		\components\Styles\1upAddNew.css
		\components\Styles\1upCards.css
		\components\Styles\1upChatList.css
		\components\Styles\1upChatRoom.css
		\components\Styles\1upFilters.css
		\components\Styles\1upFooter.css
		\components\Styles\1upLogin.css
		\components\Styles\1upMainMenu.css
		\components\Styles\1UpMyProfile.css
		\components\Styles\1upMyWantedListDetail.css
		\components\Styles\1upNotifications.css
		\components\Styles\1upPeopleDetail.css
		\components\Styles\1upPeopleToFollow.css
		\components\Styles\1upProductDetail.css
		\components\Styles\1upSettings.css
		\components\Styles\1upUpdateProfile.css
		\components\Styles\1upWantedList.css

			\components\Styles\Common
				\components\Styles\Common\1upAvatars.css
				\components\Styles\Common\1upBackground.css
				\components\Styles\Common\1upDefaults.css
				\components\Styles\Common\1upFonts.css
				\components\Styles\Common\1upItems.css
				\components\Styles\Common\1upPageTitles.css

	\components\Userdata
		\components\Userdata\1upUser.services.js



