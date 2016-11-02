angular.module('myApp')
.controller('RecipeController', RecipeController);

function RecipeController($http) {
  console.log('RecipeController loaded');


  var recipe = this;

  recipe.recipeArray = [];

  recipe.getRecipes = function(){
      console.log('Getting recipes!');

      var Url = 'https://api.edamam.com/search?q=';
      var your_app_key = '&app_key=6d84ea800f46d8ee5c73a0ec0e7bb354';
      var your_app_ID = '&app_id=84c4df48';

      var limit = '&to=20';
      var q = 'chicken';

      var request = Url + q + limit + your_app_ID + your_app_key + '&callback=JSON_CALLBACK';

      $http.jsonp(request).then(function(response){
          console.log(response);
          recipe.recipeArray = response.data.hits;
          console.log(recipe.recipeArray);
       }, function(error) {
        console.log('error getting items', error);
       });

  };

  recipe.getRecipes();

  }
