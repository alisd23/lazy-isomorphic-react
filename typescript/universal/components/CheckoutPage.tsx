import * as React from 'react';
import classnames = require('classnames');
import { checkout } from '../redux/modules/cart';

import IProduct from '../interfaces/Product';

import CartProduct from '../containers/Cart/CartProduct'
import CartComponent from '../components/Cart/Cart'

interface ICheckoutPageComponentProps {
  onCheckoutClicked?: () => any;
  products: IProduct[];
  total: number;
}
interface ICheckoutPageComponentState {}

export default class CheckoutPageComponent extends React.Component<ICheckoutPageComponentProps, ICheckoutPageComponentState> {

  render() : React.ReactElement<ICheckoutPageComponentProps> {
    require('../../../sass/checkoutPage.scss');

    return (
      <div id="checkout-page" className="container p-b-3">
        <h2 className="text-xs-center p-y-3 small-caps"><strong>CHECKOUT</strong></h2>
        <hr/>
        <div className="p-y-3">
          {
            this.props.products.map(product =>
              <div className="m-b-2" key={product.id}>
                <CartProduct product={product} />
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
        <button className="btn btn-lg btn-block btn-primary-outline add-to-cart m-t-3"
                onClick={() => this.props.onCheckoutClicked()}
                disabled={this.props.products.length === 0}>
          <span className="small-caps small">Buy now</span>
        </button>
      </div>
    );
  }
}
