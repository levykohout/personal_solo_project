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

product.editItem = function(id){
    return $http.get('/private/items/'+id).then(function(response){
        return response;
         });;
}; //End of editItem

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

product.getRecipes = function(keywords){
    var Url = 'https://api.edamam.com/search?q=';
    var your_app_key = '&app_key=6d84ea800f46d8ee5c73a0ec0e7bb354';
    var your_app_ID = '&app_id=84c4df48';
    var limit = '&to=21';
    var q = keywords;
     var request = Url + q + limit + your_app_ID + your_app_key + '&callback=JSON_CALLBACK';

     return $http.jsonp(request).then(function(response){
         return response;
          });

}; //End of getRecipes function

product.addToFavorites = function(data){
return $http.post('/private/favorites', data ).then(function(response){
    return response;
     });

}; //End of addToFavorites function

product.calendarEvents=[];

 product.addToCalendar = function(data){
    return  $http.post('/private/calendar' , data).then(function(response){
        console.log(response);
        product.calendarEvents = response.data;
          return response;
           });
 }; //End of addToCalendar function

product.getCalendarEvents=function(){
    return  $http.get('/private/calendar').then(function(response){
        console.log('inside service response',response);
        return response;
    });
}


}//End of service function
