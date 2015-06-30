/*global Firebase*/
(function(angular) {
  'use strict';

  angular.module('firebaseApp').service('MessageService', function(FBURL) {
    var messageRef = new Firebase(FBURL).child('messages');
    return {
      childAdded: function childAdded(limitNumber, cb) {
        messageRef.limit(limitNumber).on('child_added', function(snapshot) {
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
      }
    };
  });

})(window.angular);
