import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/tailwind.css'

declare global {
  interface Window {
    wpReactPodsData: {
      initialData: any;
      apiUrl: string;
      nonce: string;
    };
  }
}

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('Root element not found')
} else {
  console.log('Root element found', rootElement)
  console.log('Initial Data:', window.wpReactPodsData)

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App pageData={window.wpReactPodsData.initialData} />
    </React.StrictMode>
  )
} 