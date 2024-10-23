import { Provider } from "./components/ui/provider.jsx"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from "@react-oauth/google"
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <StrictMode>
      <BrowserRouter>
        <Provider>
          <App />
        </Provider>
      </BrowserRouter>
    </StrictMode>
  </GoogleOAuthProvider> 
)
