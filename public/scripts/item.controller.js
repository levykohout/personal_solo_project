angular.module('myApp')
.controller('ProductController', ProductController);



function ProductController($http) {
  console.log('ProductController loaded');

  var add = this;
  add.itemsArray=[];

  add.newItemAdd = function(category, sku, name, quantity, buyDate, expirationDate) {
    console.log('Adding new item');
    console.log(category, sku, name, quantity, buyDate, expirationDate);
    $http.post('/private/items', {
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
      $http.get('/private/items').then(function(response){
          console.log(response);
          add.itemsArray = response.data;
          console.log(add.itemsArray);
       }, function(error) {
        console.log('error getting items', error);
       });

  };

  add.updateItem=function(category, sku, name, quantity, buyDate, expirationDate,id){
      console.log('Updating an item with an id of', id);

      var data = {
          category: category,
          sku:sku,
          name:name,
          quantity:quantity,
          buyDate:buyDate,
          expirationDate:expirationDate
 };
 console.log(data);
      $http.put('/private/items/'+ id,data).then(function(response){
        add.getItems();
       }, function(error) {
        console.log('error updating item', error);
       });
    };

 add.deleteItem = function(id){
     console.log(id);
     $http.delete('/private/items/'+ id).then(function(response){
       add.getItems();
      }, function(error) {
       console.log('error deleting item', error);
      });
   };



  add.getItems();


  //expiration notification
  // add.sendMail = function(recipient, imageURL){

  add.sendMail = function(){

      //go through the database and check look at expiration date


      //if expiration date is 3 days before today, call node mailer

   // var objectToSend = {
   //   recipient: recipient,
   //   imageURL: imageURL
   // };

  $http.post('/private/mailReminder'
    //  data: objectToSend
).then(function(results){
     console.log(results);
   }); // end http call
 }; // end sendMail

 // return {
 //   sendMail: sendMail
 // };



}
