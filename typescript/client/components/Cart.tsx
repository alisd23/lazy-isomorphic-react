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
          <Product
            title={product.title}
            price={product.price}
            quantity={product.quantity}
            image={product.image}
            id={product.id}
            key={product.id} />
        );

    return (
      <div className="p-a-2">
        <h3 className="m-b-2">Your Cart</h3>
        <div>{nodes}</div>
        <p className="m-b-2">Total: £{this.props.total}</p>
        <button className="btn btn-success-outline" onClick={this.props.onCheckoutClicked} disabled={!hasProducts}>
          Checkout
        </button>
      </div>
    );
  }
}

export default Cart;
