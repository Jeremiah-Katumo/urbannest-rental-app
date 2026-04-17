
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import AppTwo from './AppTwo';
// import { AuthProvider } from './context/AuthContext';
// import { UserProvider } from './context/UserContext';
// import { HouseProvider } from './context/HouseContext';
// import { CampaignProvider } from './context/CampaignContext';
// import { AppProvider } from './context/AppContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <AuthProvider> ✅ MUST COME FIRST
        <AppProvider>
          <UserProvider>
            <HouseProvider>
              <CampaignProvider> */}
                <App />
              {/* </CampaignProvider>
            </HouseProvider>
          </UserProvider>
        </AppProvider>
      </AuthProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
