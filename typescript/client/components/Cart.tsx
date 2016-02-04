import * as React from 'react';
import Product from './Product';
import IProduct from '../interfaces/Product';


interface ICartProps {
  products: IProduct[];
  total: number;
  onCheckoutClicked: React.EventHandler<any>;
}

class Cart extends React.Component<ICartProps, {}> {
  render() : React.ReactElement<ICartProps> {
    // Import styles
    require('../../../sass/common.scss');

    const hasProducts = this.props.products.length > 0;
    const nodes = !hasProducts
      ? <em>Please add some products to cart.</em>
      : this.props.products.map(product =>
          <div key={product.id} className="m-b-2">
            <Product
              title={product.title}
              price={product.price}
              quantity={product.quantity}
              image={product.image}
              id={product.id} />
          </div>
        );

    return (
      <div className="p-x-2 p-y-3">
        <h5 className="m-b-3 small-caps">Your Cart</h5>
        <div className="flex row-xs-bottom flex-wrap">
          <div className="cart-list flex-expand m-b-2 m-r-2">{nodes}</div>
          <div className="checkout flex-static bg-faded p-a-3 m-b-2">
            <h3 className="m-b-3">
              <span className="small-caps small">Total - </span>
              <span><strong>£{this.props.total}</strong></span>
            </h3>
            <button className="btn btn-block btn-lg btn-success" onClick={this.props.onCheckoutClicked} disabled={!hasProducts}>
              <span className="small-caps small"><strong>Checkout</strong></span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
