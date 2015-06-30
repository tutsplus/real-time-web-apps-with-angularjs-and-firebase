/*global Firebase*/
(function(angular) {
  'use strict';

  angular.module('firebaseApp')
    .controller('RegisterCtrl', function($scope, $firebaseSimpleLogin, FBURL, $window) {
      var fbRef = new Firebase(FBURL);
      $scope.errors = [];
      $scope.simpleLogin = $firebaseSimpleLogin(fbRef);
      $scope.registerUser = {
        email: '',
        password: '',
        confirmPassword: ''
      };

      $scope.register = function() {
        var errors = [],
            user = $scope.registerUser;
        if (user.email === '') {
          errors.push('Please enter an email');
        }
        if (user.password === '') {
          errors.push('Password must not be blank');
        }
        else if (user.password !== user.confirmPassword) {
          errors.push('Passwords must match');
        }

        if (errors.length > 0) {
          $scope.errors = errors;
          return;
        }

        var promise = $scope.simpleLogin
          .$createUser(user.email, user.password);

        promise.then(function(user) {
          console.log(user);
          $window.location.href = '/#/home';
        }, function(error) {
          console.error(error);
        });

      };

    });

}(window.angular));
