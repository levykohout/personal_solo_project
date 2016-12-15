angular.module('myApp')
    .controller('ProductController', ProductController);



function ProductController($route, ProductService) {
    console.log('ProductController loaded');

    var add = this;
    add.itemsArray = [];


    add.getItems = function() {
        console.log('Getting items');
        ProductService.getItems().then(function(response) {
            add.itemsArray.length = 0;
            var i = 0;
            angular.forEach(response.data, function() {
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
        buyDate= new Date(buyDate);
        expirationDate = new Date(expirationDate);

        var data = {
            category: category,
            sku: sku,
            name: name,
            quantity: quantity,
            buyDate: buyDate.toUTCString(),
            expirationDate: expirationDate.toUTCString()
        };
        console.log(data);
        ProductService.newItemAdd(data).then(function(response) {
            console.log(response);
            add.getItems();

            //  clear form
            add.category = '';
            add.skuNum = '';
            add.productName = '';
            add.quantity = '';
            add.dateBought = '';
            add.expirationDate = '';

        }, function(error) {
            console.log('error adding items', error);
        });

    };



    add.editingData = {};
    var i = 0;
    angular.forEach(add.itemsArray, function() {
        add.editingData[add.itemsArray[i].id] = false;
        i++;
    })


    add.updateItem = function(category, sku, name, quantity, buyDate, expirationDate, id) {

        console.log('inside update item');

        var data = {
            category: category,
            sku: sku,
            name: name,
            quantity: quantity,
            buyDate: buyDate,
            expirationDate: expirationDate
        };
        add.editingData[id] = false;
        ProductService.updateItem(id, data).then(function(response) {
            add.getItems();
        }, function(error) {
            console.log('error updating item', error);
        });
    };

    add.deleteItem = function(id) {
        console.log('inside delete item',id);
        ProductService.deleteItem(id).then(function(response) {
            add.getItems();
        }, function(error) {
            console.log('error deleting item', error);
        });
    };


    add.itemToEdit = [];

    add.editItem = function(id) {
        console.log('inside edit item function');
        add.editingData[id] = true;
        ProductService.editItem(id).then(function(response) {
            add.itemToEdit = response.data;

        }, function(error) {
            console.log('error deleting item', error);
        });
    };


    add.checkExpirationDate = function() {

        console.log('inside checkExpirationDate');

        add.expirationStatus = false;
        var i = 0;
        angular.forEach(add.itemsArray, function(values) {

            var expirationDate = values.expiration_date.toLocaleString();
              console.log('expiration date on controller',expirationDate);
            var beforeExpiration = moment(expirationDate).clone().subtract(3, 'days').format();
            console.log(beforeExpiration);
            var today = new Date;
            // console.log('today is', today);
            // beforeExpiration = new Date(beforeExpiration);
            // console.log(beforeExpiration);
            var newToday = moment(today).startOf('day').format();
            console.log(newToday);

            if (beforeExpiration == newToday) {
                //   add.sendText();
                add.itemsArray[i].expirationStatus = 'expiring';
                i++;
            } else if (beforeExpiration<= newToday) {
                add.itemsArray[i].expirationStatus = 'expired';
                i++;
            } else {
                add.itemsArray[i].expirationStatus = 'not expired';
                i++;
            }
        });
    };


    //
    // //twilio text notification
    add.sendText = function() {
        ProductService.sendText().then(function(results) {
            console.log(results);
        });

    }; //End of sendText function


} //End of Controller
