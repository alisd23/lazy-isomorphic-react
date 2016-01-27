import * as React from 'react'
import { connect } from 'react-redux'
import { checkout } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import CartComponent from '../components/Cart'
import Product from '../components/Product';
import IProduct from '../interfaces/Product';

interface ICartProps {
  products?: IProduct[];
  total?: number;
  checkout?: React.EventHandler<any>;
}

class Cart extends React.Component<ICartProps, {}> {
  render() {

    return (
      <CartComponent
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
)(Cart)
