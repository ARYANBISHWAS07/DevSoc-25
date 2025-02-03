import './App.css';

function App() {
  const startCapture = () => {
    chrome.runtime.sendMessage({ action: "startCapture" });
  };

  const stopCapture = () => {
    chrome.runtime.sendMessage({ action: "stopCapture" });
  };

  return (
    <div className="w-[300px] h-[400px] flex flex-col items-center gap-4">
      <button onClick={startCapture}>Start Capture</button>
      <button onClick={stopCapture}>Stop Capture</button>
    </div>
  );
}

export default App;
