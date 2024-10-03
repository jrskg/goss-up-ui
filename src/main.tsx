import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from './components/ui/sonner.tsx'
import { Provider } from "react-redux"
import { store } from './redux/store.ts'
import { BrowserRouter as Router } from "react-router-dom"
import { CheckIcon, XIcon, InfoIcon, TriangleAlertIcon} from 'lucide-react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
        <Toaster
          icons={{
            success: <CheckIcon />,
            error: <XIcon />,
            info: <InfoIcon />,
            warning: <TriangleAlertIcon />
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
