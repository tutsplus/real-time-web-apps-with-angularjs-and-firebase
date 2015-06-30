/*global Firebase*/
'use strict';

angular.module('firebaseApp')
  .controller('MainCtrl', function ($scope, FBURL) {

  var fbRef = new Firebase(FBURL).child('secret');

  fbRef.set(3);

});

// Apply these rules to your firebase
// {
//     "rules": {
//       ".read": true,
//       "$messages": {
//         ".read": false,
//         ".write": "auth !== null"
//       },
//       "secret": {
//         ".write": "auth !== null && auth.email === 'david.east@outlook.com'",
//         ".validate": "newData.isNumber()"
//       }
//     }
// }
