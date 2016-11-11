angular.module('myApp')
.controller('RecipeController', RecipeController);

function RecipeController($http , $scope, ProductService ) {
  console.log('RecipeController loaded');


  var recipe = this;
  recipe.itemsArray=[];
  recipe.keywords='';

  recipe.getItems = function(){
      console.log('Getting items');
     ProductService.getItems().then(function(response){
          console.log(response);
          recipe.itemsArray = response.data;
          console.log(recipe.itemsArray);
          recipe.checkExpirationDate();
          recipe.getRecipes();
       }, function(error) {
        console.log('error getting items', error);
       });

  }; //End of getItems function
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
            var newToday = moment(today).startOf('day');

            console.log('This is the new today format', newToday._d);
            console.log('This is the before expiration date are they equal', beforeExpiration);

              if(beforeExpiration.getTime() == newToday._d.getTime()){
                  console.log('Item is expiring in 3 days, suggested recipes here!');
                  recipe.keywords=values.product_name;
                  console.log('recipe keywords',recipe.keywords);
                  recipe.getRecipes();

              } else {
                  console.log('Item is not expired');
              }
          });

  };//End of checkExpirationDate function



  recipe.recipeArray = [];

  recipe.getRecipes = function(){
      console.log('Getting recipes!');

      var q = recipe.keywords;

      console.log(q);

     ProductService.getRecipes(q).then(function(response){
          console.log(response);
          recipe.recipeArray = response.data.hits;
          console.log(recipe.recipeArray);

       }, function(error) {
        console.log('error getting items', error);
       });

  };//End of getRecipes function


  recipe.addToFavorites=function(recipeName, imageUrl, recipeUrl){

      var data = {
          recipeName : recipeName,
          imageUrl : imageUrl,
          recipeUrl : recipeUrl
      };
      console.log(data);
      ProductService.addToFavorites(data).then(function(response){
          console.log(response);
      });
  };//End of addToFavorites function

  recipe.data ={};

  recipe.addToCalendar = function(startTime, endTime, eventName){
      console.log('inside add to calendar', startTime, endTime, eventName);

      var data = {
          startTime:startTime,
          endTime: endTime,
          eventName:eventName
      };
      recipe.data = data;

      ProductService.addToCalendar (data).then(function(response){
          console.log(response);
      });

  }; //End of addTo Calendar function



  }//End of Controller Function
