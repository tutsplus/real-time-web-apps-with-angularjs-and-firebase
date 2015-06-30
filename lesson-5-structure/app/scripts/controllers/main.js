/*global Firebase*/
'use strict';

angular.module('firebaseApp')
  .controller('MainCtrl', function ($scope) {
    var rootRef = new Firebase('https://brilliant-fire-2753.firebaseio.com/');
    var childRef = rootRef.child('message');

    // https://brilliant-fire-2753.firebaseio.com/message
    $scope.setMessage = function() {
      childRef.set({
        user: 'Bob',
        text: 'Hi'
      });
    };

    $scope.updateMessage = function() {
      childRef.update({
        lastname: 'Smith'
      });
    };

    $scope.deleteMessage = function() {
      childRef.remove();
    };

  });
