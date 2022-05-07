const startButton = document.querySelector('.startButton');
const callButton = document.querySelector('.callButton');
const hangupButton = document.querySelector('.hangupButton');

const localVideo = document.querySelector('.localVideo');

callButton.disabled = true;
hangupButton.disables = true;
startButton.addEventListener('click', start);
callButton.addEventListener('click', call);

// 本地视频流
let localStream;
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

async function call() {
  callButton.disabled = true;
  hangupButton.disabled = false;
  console.log('开始呼叫');
  startTime = window.performance.now();

  // 获取音视频设备
  const videoTracks = localStream.getVideoTracks();
  const audioTracks = localStream.getAudioTracks();
  if(videoTracks.length > 0) {
    console.log(`使用的视频设备是: ${videoTracks[0].label}`);
  }
  if(audioTracks.length > 0) {
    console.log(`使用的音频设备是: ${audioTracks[0].label}`);
  }

  const configuration = {};
  console.log('RTC对等连接参数: ', configuration);
  pc1 = new RTCPeerConnection(configuration);
  console.log('创建本地对等链接对象pc1');
  pc1.addEventListener('icecandidate', e => onIceCandidate(pc1, e));
  pc2 = new RTCPeerConnection(configuration);
  console.log('创建远程对等连接对象pc2');
  pc2.addEventListener('icecandidate', e => onIceCandidate(pc2, e));
  
}

const onIceCandidate = (pc, event) => {
  try {
    await(getOtherPc(pc).addIceCandidate(event.candidate));
    onAddIceCandidateSuccess(pc);
  } catch(e) {
    onAddIceCandidateError(pc, e);
  }
  console.log(`${getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
}

const getOtherPc = (pc) => {
  return (pc === pc1) ? pc2 : pc1;
}

const onAddIceCandidateSuccess = (pc) => {
  console.log(`${getName(pc)} addIceCandidate 成功`);
}

const onAddIceCandidateError = (pc) => {
  console.log(`${getName(pc)} addIceCandidate 失败: ${error.toString()}`);
}