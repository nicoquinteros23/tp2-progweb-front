// src/components/StudentTable/StudentTable.jsx
import React from 'react';
import './StudentPage.css';

const StudentTable = ({ students = [], onDelete }) => {
  return (
    <table className="students-table">
      <thead>
        <tr>
          <th>Legajo</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.sid}</td>
            <td>{student.firstname}</td>
            <td>{student.lastname}</td>
            <td>
              <button
                className="delete-button"
                onClick={() => {
                  const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar al estudiante ${student.firstname} ${student.lastname}?`);
                  if (confirmDelete) onDelete(student.id); // Usa `id` para el borrado
                }}
              >
                Borrar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
