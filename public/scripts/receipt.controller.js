
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

        var API_KEY = '25f539a74f88957';
        var fd = new FormData();


        for (var key in file) {
            console.log(key, file[key]);
            fd.append(key, file[key]);
        }
        console.log(file);


        var your_app_key = '&apikey=6d84ea800f46d8ee5c73a0ec0e7bb354';
        var overlay = '&isOverlayRequired=true';

        var picurl= "&url=https://www.w3.org/TR/SVGTiny12/examples/textArea01.png"



        var request = uploadUrl +' --data'+ your_app_key + overlay + picurl;

         $http.post(request)
        // {
        //
        //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        //    params:{ url: 'https://www.w3.org/TR/SVGTiny12/examples/textArea01.png',
        //             apikey:API_KEY,
        //
        //}
        //
        // })
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
