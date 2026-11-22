import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import "./index.css";
// import ScrollToTop from "./components/ScrollToTop";

// const rootElement = document.getElementById("root");

// if (!rootElement) {
//   throw new Error("Failed to find the root element");
// }

// ReactDOM.createRoot(rootElement).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ScrollToTop />
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
// );
