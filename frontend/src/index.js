import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'


import { Home, Login, CompanyMain, PageNotFound,EmployeeMain } from "./pages"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/company" element={<CompanyMain />} />
        <Route path="/employee" element={<EmployeeMain />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
   
  </BrowserRouter>
);