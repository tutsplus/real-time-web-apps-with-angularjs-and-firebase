/*global Firebase*/
'use strict';

angular.module('firebaseApp')
  .controller('MainCtrl', function (MSGURL) {

  new Firebase(MSGURL).set({ hello: 'world' }, function(error) {
      console.log(error);
  });

  new Firebase(MSGURL).on('child_added', function(data) { }, function(error) {
      console.log(error);
  });

});
