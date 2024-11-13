import React from 'react';
import './header.css'

const Header = ({children}) => {
    return (
        <>
            <div className= "header">{children}</div>
            <hr />
        </>
    );
};

export default Header;