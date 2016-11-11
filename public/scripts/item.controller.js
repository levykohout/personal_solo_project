angular.module('myApp')
.controller('ProductController', ProductController);



function ProductController($route, ProductService) {
  console.log('ProductController loaded');

  var add = this;
  add.itemsArray=[];


  add.getItems = function(){
      console.log('Getting items');
      ProductService.getItems().then(function(response){
          add.itemsArray.length=0;
           var i=0;
          angular.forEach(response.data,function(){

               add.itemsArray.push(response.data[i]);
               i++;
          });


          console.log(add.itemsArray);
          add.checkExpirationDate();
       }, function(error) {
        console.log('error getting items', error);
       });

  };
  add.getItems();

  add.refreshPage = function() {
      $route.reload(); //shortcut solution for not displaying added item in DOM
  };

  add.newItemAdd = function(category, sku, name, quantity, buyDate, expirationDate) {
    console.log('Adding new item');
    var data = {
        category: category,
        sku:sku,
        name:name,
        quantity:quantity,
        buyDate:buyDate,
        expirationDate:expirationDate
    };
    console.log(data);
    ProductService.newItemAdd(data).then(function(response){
        console.log(response);
    add.getItems();

    //  clear form
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



add.editingData = {};
var i=0;
angular.forEach(add.itemsArray, function(){
    add.editingData[add.itemsArray[i].id] = false;
    i++;
})


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
 add.editingData[id] = false;
      ProductService.updateItem(id ,data).then(function(response){
        add.getItems();
       }, function(error) {
        console.log('error updating item', error);
       });
    };

 add.deleteItem = function(id){
     console.log(id);
     ProductService.deleteItem(id).then(function(response){
       add.getItems();
      }, function(error) {
       console.log('error deleting item', error);
      });
   };


add.itemToEdit = [];

add.editItem = function(id){
    add.editingData[id] = true;
    console.log('item to be edited is id:', id);

    console.log(add.editingData);

    ProductService.editItem(id).then(function(response){
     add.itemToEdit = response.data;

     console.log(add.itemToEdit);
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
                //   add.sendMail();
                //   add.sendText();
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


  add.sendMail = function(){

      ProductService.sendMail().then(function(results){
     console.log(results);
   });
 }; // end sendMail

//
// //twilio text notification
add.sendText = function(){
    ProductService.sendText().then(function(results){
       console.log(results);
     });

}; //End of sendText function


}
