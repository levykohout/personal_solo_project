angular.module('myApp')
    .controller('LoginController', LoginController);

function LoginController(AuthFactory, $location) {
    var login = this;
    var authFactory = AuthFactory;
    login.loggedIn = authFactory.isLoggedIn();
    login.logIn=authFactory.logIn().then(function(response){
    }, function(error){
      $location.path('/login');
      login.loggedIn = authFactory.isLoggedIn();
    });


}
