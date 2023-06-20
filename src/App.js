import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeCartItem = id => {
    const {cartList} = this.state
    this.setState({cartList: cartList.filter(eachItem => eachItem.id !== id)})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productItem = cartList.find(item => item.id === id)
    const {quantity} = productItem
    if (quantity > 1) {
      const updatedProduct = {...productItem, quantity: quantity - 1}
      const filteredList = cartList.filter(eachItem => eachItem.id !== id)
      this.setState({cartList: [...filteredList, updatedProduct]})
    } else {
      const filteredList = cartList.filter(eachItem => eachItem.id !== id)
      this.setState({cartList: filteredList})
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productItem = cartList.find(item => item.id === id)
    const {quantity} = productItem
    const updatedProduct = {...productItem, quantity: quantity + 1}
    const filteredList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: [...filteredList, updatedProduct]})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const availableProduct = cartList.find(item => item.id === product.id)
    if (availableProduct === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const {quantity} = availableProduct
      const updatedProduct = {...availableProduct, quantity: quantity + 1}
      const filteredList = cartList.filter(
        eachItem => eachItem.id !== product.id,
      )
      this.setState({cartList: [...filteredList, updatedProduct]})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
