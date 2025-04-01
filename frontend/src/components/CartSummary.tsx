import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartSummary() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <>
      <div
        style={{
          zIndex: 9999,
          position: 'fixed',
          top: '10px',
          right: '20px',
          background: '#f8f9fa',
          padding: '10px 15 px',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2',
          fontSize: '16px',
        }}
        onClick={() => navigate('/cart')}
      >
        <p>
          🛒
          <br />
          Total Number of Books: <strong>{totalItems}</strong>
          <br />
          Total Price: <strong>${totalAmount.toFixed(2)}</strong>
          <br />
          <strong>Go To Cart</strong>
        </p>
      </div>
    </>
  );
}

export default CartSummary;
