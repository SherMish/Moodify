# Moodify - Advanced Mood Tracker

Moodify is a well organized, user friendly web application designed to help
the users to try and figure out which of their daily activities affect their
mood and overall feeling for the better, or worse.

### Built With

* [Angular](https:angular.io)
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com)
* [Bootstrap](https://getbootstrap.com)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_emea_israel_search_core_brand_atlas_desktop&utm_term=mongodb%20cloud%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624530&gclid=Cj0KCQjwl_SHBhCQARIsAFIFRVVVlDfqyl_5t30ElLdyYdqecMfTO_dO6Vxltgi79jkgfdO0NL7I0ZkaAlymEALw_wcB)

### Screenshots
Home page:
![home-page](https://github.com/SherMish/Moodify/blob/master/client/src/assets/screenshots/main.jpg?raw=true)

Login with non existing username:
![home-page](https://github.com/SherMish/Moodify/blob/master/client/src/assets/screenshots/user%20could%20not%20be%20found.jpg?raw=true)

Login with existing username but wrong password:
![home-page](https://github.com/SherMish/Moodify/blob/master/client/src/assets/screenshots/wrong%20pass.jpg?raw=true)

Filling the registration form with an existing email:
![home-page](https://github.com/SherMish/Moodify/blob/master/client/src/assets/screenshots/existing%20email.jpg?raw=true)

Registration successful (Username & Email not used):
![home-page](https://github.com/SherMish/Moodify/blob/master/client/src/assets/screenshots/new%20account%20alert.jpg?raw=true)

Automatic redirection to the dashboard. Please note that a Logout button has appeared on the right side
of the navbar. This feature was implemented with Angular Obervables. The authentication was implemented 
with Jason Web Tokens(JWT). A welcome message is displayed:
![home-page](https://github.com/SherMish/Moodify/blob/master/client/src/assets/screenshots/greeting%20msg.jpg?raw=true)

After 3 seconds, using an external animation, the form appears:
![home-page](https://github.com/SherMish/Moodify/blob/master/client/src/assets/screenshots/form%201.jpg?raw=true)
![home-page](https://github.com/SherMish/Moodify/blob/master/client/src/assets/screenshots/form%202.jpg?raw=true)
![home-page](https://github.com/SherMish/Moodify/blob/master/client/src/assets/screenshots/form%203.jpg?raw=true)

If we click on "Mood Tracker" button on the top navbar, before submitting a daily form:
![home-page](https://github.com/SherMish/Moodify/blob/master/client/src/assets/screenshots/empty%20mood%20tracker.jpg?raw=true)

Going back to the dashboard. Filling all the fields and submitting a few forms to display them on the mood tracker.
A demonstration of some of the fields being filled;
Wake Up field:
![home-page](https://github.com/SherMish/Moodify/blob/master/client/src/assets/screenshots/form%20demonstration%201.jpg?raw=true)

Productivity field:
![home-page](https://github.com/SherMish/Moodify/blob/master/client/src/assets/screenshots/form%20demonstration%202.jpg?raw=true)

Additional notes field:
![home-page](https://github.com/SherMish/Moodify/blob/master/client/src/assets/screenshots/form%20demonstration%203.jpg?raw=true)

Now lets try to access the Mood Tracker from the top navbar, again:
![home-page](https://github.com/SherMish/Moodify/blob/master/client/src/assets/screenshots/functioning%20mood%20tracker.jpg?raw=true)

Works as expected.

If we leave the web application and return to the home page, note that the user stays logged in thanks to JWT functionality with the help of LocalStorage. Please note: instead of Login and Register buttons, there`s only one button - "Enter The Dashboard":
![home-page](https://github.com/SherMish/Moodify/blob/master/client/src/assets/screenshots/enter%20the%20dashboard.jpg?raw=true)

An updated greeting message is displayed, as the user already submitted the form in the past::
![home-page](https://github.com/SherMish/Moodify/blob/master/client/src/assets/screenshots/greeting%20msg%202%20existing%20entries.jpg?raw=true)

If the users logged out (using the red button), while trying to access the dashboard or the mood tracker, an error is displayed::
![home-page](https://github.com/SherMish/Moodify/blob/master/client/src/assets/screenshots/not%20auth%20to%20be%20here.jpg)




# External resources:
Mux guide: https://tronixstuff.com/2019/10/29/tutorial-using-the-tca9548a-1-to-8-i2c-multiplexer-breakout-with-arduino/
https://www.hackster.io/RoboticaDIY/send-data-from-arduino-to-nodemcu-and-nodemcu-to-arduino-17d47a
https://www.instructables.com/Quick-Start-to-Nodemcu-ESP8266-on-Arduino-IDE/
https://iot-guider.com/esp8266-nodemcu/serial-communication-between-nodemcu-and-arduino/
How to do POST from nodemcu: https://techtutorialsx.com/2016/07/21/esp8266-post-requests/

