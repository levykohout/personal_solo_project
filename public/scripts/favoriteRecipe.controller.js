angular.module('myApp')
    .controller('FavoriteController', FavoriteController);

function FavoriteController($http) {
    console.log('FavoriteController loaded');

    var favorite = this;
    favorite.favoriteArray = [];

    favorite.getFavorites = function() {

        $http.get('/private/favorites').then(function(response) {
            console.log(response);
            favorite.favoriteArray = response.data;

        });
    };

    favorite.getFavorites(); //run to display favorites

} //End of Controller function
