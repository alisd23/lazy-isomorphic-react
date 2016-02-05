import * as React from 'react'
import { connect } from 'react-redux'
import { checkout } from '../../redux/modules/cart'
import { routeActions } from 'react-router-redux';
import { getTotal, getProducts } from '../../redux/modules/cart'
import CartComponent from '../../components/Cart/Cart'
import IProduct from '../../interfaces/Product';

interface ICartProps {
  products?: IProduct[];
  total?: number;
  push?: (String) => any;
}

class Cart extends React.Component<ICartProps, {}> {
  render() {

    return (
      <CartComponent
        products={this.props.products}
        total={this.props.total}
        onCheckoutClicked={(e) => this.props.push('/checkout')} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: getProducts(state.products, state.cart),
    total: getTotal(state.products, state.cart)
  }
}

export default connect(
  mapStateToProps,
  routeActions as any
)(Cart)
