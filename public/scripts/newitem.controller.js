angular.module('myApp')
.controller('AddProductController', AddProductController);

function AddProductController($http) {
  console.log('AddProductController loaded');
  var add = this;

  add.newItemAdd = function(category, sku, name, quantity, buyDate, expirationDate) {
    console.log('Adding new item');
    console.log(category, sku, name, quantity, buyDate, expirationDate);
    // $http.post('/items', {
    //  add.category:
    // }).then(function(){
    //   $location.path('/home');
    // }, function(error) {
    //   console.log('error loggin in', error);
    // });
  };
}
