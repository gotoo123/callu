
const webm = document.querySelector('.webm');
const video = document.querySelector('.video');
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');

if(navigator.mediaDevices) {
  console.log('getUserMedia supported');

  const constraints = {
    video: true,
    // audio: true,
  }


  navigator.mediaDevices.getUserMedia(constraints).
    then((stream) => {
      const options = {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        mimeType: 'video/webm;codecs=vp8,opus'
      }
      const mediaRecorder = new MediaRecorder(stream, options);
      video.srcObject = stream;
      video.play();


      start.onclick = () => {
        mediaRecorder.start();
        console.log(mediaRecorder.state);
      }

      stop.onclick = () => {
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
      }

      let chunks = [];
      mediaRecorder.onstop = (e) => {
        console.log('data available after MediaRecorder.stop() called');

        prompt('Enter a name for your video');

        const container = document.createElement('div');
        container.className = 'video-container';
        const myVideo = document.createElement('video');

        myVideo.setAttribute('controls', '');

        container.appendChild(myVideo);
        webm.appendChild(container);

        myVideo.controls = true;

        const blob = new Blob(chunks, {'type': 'video/webm;codecs=vp8,opus'})
        console.log('this is blob');
        console.log(blob);
        myVideo.src = URL.createObjectURL(blob);
        console.log('recorder stopped');

      }

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      }
  }).catch((err) => {
    console.log(err);
  })
}







