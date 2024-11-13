import React from 'react';
import Header from '../components/header/Header';
import Card from '../components/card/card';
const MainPage = () => {
    return (
        <>
            <Header><h2>Página Principal</h2></Header>
            <div className='main_content'>
                <Card/>
            </div>
        </>
    );
};

export default MainPage;