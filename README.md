<h2 >A simplified curiouscat.me clone built with Vue and Node</h2>

<p>
  <a href="http://www.askprivy.com/">Visit the live site</a> |
  <a href="https://github.com/slhozdemir/askprivy-backend">View API</a>
</p>

## Preview

<div align="center">
  <img src="./screenshots/preview.gif" alt="Preview" width = "600" >
</div>

## Description
A social media platform where users can interact with each other. Can follow each other and ask questions anonymously or with their own username etc.

<small> **Note:** It was made for educational purposes only.</small>

## Main technologies and libraries

+ Frontend
    + Vuejs
    + [Ant-Vue](https://www.antdv.com/)
    + Axios
+ Backend
    * Nodejs
    * MongoDb
    * Express

## Installation

To clone and run this repository you'll need [backend api](https://github.com/slhozdemir/askprivy-backend) cloned on your computer. From your command line:

```bash
# Firstly clone node backend repository
git clone https://github.com/slhozdemir/askprivy-backend.git
# Go into the repository
cd askprivy-backend
# Install dependencies
npm install
# Run the app
npm start
```
then
```bash
# Clone this repository
git clone https://github.com/slhozdemir/askprivy-frontend.git
# Go into the repository
cd askprivy-frontend
# Install dependencies
npm install
# Run the app
npm run serve
```
<small>Notice that your requests are thrown to the correct local api address and cors address in `app.js` should be edited.</small>

## FAQ
1. **What is this site?**

This is a clone of the site [Curiouscar.me](https://curiouscat.me).

2. **Why would you make a clone of this site?**

I was wondering what kind of problems I would encounter while realizing a real life project and of course to increase my javascript skills.

## Screenshots and About Site

  <h4 align="center">Auth Page</h4>
  <p align="center">
    <img src="./screenshots/auth.gif" width="300">
  </p>
  Taken as a reference <a href="https://www.codepen.io/tomma5o/pen/NrbKXy/">code</a>
  <hr>


  <h4 align="center">Home Page</h4>
  <p align="center">
    <img align="top" src="./screenshots/desktop/home.PNG" alt="Home Page Desktop" width="500" style="margin-right: 10px; margin-bottom: 10px">
    <img src="./screenshots/mobile/home.png" alt="Home Page Mobile" width = "200">
  </p>
  <p align="center">You can see the posts of the people you follow.</p>
  <hr>

  <h4 align="center">Discover Page</h4>
  <p align="center">
    <img align="top" src="./screenshots/desktop/discover.PNG" alt="Discover Page Desktop" width="500" style="margin-right: 10px; margin-bottom: 10px">
    <img src="./screenshots/mobile/discover.png" alt="Discover Page Mobile" width = "200" >
  </p>
  <p align="center">You can search and see randomly answered questions.</p>
  <hr>

  <h4 align="center">Profile Page</h4>
  <p align="center">
    <img align="top" src="./screenshots/desktop/profile.png" alt="Profile Page Desktop" width="500" style="margin-right: 10px; margin-bottom: 10px">
    <img src="./screenshots/mobile/profile.png" alt="Profile Page Mobile" width = "200" >
  </p>
  <p align="center">You can change the own profile picture (only in your profile). It can see the followers and followings of the profile owner. You can also access all the questions it have answered.</p>
  <hr>

  <h4 align="center">Inbox Page</h4>
  <p align="center">
    <img align="top" src="./screenshots/desktop/inbox.PNG" alt="Inbox Page Desktop" width="500" style="margin-right: 10px; margin-bottom: 10px;">
    <img src="./screenshots/mobile/inbox.png" alt="Inbox Page Mobile" width = "200" >
  </p>
  <p align="center">You can see the questions asked to you and you can answer those questions.</p>
  <hr>

  <h4 align="center">Notification Page</h4>
  <P align="center">
    <img align="top" src="./screenshots/desktop/notification.PNG" alt="Notification Page Desktop" width="500" style="margin-right: 10px; margin-bottom: 10px">
    <img src="./screenshots/mobile/notification.png" alt="Notification Page Mobile" width = "200" >
  </P>
  <p align="center">You can see what notifications you receive. Occurs when someone follows you or answers your questions.</p>
  <hr>

  <h4 align="center">Who To Follow Component</h4>
  <p align="center">
    <img src="./screenshots/WhoToFollow.gif" alt="Who To Follow Component" width="300">
  </p>
  <p align="center">Three random users from people you don't follow.</p>
  <hr>

## Connect with me

- [Github](https://github.com/slhozdemir)
- [LinkedIn](https://www.linkedin.com/in/salihozdemr)
- Mail : salihozdemir94@gmail.com 
