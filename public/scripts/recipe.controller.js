angular.module('myApp')
.controller('RecipeController', RecipeController);

function RecipeController($http) {
  console.log('RecipeController loaded');


  var recipe = this;
  recipe.itemsArray=[];
  recipe.keywords='';

  recipe.getItems = function(){
      console.log('Getting items');
      $http.get('/private/items').then(function(response){
          console.log(response);
          recipe.itemsArray = response.data;
          console.log(recipe.itemsArray);
          recipe.checkExpirationDate();
          recipe.getRecipes();
       }, function(error) {
        console.log('error getting items', error);
       });

  };
  recipe.getItems();


  recipe.checkExpirationDate=function(){

      console.log('inside checkExpirationDate');

      console.log(recipe.itemsArray);

      angular.forEach(recipe.itemsArray,function(values){

              var expirationDate = new Date(values.expiration_date);

              var beforeExpiration = moment(expirationDate).clone().subtract(3, 'days').format();
               console.log('original expiration date:', expirationDate);
                console.log('3 days prior to expiration date:', beforeExpiration);

            var today = new Date;
            beforeExpiration = new Date(beforeExpiration);

              if(beforeExpiration <= today){
                  console.log('Item is expiring in 3 days, notification email sent out!');
                  recipe.keywords=values.product_name;
                  console.log('recipe keywords',recipe.keywords);
              } else {
                  console.log('Item is not expired');
              }
          });

  };



  recipe.recipeArray = [];

  recipe.getRecipes = function(){
      console.log('Getting recipes!');

      var Url = 'https://api.edamam.com/search?q=';
      var your_app_key = '&app_key=6d84ea800f46d8ee5c73a0ec0e7bb354';
      var your_app_ID = '&app_id=84c4df48';

      var limit = '&to=21';
      var q = recipe.keywords;
      console.log(q);

      var request = Url + q + limit + your_app_ID + your_app_key + '&callback=JSON_CALLBACK';

      $http.jsonp(request).then(function(response){
          console.log(response);
          recipe.recipeArray = response.data.hits;
          console.log(recipe.recipeArray);

       }, function(error) {
        console.log('error getting items', error);
       });

  };


  recipe.addToFavorites=function(recipeName, imageUrl, recipeUrl){

      var data = {
          recipeName : recipeName,
          imageUrl : imageUrl,
          recipeUrl : recipeUrl
      };
      console.log(data);
      $http.post('/private/favorites', data ).then(function(response){
          console.log(response);
      });
  };

  recipe.addToCalendar = function(startTime, endTime, eventName){
      console.log('inside add to calendar', startTime, endTime, eventName);


     
      var data = {
          startTime:startTime,
          endTime: endTime,
          eventName:eventName
      };

      $http.post('/private/calendar' , data).then(function(response){
          console.log(response);
      });

  };


  }//End of Controller Function
