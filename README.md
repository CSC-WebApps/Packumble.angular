# Angular

## Setup Environment for Angular

### Prerequisites
- Node.js
- npm package manager

### Install Angular CLI
```
npm install -g @angular/cli
```

## Start The Application

```
cd packumble
npm install
ng serve --open
```

The browser should open http://localhost:4200/ at the end. Keep this command running. Any changes made to the code will automatically show up on the browser.

In another terminal tab, start the server:

```
cd server
npm install
npm run start
```

## Debugging

You can use [Angular DevTools](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh) for Chrome. This adds an "Angular" tab to Developer Tools.

## Create an Application from Scratch

```
ng new new-app
```

Helpful tutorial: https://angular.io/tutorial
