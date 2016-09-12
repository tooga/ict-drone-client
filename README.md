The ShepherD Client
================

This is the repository for the ShepherD Client, a Node.js web application that is used to monitor the [ShepherD Ground Stations](https://github.com/tooga/ict-drone-groundstation) through the [ShepherD App](https://github.com/anadaniel/shepherd_app).

## How does the ShepherD work?

The final **ShepherD** product is an integration of the App, the Ground Station and the Client. Through the App, Ground Stations are registered along with the coordinates where they will be placed in the area they will help monitor. Once in place, the Ground Stations will be constantly looking for drones that enter the range of their antennas and when they detect a drone they will log this information with the App. The Client is a real-time App that is constantly listening for notifications that the Ground Stations log into the App. When the Client is notified that a new drone has been detected, the user gets an alert and then it can choose to take control of the drone that has been detected, this drone has been already hacked by the Ground Station. If the user decides to take control of the dron, a socket connection is opened between the Client and the Ground Station, the Client will receive the feed of the camera feed on the drone and it will also send commands to drive the drone to an area where is no longer a threat.

## How to install and run the ShepherD Client
```sh
  git@github.com:tooga/ict-drone-client.git # download the repository
  cd ict-drone-client
  npm install # install dependencies
  bower install # install dependencies
  gulp serve # start node server
```
The previous code will have the Client running. The ShepherD App needs to be running already for the Client to work properly.

We assume that your computer already has the configuration needed to run node js applications and thus have **nodejs** and **npm** previously installed. You also will need to install **bower** and **gulp** via npm.
