// // angular.module('myApp', ['webcam'])
// angular.module('myApp')
// .controller('ReceiptController', ReceiptController);
//
//
// function ReceiptController($http, Upload) {
//
//     var receipt = this;
//     console.log(receipt.image);
//
//
//     receipt.submitreceipt = function(image){
//         console.log('receipt image', image);
//     }
//
//     receipt.submit = function(file) {
//         //   if (receipt.form.receipt.file.$valid && receipt.file) {
//             receipt.uploadImage(file.$ngfName);
//             console.log(file.$ngfName);
//         //   }
//         };
//
//         receipt.uploadImage = function(file){
//
//             var url = 'https://api.ocr.space/parse/image';
//
//
//             request = Url + q + limit + your_app_ID + your_app_key + '&callback=JSON_CALLBACK';
//             console.log(file);
//             var API_KEY = '25f539a74f88957';
//             var data = {
//                 'file':'@'+file,
//                 'apikey':API_KEY,
//                 'language':'eng',
//
//             };
//
//             $http.post('https://api.ocr.space/parse/image', data).then(function(err, response){
//                 console.log(response);
//                 console.log(err);
//             });
//
//
//
//         }; //end of uploadImage funtion



        // upload on file select or drop
        // receipt.upload = function (file) {
        //     console.log(file);
            // Upload.upload({
            //     url: 'upload/url',
            //     data: {file: file, 'username': receipt.username}
            // }).then(function (resp) {
            //     console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            // }, function (resp) {
            //     console.log('Error status: ' + resp.status);
            // }, function (evt) {
            //     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //     console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            // });
        // };
        // for multiple files:
        // receipt.uploadFiles = function (files) {
        //   if (files && files.length) {
        //     for (var i = 0; i < files.length; i++) {
        //       Upload.upload({ data: {file: files[i]});
        //     }
        //     // or send them all together for HTML5 browsers:
        //     Upload.upload({data: {file: files}});
        //   }
        // }

    // var _video = null,
    //     patData = null;
    //
    // $scope.patOpts = {x: 0, y: 0, w: 25, h: 25};
    //
    // // Setup a channel to receive a video property
    // // with a reference to the video element
    // // See the HTML binding in main.html
    // $scope.channel = {};
    //
    // $scope.webcamError = false;
    // $scope.onError = function (err) {
    //     $scope.$apply(
    //         function() {
    //             $scope.webcamError = err;
    //         }
    //     );
    // };
    //
    // $scope.onSuccess = function () {
    //     // The video element contains the captured camera data
    //     _video = $scope.channel.video;
    //     $scope.$apply(function() {
    //         $scope.patOpts.w = _video.width;
    //         $scope.patOpts.h = _video.height;
    //         //$scope.showDemos = true;
    //     });
    // };
    //
    // $scope.onStream = function (stream) {
    //     // You could do something manually with the stream.
    // };
    //
	// $scope.makeSnapshot = function() {
    //     if (_video) {
    //         var patCanvas = document.querySelector('#snapshot');
    //         if (!patCanvas) return;
    //
    //         patCanvas.width = _video.width;
    //         patCanvas.height = _video.height;
    //         var ctxPat = patCanvas.getContext('2d');
    //
    //         var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
    //         ctxPat.putImageData(idata, 0, 0);
    //
    //         sendSnapshotToServer(patCanvas.toDataURL());
    //
    //         patData = idata;
    //     }
    // };
    //
    // /**
    //  * Redirect the browser to the URL given.
    //  * Used to download the image by passing a dataURL string
    //  */
    // $scope.downloadSnapshot = function downloadSnapshot(dataURL) {
    //     window.location.href = dataURL;
    // };
    //
    // var getVideoData = function getVideoData(x, y, w, h) {
    //     var hiddenCanvas = document.createElement('canvas');
    //     hiddenCanvas.width = _video.width;
    //     hiddenCanvas.height = _video.height;
    //     var ctx = hiddenCanvas.getContext('2d');
    //     ctx.drawImage(_video, 0, 0, _video.width, _video.height);
    //     return ctx.getImageData(x, y, w, h);
    // };
    //
    // /**
    //  * This function could be used to send the image data
    //  * to a backend server that expects base64 encoded images.
    //  *
    //  * In this example, we simply store it in the scope for display.
    //  */
    // var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
    //     $scope.snapshotData = imgBase64;
    // };
// };


// angular.module('myApp')
//     .controller('ReceiptController', ReceiptController);
//     angular.module('myApp').directive('progressBar', progressBar);
//
//         function ReceiptController ($scope, $http, Upload) {
//             $scope.model = {};
//             $scope.selectedFile = [];
//             $scope.uploadProgress = 0;
//             var API_KEY = '25f539a74f88957';
//
//             $scope.uploadFile = function () {
//                 var file = $scope.selectedFile[0];
//                 console.log(file);
//                 $scope.upload = Upload.upload({
//                     url: 'https://api.ocr.space/parse/image',
//                     method: 'POST',
//                     data: angular.toJson($scope.model),
//                     file: file,
//                     apikey:API_KEY,
//
//                 }).progress(function (evt) {
//                     $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total, 10);
//                 }).success(function (data) {
//                     //do something
//                 });
//             };
//
//             $scope.onFileSelect = function ($files) {
//                 $scope.uploadProgress = 0;
//                 $scope.selectedFile = $files;
//                 console.log($files);
//             };
//         }
//
//
//         function progressBar () {
//             return {
//                 link: function ($scope, el, attrs) {
//                     $scope.$watch(attrs.progressBar, function (newValue) {
//                         el.css('width', newValue.toString() + '%');
//                     });
//                 }
//             };
//         }

var myApp = angular.module('myApp');

myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model, modelSetter;

            attrs.$observe('fileModel', function(fileModel){
                console.log(fileModel);
                model = $parse(attrs.fileModel);
                modelSetter = model.assign;
            });

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope.$parent, element[0].files[0]);
                });
            });
        }
    };
}]);

myApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        var API_KEY = '25f539a74f88957';

        fd.append('file', file);
        $http.post(uploadUrl, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
            apikey:API_KEY,
            file:fd

        })
        .success(function(response){
            console.log('OCR Response', response);
        })
        .error(function(err){
            console.log('OCR error Response', err);
        });
    }
}]);

myApp.controller('ReceiptController', ['$scope', 'fileUpload', function($scope, fileUpload){
    $scope.fileInputs = [1,2,3];
    $scope.uploadFile = function(filename){
        var file = $scope[filename];
        console.log('file is ' + JSON.stringify(file));
        console.dir(file);
        var uploadUrl = "https://api.ocr.space/parse/image";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };

}]);
