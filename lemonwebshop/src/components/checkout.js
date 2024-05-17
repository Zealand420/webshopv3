import React from 'react';
import { useCart } from '../context/cartcontext';

const Checkout = () => {
  const { cart, removeFromCart } = useCart();

  const handleCheckout = () => {
    console.log('Cart Items:', cart);

    alert('Thank you for your purchase!');
  };

  const totalPrice = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="container mt-4">
      <h1 className='text-center mb-5 mt-3 fw-bold'>Betaling</h1>
      <div className="row">
        <div className="col-md-9">
          {cart.map(item => (
            <div key={item.id} className="row mb-3">
              <div className="col-3">
                <img src={item.image} alt={item.name} className="img-fluid" />
              </div>
              <div className="col-3">
                <h5>{item.name}</h5>
                <p><span className='fw-bold'>Pris</span> {item.price},-</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span><span className='fw-bold'>Antal drinks:</span> {item.quantity || 1}</span>
                </div>
              </div>
              <div className="col-3">
                <button onClick={() => removeFromCart(item.id)} className="btn btn-danger ps-3 pe-3 pt-2 pb-2 fs-5 mt-4 fw-bold text-white">Fjern</button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title card-title text-center fw-bold">Pris i alt</h3>
              <p className="card-text card-text text-center fs-5">{totalPrice.toFixed(2)},-</p>
                <div className='text-center'>
                    <button onClick={handleCheckout} className="btn btn-lemon ps-3 pe-3 pt-2 pb-2 fs-5 mt-2 fw-bold text-dark">Bekræft Køb</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;






