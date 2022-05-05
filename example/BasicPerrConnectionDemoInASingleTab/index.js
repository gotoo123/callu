const startButton = document.querySelector('.startButton');
const callButton = document.querySelector('.callButton');
const hangupButton = document.querySelector('.hangupButton');

const localVideo = document.querySelector('.localVideo');

callButton.disabled = true;
hangupButton.disables = true;
startButton.addEventListener('click', start);

// 视频流
let stream;
async function start() {
  console.log('开始请求本地视频流');
  startButton.disabled = true;
  
  try{
    const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    console.log('获取到视频流');
    localVideo.srcObject = stream;
    localStream = stream;
    callButton.disabled = false;
  } catch(e) {
    alert(`getUserMedia() error: ${e.name}`);
  }
}