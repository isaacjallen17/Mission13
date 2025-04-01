import { useNavigate } from 'react-router-dom';
import '../components/Filter.css';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import CartSummary from '../components/CartSummary';

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  return (
    <>
      <CartSummary />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Your Cart</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <button className="btn btn-success" onClick={() => navigate(-1)}>
              Continue Browsing
            </button>
          </div>
          <div className="col-8">
            {cart.length === 0 ? (
              <div className="card shadow-sm p-3 mb-5 rounded bg-secondary p-5 text-light">
                <h3>Your Cart is Empty.</h3>
              </div>
            ) : (
              <div>
                {cart.map((item: CartItem) => (
                  <div
                    key={item.bookID}
                    className="card shadow-sm p-3 mb-5 rounded bg-secondary p-5 text-light"
                  >
                    <h3 className="card-title">
                      <strong>{item.title}</strong>
                      <br />
                      By {item.author}
                    </h3>
                    <div className="card-body">
                      <ul className="list-unstyled">
                        <li>
                          <strong>Category:</strong> {item.category}
                        </li>
                        <li>
                          <strong>Quantity:</strong> {item.quantity}
                        </li>
                        <li>
                          <strong>Price:</strong> ${item.price.toFixed(2)}
                        </li>
                        <li>
                          <strong>Total:</strong> ${item.total.toFixed(2)}
                        </li>
                      </ul>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(item.bookID)}
                      >
                        Remove From Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </>
  );
}

export default Cart;
