// src/pages/StudentPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import AddBtn from '../../components/AddBtn/AddBtn';
import SearchBar from './SearchBar';
import StudentTable from './StudentTable';
import Pagination from './Pagination';
import './StudentPage.css';

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState(''); // Estado para el término de búsqueda

  useEffect(() => {
    fetchStudents();
  }, [currentPage, pageSize, search]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`/api/students?pageSize=${pageSize}&currentPage=${currentPage}&search=${search}`);
      const data = await response.json();
      setStudents(data.rows);
      setTotalStudents(data.totalCount);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/students/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchStudents();
      } else {
        console.error("Error en la respuesta del servidor");
      }
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
    }
  };

  const handleSearch = (searchValue) => {
    setSearch(searchValue); // Actualizar el estado de búsqueda
    setCurrentPage(1); // Reiniciar a la primera página en cada nueva búsqueda
  };

  const totalPages = Math.ceil(totalStudents / pageSize);

  return (
    <>
      <Header>
        <h2>Alumnos</h2>
        <Link to={'/students/add'}>
          <AddBtn>Agregar</AddBtn>
        </Link>
      </Header>
      <div className="main_content">
        <SearchBar onSearch={handleSearch} /> {/* Pasar handleSearch como onSearch */}
        <StudentTable students={students} onDelete={handleDelete} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalItems={totalStudents}
        />
      </div>
    </>
  );
};

export default StudentPage;
