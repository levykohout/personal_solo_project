angular.module('myApp')
.controller('AddProductController', AddProductController);

function AddProductController($http) {
  console.log('AddProductController loaded');

  var add = this;
  add.itemsArray=[];

  add.newItemAdd = function(category, sku, name, quantity, buyDate, expirationDate) {
    console.log('Adding new item');
    console.log(category, sku, name, quantity, buyDate, expirationDate);
    $http.post('/items', {
        category: category,
        sku:sku,
        name:name,
        quantity:quantity,
        buyDate:buyDate,
        expirationDate:expirationDate
    }).then(function(response){
     add.getItems();
     }, function(error) {
      console.log('error adding items', error);
     });
  };

  add.getItems = function(){
      console.log('Getting items');
      $http.get('/items').then(function(response){
          console.log(response);
          add.itemsArray = response;
       }, function(error) {
        console.log('error getting items', error);
       });

  }

}
