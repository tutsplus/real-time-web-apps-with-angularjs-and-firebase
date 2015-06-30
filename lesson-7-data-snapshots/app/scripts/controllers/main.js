/*global Firebase*/
'use strict';

angular.module('firebaseApp')
  .controller('MainCtrl', function ($scope, $timeout) {
    var rootRef = new Firebase('https://brilliant-fire-2753.firebaseio.com/');
    var childRef = rootRef.child('message');

    childRef.on('value', function(snapshot) {
      $timeout(function() {
        snapshot.forEach(function(item) {
          console.log(item.name() + ' - ' + item.val());
          console.log(item.ref());
        });
        var snapshotVal = snapshot.val();
        $scope.message = snapshotVal;
      });
    });

    $scope.$watch('message.text', function(newVal) {
      if (!newVal) {
        return;
      }
      childRef.update({
        text: newVal
      });
    });

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
