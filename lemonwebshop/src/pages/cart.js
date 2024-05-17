import React from 'react';
import { useCart } from '../context/cartcontext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();
  const navigate = useNavigate();

  // Udregner den totale samlede pris for drinks.
  const totalPrice = cart.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <div className="row mt-4">
      <h1 className='text-center mb-5 mt-3 fw-bold'>Kurv</h1>
      <div className="col-md-8">
        {cart.length === 0 ? (
          <p>Din kurv er tom</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {cart.map(item => (
              <div key={item.id} className="col">
                <div className="card">
                  <img className="card-img-top" src={item.image} alt={item.name} />
                  <div className="card-body">
                    <h3 className="card-title text-center fw-bold">{item.name}</h3>
                    <p className="card-text text-center fs-5"><span className='fw-bold'>Pris:</span> {item.price},-</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <button onClick={() => decrementQuantity(item.id)} className="btn btn-danger fs-4 pb-1 ps-3 pe-3">-</button>
                      <span>Antal: {item.quantity}</span>
                      <button onClick={() => incrementQuantity(item.id)} className="btn btn-success fs-4 pt-1 pb-1 ps-3 pe-3">+</button>
                    </div>
                    <div className='text-center'>
                      <button onClick={() => removeFromCart(item.id)} className="btn btn-danger ps-3 pe-3 pt-2 pb-2 fs-5 mt-4 fw-bold text-white">Fjern</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center fw-bold">Pris i alt</h3>
            <p className="card-text text-center fs-5">{totalPrice.toFixed(2)},-</p>
            <div className='text-center'>
              <button onClick={() => navigate('/checkout')} className="btn btn-lemon ps-3 pe-3 pt-2 pb-2 fs-5 mt-2 fw-bold text-dark">Gå til betaling</button>
            </div>         
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;






