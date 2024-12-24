// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Buffer } from "buffer";

window.Buffer = window.Buffer || Buffer;
createRoot(document.getElementById('root')).render(
  // Quitamos el StrictMode para evitar que el código se ejecuta dos veces a la hora de probarlo
  // <StrictMode>
    <App />
  // </StrictMode>,
)
