import { House, UserRoundPen } from 'lucide-react';
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
    <div className='w-[300px] h-[400px] flex'>
      <div className='flex flex-col justify-between py-3 items-center w-[15%] h-full bg-blue-700'>
        <House />
        <UserRoundPen />
      </div>
      <div className="w-full h-full flex flex-col items-center gap-4 bg-blue-500 justify-end py-10 ">
        <img src="logo-2.png" alt="" />
        <button onClick={startCapture} className='bg-white px-5 py-3 shadow-lg rounded-lg'>Start Capture</button>
        <button onClick={stopCapture} className='bg-white px-5 py-3 rounded-lg shadow-lg'>Stop Capture</button>
      </div>
    </div>
  );
}

export default App;