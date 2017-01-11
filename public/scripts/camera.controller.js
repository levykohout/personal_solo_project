angular.module('myApp')
    .controller('cameraController', function($scope, $interval, Upload) {
        var camera = this;
    //     var _video = null,
    //         patData = null;
    //
    //     camera.patOpts = {
    //         x: 0,
    //         y: 0,
    //         w: 300,
    //         h: 300
    //     };
    //
    //     // Setup a channel to receive a video property
    //     // with a reference to the video element
    //     // See the HTML binding in camera.html
    //     camera.channel = {};
    //
    //     camera.webcamError = false;
    //     camera.onError = function(err) {
    //         $scope.$apply(
    //             function() {
    //                 camera.webcamError = err;
    //             }
    //         );
    //     };
    //
    //     camera.onSuccess = function() {
    //         // The video element contains the captured camera data
    //         _video = camera.channel.video;
    //         $scope.$apply(function() {
    //             camera.patOpts.w = _video.width;
    //             camera.patOpts.h = _video.height;
    //             //$scope.showDemos = true;
    //         });
    //     };
    //     camera.onStream = function(stream) {
    //         // You could do something manually with the stream.
    //     };
    //
    //     camera.makeSnapshot = function() {
    //         if (_video) {
    //             var patCanvas = document.querySelector('#snapshot');
    //             if (!patCanvas) return;
    //
    //             patCanvas.width = _video.width;
    //             patCanvas.height = _video.height;
    //             var ctxPat = patCanvas.getContext('2d');
    //
    //             var idata = getVideoData(camera.patOpts.x, camera.patOpts.y, camera.patOpts.w, camera.patOpts.h);
    //             ctxPat.putImageData(idata, 0, 0);
    //
    //             sendSnapshotToServer(patCanvas.toDataURL());
    //
    //             patData = idata;
    //         }
    //     };
    //
    //     /*** Redirect the browser to the URL given.
    //      * Used to download the image by passing a dataURL string
    //      */
    //     camera.downloadSnapshot = function downloadSnapshot(dataURL) {
    //         window.location.href = dataURL;
    //     };
    //
    //     var getVideoData = function getVideoData(x, y, w, h) {
    //         var hiddenCanvas = document.createElement('canvas');
    //         hiddenCanvas.width = _video.width;
    //         hiddenCanvas.height = _video.height;
    //         var ctx = hiddenCanvas.getContext('2d');
    //         ctx.drawImage(_video, 0, 0, _video.width, _video.height);
    //         return ctx.getImageData(x, y, w, h);
    //     };
    //
    //     /**
    //      * This function could be used to send the image data
    //      * to a backend server that expects base64 encoded images.
    //      *
    //      * In this example, we simply store it in the scope for display.
    //      */
    //     var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
    //         camera.snapshotData = imgBase64;
    //         console.log(imgBase64);
    //
    //     var API_KEY = '25f539a74f88957';
    //     camera.data = {};
    //
    //     // camera.uploadFile = function() {
    //         Upload.upload({
    //             url: 'https://api.ocr.space/parse/image',
    //             data: {
    //                 base64Image: camera.snapshotData,
    //                 'apikey': API_KEY
    //             }
    //         }).then(function(resp) {
    //             console.log(resp);
    //             camera.data = resp.data.ParsedResults[0].ParsedText;
    //             console.log(camera.data);
    //             console.log('Successful camera image uploaded. Response: ', resp.data);
    //             // receipt.processData();
    //
    //         }, function(resp) {
    //             console.log('Error status: ' + resp.status);
    //         }, function(evt) {
    //             var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //             console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //         });
    //     // }; //End of uploadFile function
    //
    // }; //end of sendSnapshotToServer


    // var videoElement = document.querySelector('video');
    // var audioSelect = document.querySelector('select#audioSource');
    var videoSelect = document.querySelector('select#videoSource');

    // Older browsers might not implement mediaDevices at all, so we set an empty object first
if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function(constraints) {

    // First get ahold of the legacy getUserMedia, if present
    var getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia);

    // Some browsers just don't implement it - return a rejected promise with an error
    // to keep a consistent interface
    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

    // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
    return new Promise(function(resolve, reject) {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}
    //
    // navigator.getUserMedia  = navigator.getUserMedia ||
    //                           navigator.webkitGetUserMedia ||
    //                           navigator.mozGetUserMedia ||
    //                           navigator.msGetUserMedia;

                          //     if (navigator.getUserMedia) {
                          //   navigator.getUserMedia({audio: true, video: true}, function(stream) {
                          //     video.src = window.URL.createObjectURL(stream);
                          //   }, errorCallback);
                          // }
                          //
                          // MediaStreamTrack.getSources(function(sourceInfos) {
                          //   var audioSource = null;
                          //   var videoSource = null;
                          //
                          //   for (var i = 0; i != sourceInfos.length; ++i) {
                          //     var sourceInfo = sourceInfos[i];
                          //     if (sourceInfo.kind === 'audio') {
                          //       console.log(sourceInfo.id, sourceInfo.label || 'microphone');
                          //
                          //       audioSource = sourceInfo.id;
                          //     } else if (sourceInfo.kind === 'video') {
                          //       console.log(sourceInfo.id, sourceInfo.label || 'camera');
                          //
                          //       videoSource = sourceInfo.id;
                          //     } else {
                          //       console.log('Some other kind of source: ', sourceInfo);
                          //     }
                          //   }
                          //
                          //   sourceSelected(audioSource, videoSource);
                          // });
                          //
                          // function sourceSelected(audioSource, videoSource) {
                          //   var constraints = {
                          //     audio: {
                          //       optional: [{sourceId: audioSource}]
                          //     },
                          //     video: {
                          //       optional: [{sourceId: videoSource}]
                          //     }
                          //   };
                          //
                          //   navigator.getUserMedia(constraints, successCallback, errorCallback);
                          // }
                          //





   //
  //                         var videoSources = [];
  //   function gotSources(sourceInfos) {
  //     for (var i = 0; i !== sourceInfos.length; ++i) {
  //       var sourceInfo = sourceInfos[i];
  //       var option = document.createElement('option');
  //       option.value = sourceInfo.id;
  //       if (sourceInfo.kind === 'audio') {
  //           console.log(option);
  //         option.text = sourceInfo.label || 'microphone ' +
  //           (audioSelect.length + 1);
  //         audioSelect.appendChild(option);
  //       } else if (sourceInfo.kind === 'video') {
  //       console.log(option);
  //         option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
  //         videoSelect.appendChild(option);
  //       } else {
  //         console.log('Some other kind of source: ', sourceInfo);
  //       }
  //     }
  //   }
   //
  //   if (typeof MediaStreamTrack === 'undefined' ||
  //       typeof MediaStreamTrack.getSources === 'undefined') {
  //     alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
  //   } else {
   //
  //     MediaStreamTrack.getSources(gotSources);
  //   }
   //
  //   function successCallback(stream) {
   //
  //     window.stream = stream; // make stream available to console
  //     videoElement.src = window.URL.createObjectURL(stream);
  //     // Check ready state
  //  function checkReadyState(){
  //    if (videoElement.readyState == 4)
  //    {
  //      $interval.cancel(interval);
  //      videoElement.play();
  //      $scope.$emit('videoStreaming');
  //    }
  //  }
  //  var interval = $interval(checkReadyState, 1000);
  //     // videoElement.play();
  //   }
  //   //
  //   function errorCallback(error) {
  //     console.log('navigator.getUserMedia error: ', error);
  //   }
   //
  //   function start(cameraIndex) {
  //     if (window.stream) {
  //       videoElement.src = null;
  //       // window.stream.stop();
  //     }
  //     console.log('start function started!');
  //     var audioSource = audioSelect.value;
  //     var videoSource = videoSelect.value;
  //     console.log(videoSource);
  //     var constraints = {
  //       audio: false,
  //       video: {
  //         optional: [{
  //           sourceId: videoSource
  //         }]
  //       }
  //     };
  //     navigator.getUserMedia(constraints, successCallback, errorCallback);
  //   }
   //
  //   audioSelect.onchange = start;

   //
  //   start();
   //
   camera.startCamera=function(){
     var front=false;
      var myConstraints = { audio: false, video: { facingMode: (front? "user" : "environment") } };

  //  var myConstraints = {
  //    audio: false,
  //    video: {
  //      facingMode: { exact: "environment" },
  //      width: 1280,
  //      height: 720,
  //     // sourceId: selectedCamera.deviceIndex
   //
  //    }
  //    }

   navigator.mediaDevices.getUserMedia(myConstraints).then(function(mediaStream) {
     /* use the stream */
     var video = document.querySelector('video');
     video.srcObject = mediaStream;
     video.onloadedmetadata = function(e) {
       video.play();
     };
   }).catch(function(err) {
     /* handle the error */
     console.log(err.name + ": " + err.message);
   });
   };

   camera.videoSources=[];
  //  camera.selectedVideo=camera.videoSources[0];
      // List cameras and microphones.
   camera.getVideoSources = function(){
      // camera.videoSources.length=0;
      navigator.mediaDevices.enumerateDevices()
      .then(function(devices) {

        devices.forEach(function(device) {
          if(device.kind =='videoinput'){
            camera.videoSources.push(device);
          console.log(device.kind + ": " + device.label +
                      " id = " + device.deviceId);
                    }

        });
        // document.getElementById('videoSource').onclick = function() {
        //   front = !front;
           camera.startCamera();
          //  videoSelect.onchange = camera.startCamera;

        // };
      })
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      });

   }

  //  camera.getVideoSources();
   //
  //  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  //    console.log("enumerateDevices() not supported.");
  //    return;
  //  } else {
  //    camera.getVideoSources();
   //
  //  }


camera.getVideoSources();



    });
