import * as React from 'react'
import { connect } from 'react-redux'
import { checkout } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'
import Product from '../components/Product';
import IProduct from '../interfaces/Product';

interface ICartContainerProps {
  products?: IProduct[];
  total?: number;
  checkout?: React.EventHandler<any>;
}

class CartContainer extends React.Component<ICartContainerProps, {}> {
  render() {

    return (
      <Cart
        products={this.props.products}
        total={this.props.total}
        onCheckoutClicked={(e) => this.props.checkout(e)} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: getCartProducts(state),
    total: getTotal(state)
  }
}

export default connect(
  mapStateToProps,
  { checkout }
)(CartContainer)
