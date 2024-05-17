import React from 'react';
//importering af react-router-dom ved at skrive her og installere det via. command prompt
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-lemon">
      <div className="container-fluid">
      <Link to="/productlist" className="navbar-brand fs-1 fw-bold ms-3">LemonFiesta</Link>
      <Link to="/cart" className="btn btn-outline-light me-3 fw-bold fs-3">
        <i className="fas fa-shopping-cart"></i> Kurv
      </Link>
      </div>
    </nav>
  );
}

export default Navbar;

