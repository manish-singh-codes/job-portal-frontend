import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Toaster} from './components/ui/sonner.jsx'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './redux/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google'




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <App />
      <Toaster richColors />
    </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
