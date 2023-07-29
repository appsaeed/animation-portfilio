import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//css
import "./index.css";
//components
import Home from "./pages/home/Home";

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

/**
 * Reader React component
 */
const rootdiv = import.meta.env.VITE_ROOTDIV || "root";
//main element selector
const element = document.getElementById(rootdiv) as HTMLElement;
//component renderer
ReactDOM.createRoot(element).render(<React.StrictMode children={<App />} />);
