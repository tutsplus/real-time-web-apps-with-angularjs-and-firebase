/*global Firebase*/
(function(angular) {
  'use strict';

  angular.module('firebaseApp').service('MessageService', function(MSGURL, $q, $firebase) {
    var messageRef = new Firebase(MSGURL).startAt().limit(10);
    var fireMessage = $firebase(messageRef);
    return {
      childAdded: function childAdded(cb) {
        fireMessage.$on('child_added', function(data) {
          var val = data.snapshot.value;
          cb.call(this, {
            text: val.text,
            name: data.snapshot.name,
            email: val.email
          });
        }, function(err) {
          console.log(err);
        });
      },
      add: function addMessage(message) {
        return fireMessage.$add(message);
      },
      off: function turnMessagesOff() {
        fireMessage.$off();
      },
      pageNext: function pageNext(name, numberOfItems) {
        var deferred = $q.defer();
        var messages = [];
        var pageMessageRef = new Firebase(MSGURL).startAt(null, name).limit(numberOfItems);

        $firebase(pageMessageRef).$on('loaded', function(data) {
          var keys = Object.keys(data);
          angular.forEach(keys, function(key) {
            var item = data[key];
            item.name = key;
            messages.push(item);
          });
          deferred.resolve(messages);
        });

        return deferred.promise;
      },
      pageBack: function pageBack(name, numberOfItems) {
        var deferred = $q.defer();
        var messages = [];
        var pageMessageRef = new Firebase(MSGURL).endAt(null, name).limit(numberOfItems);

        $firebase(pageMessageRef).$on('loaded', function(data) {
          var keys = Object.keys(data);
          angular.forEach(keys, function(key) {
            var item = data[key];
            item.name = key;
            messages.push(item);
          });
          deferred.resolve(messages);
        });

        return deferred.promise;
      }
    };
  });

})(window.angular);
