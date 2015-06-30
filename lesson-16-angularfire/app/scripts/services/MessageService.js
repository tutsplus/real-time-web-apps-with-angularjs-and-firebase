/*global Firebase*/
(function(angular) {
  'use strict';

  angular.module('firebaseApp').service('MessageService', function(FBURL, $q, $firebase) {
    var messageRef = new Firebase(FBURL).child('messages');
    var fireMessage = $firebase(messageRef);
    return {
      childAdded: function childAdded(limitNumber, cb) {
        messageRef.startAt().limit(limitNumber).on('child_added', function(snapshot) {
          var val = snapshot.val();
          cb.call(this, {
            user: val.user,
            text: val.text,
            name: snapshot.name()
          });
        });
      },
      add: function addMessage(message) {
        messageRef.push(message);
      },
      off: function turnMessagesOff() {
        messageRef.off();
      },
      pageNext: function pageNext(name, numberOfItems) {
        var deferred = $q.defer();
        var messages = [];

        messageRef.startAt(null, name).limit(numberOfItems).once('value', function(snapshot) {
          snapshot.forEach(function(snapItem) {
            var itemVal = snapItem.val();
            itemVal.name = snapItem.name();
            messages.push(itemVal);
          });
          deferred.resolve(messages);
        });

        return deferred.promise;
      },
      pageBack: function pageBack(name, numberOfItems) {
        var deferred = $q.defer();
        var messages = [];

        messageRef.endAt(null, name).limit(numberOfItems).once('value', function(snapshot) {
          snapshot.forEach(function(snapItem) {
            var itemVal = snapItem.val();
            itemVal.name = snapItem.name();
            messages.push(itemVal);
          });
          deferred.resolve(messages);
        });

        return deferred.promise;
      }
    };
  });

})(window.angular);
