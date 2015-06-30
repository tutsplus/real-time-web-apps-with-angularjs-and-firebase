'use strict';

angular.module('firebaseApp')
  .controller('MainCtrl', function ($scope, $timeout, MessageService) {

    $scope.currentUser = null;
    $scope.currentText = null;
    $scope.messages = [];

    MessageService.childAdded(10,function(addedChild) {
      $timeout(function() {
        $scope.messages.push(addedChild);
      });
    });

    $scope.sendMessage = function() {
      var newMessage = {
        user: $scope.currentUser,
        text: $scope.currentText
      };

      MessageService.add(newMessage);
    };

    $scope.turnFeedOff = function() {
      MessageService.off();
    };

    $scope.pageNext = function() {
      var lastItem = $scope.messages[$scope.messages.length - 1];
      MessageService.pageNext(lastItem.name, 10).then(function(messages) {
        $scope.messages = messages;
      });
    };

    $scope.pageBack = function() {
      var firstItem = $scope.messages[0];
      MessageService.pageBack(firstItem.name, 10).then(function(messages) {
        $scope.messages = messages;
      });
    };

  });
