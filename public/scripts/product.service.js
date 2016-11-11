angular.module('myApp')
.service('ProductService', ProductService);



function ProductService($http) {

    var product = this;

product.newItemAdd = function(data){

return $http.post('/private/items', data);
};//End of newItemAdd function

product.getItems = function (){
 return $http.get('/private/items');
}; //End of getItems function

product.updateItem = function(id, data){
return $http.put('/private/items/'+ id ,data).then(function(response){
    return response;
     });
}; //End of updateItem function

product.deleteItem = function(id){
    return $http.delete('/private/items/'+ id).then(function(response){
        return response;
         });
}; //End of deleteItem function

product.sendMail = function(){

    return  $http.post('/private/mailReminder'
        //  data: objectToSend
    ).then(function(response){
        return response;
         });
}; //End of sendMail function

product.sendText=function(){

    return  $http.post('/private/textReminder'
        //  data: objectToSend
    ).then(function(response){
        return response;
         });
}; //End of sendText function


}//End of service function
