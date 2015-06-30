/*global Firebase*/
'use strict';

angular.module('firebaseApp')
  .controller('MainCtrl', function ($scope, $timeout) {
    var rootRef = new Firebase('https://brilliant-fire-2753.firebaseio.com/');
    var messagesRef = rootRef.child('messages');

    $scope.currentUser = null;
    $scope.currentText = null;
    $scope.messages = [];

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

    messagesRef.on('child_changed', function(snapshot) {
      $timeout(function() {
        var snapshotVal = snapshot.val();
        var message = findMessageByName(snapshot.name());
        message.text = snapshotVal.text;
      });
    });

    messagesRef.on('child_removed', function(snapshot) {
      $timeout(function() {
        deleteMessageByName(snapshot.name());
      });
    });

    function deleteMessageByName(name) {
      for(var i=0; i < $scope.messages.length; i++) {
        var currentMessage = $scope.messages[i];
        if (currentMessage.name === name) {
          delete $scope.messages[i];
          break;
        }
      }
    }

    function findMessageByName(name) {
      var messageFound = null;
      for(var i=0; i < $scope.messages.length; i++) {
        var currentMessage = $scope.messages[i];
        if (currentMessage.name === name) {
          messageFound = currentMessage;
          break;
        }
      }

      return messageFound;
    }

    $scope.sendMessage = function() {
      var newMessage = {
        user: $scope.currentUser,
        text: $scope.currentText
      };

      messagesRef.push(newMessage);
    };

  });
