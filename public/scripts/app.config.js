angular.module('myApp').config(function($routeProvider,$locationProvider){
    $routeProvider.when('/home', {  //browser
        templateUrl:'views/home.html'  //file
    }).when('/login', {
        templateUrl:'views/login.html',
        controller: 'LoginController as login'
    }).when('/register', {
        templateUrl:'views/register.html',
        controller: 'RegisterController as register'
    }).when('/add', {
        templateUrl:'views/add.html',
        controller:'ProductController as product'
    }).when('/calendar', {
        templateUrl:'views/calendar.html'
    }).when('/receipt', {
        templateUrl:'views/receipt.html'
    }).when('/inventory', {
        templateUrl:'views/inventory.html',
        controller:'ProductController as product'
    }).when('/favorites', {
        templateUrl:'views/favorites.html'
    }).when('/recipes', {
        templateUrl:'views/recipes.html'
    }).otherwise({
    templateUrl: 'views/login.html',
    controller: 'LoginController as login'
  });
    //let us use normal looking links.Remember to use base tag in html to use this.
    $locationProvider.html5Mode(true);

});
