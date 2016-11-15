angular.module('myApp').factory('AuthFactory', function ($http) {
  var Status = {
    loggedIn: false,
  };

  // the public API
  return {
    Status: Status,

    checkLoggedIn: function () {
      return Status.loggedIn;
    },

    isLoggedIn: function () {
      return $http.get('/auth');
    },

    logIn: function () {
      return $http.get('/auth/google');

    },

    setLoggedIn: function (value) {
      Status.loggedIn = value;
    },

    logout: function () {
      return $http.get('/auth/logout');
    },
  };

});
