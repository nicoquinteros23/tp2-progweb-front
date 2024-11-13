import React, { useState } from 'react';
import Header from '../components/header/Header';
import BackBtn from '../components/BackBtn/BackBtn';
import { Link, useNavigate } from 'react-router-dom';
import './StudentForm.css';

const StudentForm = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        dni: '',
        email: '',
    });
    const [errors, setErrors] = useState({}); // Estado para almacenar errores específicos
    const [serverError, setServerError] = useState(''); // Error del backend para email
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Limpiar el error específico cuando se modifica el campo
        setServerError(''); // Limpiar el error del servidor
    };

    const validateForm = () => {
        let newErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const dniPattern = /^[0-9]{1,10}$/;

        if (!formData.firstname || formData.firstname.length > 100) {
            newErrors.firstname = 'Nombre requerido y no debe exceder 100 caracteres.';
        }

        if (!formData.lastname || formData.lastname.length > 100) {
            newErrors.lastname = 'Apellido requerido y no debe exceder 100 caracteres.';
        }

        if (!dniPattern.test(formData.dni)) {
            newErrors.dni = 'DNI debe ser numérico y contener hasta 10 dígitos.';
        }

        if (!emailPattern.test(formData.email)) {
            newErrors.email = 'Por favor, ingrese un email válido.';
        } else if (formData.email.length > 100) {
            newErrors.email = 'El email no debe exceder 100 caracteres.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await fetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/students');
            } else if (response.status === 509) {
                setServerError('Este correo ya está registrado.');
                setErrors({ ...errors, email: 'Este correo ya está registrado.' });
            } else {
                const data = await response.json();
                setServerError(data.error || 'Error al agregar alumno.');
            }
        } catch (error) {
            setServerError('Error en la conexión con el servidor.');
        }
    };

    return (
        <>
            <Header>
                <h2>Agregar Alumno</h2>
                <Link to={'/students'}>
                    <BackBtn />
                </Link>
            </Header>
            <div className="main_content">
                <form onSubmit={handleSubmit} className="student-form">
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            maxLength="100"
                            required
                        />
                        {errors.firstname && <p className="error-text">{errors.firstname}</p>}
                    </div>
                    <div>
                        <label>Apellido:</label>
                        <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            maxLength="100"
                            required
                        />
                        {errors.lastname && <p className="error-text">{errors.lastname}</p>}
                    </div>
                    <div >
                        <label>DNI:</label>
                        <input 
                            type="text"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            maxLength="10"
                            pattern="^[0-9]{1,10}$"
                            title="El DNI debe contener hasta 10 dígitos numéricos."
                            required
                        />
                        {errors.dni && <p className="error-text">{errors.dni}</p>}
                    </div>
                    <div >
                        <label>Email:</label>
                       <div className='form_error'>
                       <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            maxLength="100"
                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                            title="Por favor, ingrese un email válido."
                            required
                        />
                        {(errors.email || serverError) && (
                            <p className="error-text">{errors.email || serverError}</p>
                        )}
                       </div>
                    </div>
                    <button type="submit">Agregar</button>
                </form>
            </div>
        </>
    );
};

export default StudentForm;
