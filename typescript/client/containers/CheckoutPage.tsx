import * as React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import IProduct from '../interfaces/Product';
import { checkout, ICartState, getProducts, getTotal } from '../redux/modules/cart';
import { IProductsState } from '../redux/modules/products';
import Product from '../components/Product'
import CartComponent from '../components/Cart'
import classnames = require('classnames');

interface IProductContainerProps {
  push?: (String) => any;
  checkout?: (products: IProduct[]) => any;
  products: IProduct[];
  total: number;
}
interface IProductContainerState {}

// TODO - Separate into CONTAINER (this file - funcionality, state) and
// PRESENTATIONAL COMPONENT (Styles, markup)
class ProductContainer extends React.Component<IProductContainerProps, IProductContainerState> {

  render() : React.ReactElement<IProductContainerProps> {
    require('../../../sass/common.scss');
    require('../../../sass/checkoutPage.scss');

    return (
      <div id="checkout-page" className="p-b-3">
        <h2 className="text-xs-center p-y-3 small-caps"><strong>CHECKOUT</strong></h2>
        <hr/>
        <div className="p-y-3">
          {
            this.props.products.map(product =>
              <div className="m-b-2" key={product.id}>
                <Product
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  quantity={product.quantity}
                  image={product.image} />
              </div>
            )
          }
        </div>
        <div className="flex-static bg-faded p-a-3 m-b-2">
          <h3>
            <span className="small-caps small">Total - </span>
            <span><strong>£{this.props.total}</strong></span>
          </h3>
        </div>
        <button className="btn btn-lg btn-block btn-primary-outline add-to-cart m-t-3" onClick={() => this.checkout()}>
          <span className="small-caps small">Buy now</span>
        </button>
      </div>
    );
  }

  private checkout() {
    this.props.checkout(this.props.products);
    this.props.push('/');
  }
}

function mapStateToProps(state) {
  return {
    products: getProducts(state.products, state.cart),
    total: getTotal(state.products, state.cart)
  }
}

export default connect(
  mapStateToProps,
  Object.assign({},
    routeActions,
    { checkout }
  ) as any
)(ProductContainer)
