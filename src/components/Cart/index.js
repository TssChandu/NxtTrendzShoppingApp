import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      const onRemoveAllItems = () => {
        removeAllCartItems()
      }
      let totalValue = 0
      const addPrice = item => {
        totalValue += item.price * item.quantity
      }
      cartList.forEach(addPrice)

      const renderCheckout = () => (
        <div className="checkout-card">
          <h1 className="order-text">
            Order Total: <span className="order-value">Rs {totalValue}/- </span>
          </h1>
          <p className="cart-items-count">{cartList.length} items in cart</p>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  className="remove-btn"
                  type="button"
                  onClick={onRemoveAllItems}
                >
                  Remove All
                </button>
                <CartListView />
                {renderCheckout()}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
