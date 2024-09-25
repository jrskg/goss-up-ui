import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from './components/ui/sonner.tsx'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { Provider } from "react-redux"
import { store } from './redux/store.ts'
import { BrowserRouter as Router } from "react-router-dom"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
        <Toaster
          icons={{
            success: <DoneIcon sx={{ scale: 1 }} />,
            error: <CloseIcon sx={{ scale: 1 }} />,
            info: <InfoIcon sx={{ scale: 1 }} />,
            warning: <WarningIcon sx={{ scale: 1 }} />
          }}
          toastOptions={{
            duration: 5000,
            classNames: {
              success: "bg-success text-white",
              error: "bg-danger text-white",
              warning: "bg-warning text-black",
              info: "bg-info text-white",
            },
            style: {
              border: "none",
              fontSize: "16px"
            }
          }}
        />
      </Provider>
    </Router>
  </StrictMode>,
)
