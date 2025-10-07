import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import App from './App.jsx'
import './index.css'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';  

createRoot(document.getElementById('root')).render(
  
  <RecoilRoot>
    {/* <ToastContainer /> */}
    <App />  
  </RecoilRoot>
  
)
