angular.module('myApp')
    .controller('ReceiptController', ReceiptController);

function ReceiptController(Upload, ProductService) {



    var receipt = this;
    var API_KEY = '25f539a74f88957';
    receipt.data = {};

    receipt.uploadFile = function() {
        Upload.upload({
            url: 'https://api.ocr.space/parse/image',
            data: {
                file: receipt.file,
                'apikey': API_KEY
            }
        }).then(function(resp) {
            receipt.data = resp.data.ParsedResults[0].ParsedText;
            console.log(receipt.data);
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ', resp.data);
            receipt.processData();

        }, function(resp) {
            console.log('Error status: ' + resp.status);
        }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    }; //End of uploadFile function

    receipt.processData = function() {
        receipt.skuArray = [];
        receipt.priceArray = [];
        receipt.productNames = [];
        receipt.quantityArray = [];

        var i = 0;

        receipt.dataArray = receipt.data.split('\n');
        console.log(receipt.dataArray);
        //loop through each data in the array and save into new array per information type
        angular.forEach(receipt.dataArray, function(value, i) {
            var data = receipt.dataArray[i];

            if (data.match(/[0-9]{8}/)) {
                receipt.skuArray.push(data);

            } else if (data.match(/(.*[A-Z]){3}/)) {
                receipt.productNames.push({
                    productName: data,
                    quantity: 1,
                    dateBought: new Date(),
                    sku: ''
                });

            } else if (data.match(/^\$[0-9]\.[0-9]{2}/)) {
                receipt.priceArray.push(data);
            } else {
                console.log(data);
                //   var j=0;
                //   var priceAndQuantity = data.split(' ');
                //   console.log(priceAndQuantity);
                //   angular.forEach('priceAndQuantity', function(value , j){
                //       var insideData =priceAndQuantity[i];
                //       console.log(insideData);
                //       if(insideData.match(/\$[0-9]\.[0-9]{2}/)){
                //           priceArray.push(insideData);
                //           console.log(priceArray);
                //       } else if (/[0-9]/){
                //           quantityArray.push(insideData);
                //           console.log(quantityArray);
                //       }
                //
                //       j++;
                //   }); //End of inside forEach
            }
            i++;
        }); //End of forEach function

        receipt.uploadData(receipt.productNames, receipt.skuArray);

    }; //End of processData function

    receipt.uploadData = function() {
        receipt.dataToUpload = [];
        var i = 0;
        //   add SKU Number in productNames
        angular.forEach('receipt.skuArray', function(productNames, skuArray) {
            console.log('productNames', receipt.productNames);
            console.log('skuArray', receipt.skuArray);
            receipt.productNames[i].sku = receipt.skuArray[i];
            receipt.dataToUpload.push(receipt.productNames[i]);
            console.log(receipt.productNames[i]);

            //upload to the database
            var data = {
                category: 'category3',
                sku: receipt.productNames[i].sku,
                name: receipt.productNames[i].productName,
                quantity: receipt.productNames[i].quantity,
                buyDate: receipt.productNames[i].dateBought,
                expirationDate: moment(receipt.productNames[i].dateBought, "DD-MM-YYYY").add(5, 'days')
            };
            ProductService.newItemAdd(data).then(function(response) {
                console.log('response from server after add', response);
            });
            i++;
        });

    }; //End of uploadData
}
