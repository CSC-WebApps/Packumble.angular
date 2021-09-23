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
ng serve --open
```

The browser should open http://localhost:4200/ at the end. Keep this command running. Any changes made to the code will automatically show up on the browser.

In another terminal tab, start the server:

```
cd server
npm install
node index.js
```

## Debugging

I used [Angular DevTools](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh). This adds an "Angular" tab to Developer Tools.