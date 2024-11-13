// src/components/Card.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "./Card.css";

const Card = () => {
    return (
        <Link to="/students" className="card-link">
            <div className='card'>
                <h1>Módulo Alumnos</h1>
            </div>
        </Link>
    );
};

export default Card;