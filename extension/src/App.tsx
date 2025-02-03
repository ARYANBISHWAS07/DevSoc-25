import './App.css';


function App() {
  const startCapture = () => {
    // chrome.runtime.sendMessage({ action: "startCapture" });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // @ts-ignore
      chrome.tabs.sendMessage(tabs[0].id, { action: 'startCapture' });
    });
  };

  const stopCapture = () => {
    // chrome.runtime.sendMessage({ action: "stopCapture" });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // @ts-ignore
      chrome.tabs.sendMessage(tabs[0].id, { action: 'stopCapture' });
    });
  };

  return (
    <div className="w-[300px] h-[400px] flex flex-col items-center gap-4">
      <button onClick={startCapture}>Start Capture</button>
      <button onClick={stopCapture}>Stop Capture</button>
      <video id="video" autoPlay className='w-[150px] h-[200px]'></video>
    </div>
  );
}

export default App;