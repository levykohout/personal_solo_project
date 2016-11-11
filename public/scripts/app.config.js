angular.module('myApp').config(function($routeProvider,$locationProvider){
    $routeProvider.when('/home', {  //browser
        templateUrl:'views/home.html',  //file
        controller:'NavController as nav'
    }).when('/login', {
        templateUrl:'views/login.html',
        controller: 'LoginController as auth'
    }).when('/register', {
        templateUrl:'views/register.html',
        controller: 'RegisterController as register'
    }).when('/add', {
        templateUrl:'views/add.html',
        controller:'ProductController as product'
    }).when('/calendar', {
        templateUrl:'views/calendar.html',
        controller:'CalendarController as calendar'
    }).when('/receipt', {
        templateUrl:'views/receipt.html',
        controller : 'ReceiptController as receipt'
    }).when('/inventory', {
        templateUrl:'views/inventory.html',
        controller:'ProductController as product'
    }).when('/favorites', {
        templateUrl:'views/favorites.html',
        controller: 'FavoriteController as favorite'
    }).when('/recipes', {
        templateUrl:'views/recipes.html',
        controller: 'RecipeController as recipe'
    }).when('/camera', {
        templateUrl:'views/camera.html',
        controller: 'cameraController as camera'
    }).otherwise({
    templateUrl: 'views/home.html',
    controller:'NavController as nav'
  });
    //let us use normal looking links.Remember to use base tag in html to use this.
    $locationProvider.html5Mode(true);

});
