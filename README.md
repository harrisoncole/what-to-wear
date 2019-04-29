##What To Wear is a Progressive Web App that provides the user with suggested attire based on the current forecast.

##Required API Keys:
Google Geolocation API
Dark Sky API

##This project uses node.js and npm. Please run npm install to download the required dependencies:
react
dark-sky-api
express
(among several others)

In the future I plan to implement a more robust back-end that tracks clothing in a user's wardrobe and makes specific suggestions based on the contents of the database.

On the front-end, the app is rendered from the index.js in the client folder. The service worker is registered int he app.js file. All other react components are located in the components folder.

On the back-end, both API calls are made from server/api/weather.js.

![home screen](/Home.PNG?raw=true 'home screen')
![hourly view](/Hourly.PNG?raw=true 'hourly view')
![user options](/User.PNG?raw=true 'user options')
