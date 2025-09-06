import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  
  <RecoilRoot>
    <ToastContainer />
    <App />  
  </RecoilRoot>
  
)
