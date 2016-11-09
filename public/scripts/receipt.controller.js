

angular.module('myApp')
    .controller('ReceiptController', ReceiptController);

function ReceiptController(Upload){

    var receipt = this;
        var API_KEY = '25f539a74f88957';
        receipt.data = {};
        receipt.data =[];

    receipt.uploadFile = function() {
        Upload.upload({
                    url: 'https://api.ocr.space/parse/image',
                    data: {file: receipt.file, 'apikey': API_KEY}
                }).then(function (resp) {
                    receipt.data = resp.data.ParsedResults[0].ParsedText;
                    console.log(receipt.data);
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' ,resp.data);
                    receipt.processData();
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
    };//End of uploadFile function

    receipt.processData = function(){
        var i=0;
        var skuArray = [];
        var priceArray = [];
        var productNames =[];
         receipt.dataArray = receipt.data.split('\n');
         console.log(receipt.dataArray);
         //loop through each data in the array and save into new array per information type
          angular.forEach(receipt.dataArray, function(value, i){
              var data =receipt.dataArray[i];

              if(data.match(/[0-9]{8}/)){
            //   if (!isNaN(parseInt(data) * 1) && data.length >=9){
                      console.log('This is an SKU Number');
                  skuArray.push(data);
                  console.log(skuArray);

            } else if ( data.match(/(.*[A-Z]){3}/) && data == data.toUpperCase()){
                  productNames.push(data);
                  console.log(productNames);

              } else if(data.match(/[0-9]{0,1}\s/)){
                  priceArray.push(data);
                  console.log(priceArray);
              }
              i++;
          }); //End of forEach function

    }; //End of processData function
}
