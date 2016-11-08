

angular.module('myApp')
    .controller('ReceiptController', ReceiptController);

function ReceiptController(Upload){

    var receipt = this;
        var API_KEY = '25f539a74f88957';
        receipt.data = {};

    receipt.uploadFile = function() {
        Upload.upload({
                    url: 'https://api.ocr.space/parse/image',
                    data: {file: receipt.file, 'apikey': API_KEY}
                }).then(function (resp) {
                    receipt.data = resp.data.ParsedResults[0].ParsedText;
                    console.log(receipt.data);
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' ,resp.data);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
    }
}
