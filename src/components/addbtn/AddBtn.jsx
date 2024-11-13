// src/components/AddBtn/AddBtn.jsx
import React from 'react';
import './AddBtn.css';

const AddBtn = ({ children, onClick }) => (
  <button className="add-button" onClick={onClick}>
    {children}
  </button>
);

export default AddBtn;
