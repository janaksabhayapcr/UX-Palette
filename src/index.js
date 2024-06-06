import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import IdleTimer from './Components/Utils/IdleTimer';
import { getCookie } from './Components/Utils/HelperFunctions';

// IdleTime: Properties - timeout (Seconds until logout), message (Seconds before timeout that alert will display e.g 300)
// Test Case: Get logged out in 25 seconds, show a message when you have 15 seconds left
// Manually add x_universal_debug = true to your browser to use the test case
export default function AppRender() {
  return (
    <div>
      {/* If there is a window.name (iframe-ud), we are in an iframe and should not set an IdleTimer */}
      {window.name !== 'iframe-ud' ? getCookie('x_universal_debug') === 'true' ? <IdleTimer timeout={25} message={15} /> : <IdleTimer /> : ''}
      <App className="App" />
    </div>
  );
}
ReactDOM.render(<AppRender />, document.getElementById('root'));
