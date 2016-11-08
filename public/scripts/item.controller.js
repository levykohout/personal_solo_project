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
     add.category = '';
     add.skuNum = '';
     add.productName = '';
     add.quantity = '';
     add.dateBought = '';
     add.expirationDate = '';
    //  add.addItemForm.$setPristine();//clears form
    //  add.addItemForm.$setUntouched();
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
          add.checkExpirationDate();
       }, function(error) {
        console.log('error getting items', error);
       });

  };
  add.getItems();


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





  add.checkExpirationDate=function(){

      console.log('inside checkExpirationDate');

      console.log(add.itemsArray);
        add.expirationStatus = false;
              var i=0;
      angular.forEach(add.itemsArray,function(values){

              var expirationDate = new Date(values.expiration_date);


              var beforeExpiration = moment(expirationDate).clone().subtract(3, 'days').format();

                var today = new Date;
                beforeExpiration = new Date(beforeExpiration);
                var newToday = moment(today).startOf('day');

                console.log('Is the item expiring today?', beforeExpiration.getTime() == newToday._d.getTime());

              if(beforeExpiration.getTime() == newToday._d.getTime()){
                  console.log('Item is expiring in 3 days, notification email sent out!');
                  add.sendMail();
                  add.itemsArray[i].expirationStatus = 'expiring';
                  console.log(add.itemsArray[i]);
                  i++;
                //   add.expirationStatus=true;
              } else if(beforeExpiration.getTime() <= newToday._d.getTime()) {
                 add.itemsArray[i].expirationStatus = 'expired';
                  console.log('Item is past expiration expired');
                  i++;
              } else{
                   add.itemsArray[i].expirationStatus = 'not expired';
                   console.log('Item is not expiring yet');
                   i++;
              }


          });
  console.log(add.itemsArray);
  };


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


}
