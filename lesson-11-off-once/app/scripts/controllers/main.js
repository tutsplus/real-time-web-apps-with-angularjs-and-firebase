/*global Firebase*/
'use strict';

angular.module('firebaseApp')
  .controller('MainCtrl', function ($scope, $timeout) {
    var rootRef = new Firebase('https://brilliant-fire-2753.firebaseio.com/');
    var messagesRef = rootRef.child('messages');
    var titleRef = rootRef.child('title');

    $scope.title = null;
    $scope.currentUser = null;
    $scope.currentText = null;
    $scope.messages = [];

    titleRef.once('value', function(snapshot) {
      $scope.title = snapshot.val();
    });

    messagesRef.on('child_added', function(snapshot) {
      $timeout(function() {
        var snapshotVal = snapshot.val();
        //console.log(snapshotVal);
        $scope.messages.push({
          text: snapshotVal.text,
          user: snapshotVal.user,
          name: snapshot.name()
        });
      });
    });

    $scope.sendMessage = function() {
      var newMessage = {
        user: $scope.currentUser,
        text: $scope.currentText
      };

      messagesRef.push(newMessage);
    };

    $scope.turnFeedOff = function() {
      messagesRef.off();
    };

  });
