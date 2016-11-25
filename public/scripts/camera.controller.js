angular.module('myApp')
    .controller('cameraController', function($scope, Upload) {
        var camera = this;
        var _video = null,
            patData = null;

        camera.patOpts = {
            x: 0,
            y: 0,
            w: 300,
            h: 300
        };

        // Setup a channel to receive a video property
        // with a reference to the video element
        // See the HTML binding in camera.html
        camera.channel = {};

        camera.webcamError = false;
        camera.onError = function(err) {
            $scope.$apply(
                function() {
                    camera.webcamError = err;
                }
            );
        };

        camera.onSuccess = function() {
            // The video element contains the captured camera data
            _video = camera.channel.video;
            $scope.$apply(function() {
                camera.patOpts.w = _video.width;
                camera.patOpts.h = _video.height;
                //$scope.showDemos = true;
            });
        };
        camera.onStream = function(stream) {
            // You could do something manually with the stream.
        };

        camera.makeSnapshot = function() {
            if (_video) {
                var patCanvas = document.querySelector('#snapshot');
                if (!patCanvas) return;

                patCanvas.width = _video.width;
                patCanvas.height = _video.height;
                var ctxPat = patCanvas.getContext('2d');

                var idata = getVideoData(camera.patOpts.x, camera.patOpts.y, camera.patOpts.w, camera.patOpts.h);
                ctxPat.putImageData(idata, 0, 0);

                sendSnapshotToServer(patCanvas.toDataURL());

                patData = idata;
            }
        };

        /*** Redirect the browser to the URL given.
         * Used to download the image by passing a dataURL string
         */
        camera.downloadSnapshot = function downloadSnapshot(dataURL) {
            window.location.href = dataURL;
        };

        var getVideoData = function getVideoData(x, y, w, h) {
            var hiddenCanvas = document.createElement('canvas');
            hiddenCanvas.width = _video.width;
            hiddenCanvas.height = _video.height;
            var ctx = hiddenCanvas.getContext('2d');
            ctx.drawImage(_video, 0, 0, _video.width, _video.height);
            return ctx.getImageData(x, y, w, h);
        };

        /**
         * This function could be used to send the image data
         * to a backend server that expects base64 encoded images.
         *
         * In this example, we simply store it in the scope for display.
         */
        var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
            camera.snapshotData = imgBase64;
            console.log(imgBase64);

        var API_KEY = '25f539a74f88957';
        camera.data = {};

        // camera.uploadFile = function() {
            Upload.upload({
                url: 'https://api.ocr.space/parse/image',
                data: {
                    base64Image: camera.snapshotData,
                    'apikey': API_KEY
                }
            }).then(function(resp) {
                console.log(resp);
                camera.data = resp.data.ParsedResults[0].ParsedText;
                console.log(camera.data);
                console.log('Successful camera image uploaded. Response: ', resp.data);
                // receipt.processData();

            }, function(resp) {
                console.log('Error status: ' + resp.status);
            }, function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        // }; //End of uploadFile function

    }; //end of sendSnapshotToServer
    });
