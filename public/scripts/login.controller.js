angular.module('myApp')
.controller('LoginController', LoginController);

function LoginController(AuthFactory) {
    var login = this;
      var authFactory = AuthFactory;
      login.loggedIn = authFactory.checkLoggedIn();

}
