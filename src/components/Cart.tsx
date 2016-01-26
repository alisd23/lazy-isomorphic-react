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

    const hasProducts = this.props.products.length > 0;
    const nodes = !hasProducts
      ? <em>Please add some products to cart.</em>
      : this.props.products.map(product =>
          <Product
            title={product.title}
            price={product.price}
            quantity={product.quantity}
            key={product.id} />
        );

    return (
      <div>
        <h3>Your Cart 1</h3>
        <div>{nodes}</div>
        <p>Total: £{this.props.total}</p>
        <button onClick={this.props.onCheckoutClicked} disabled={!hasProducts}>
          Checkout
        </button>
      </div>
    );
  }
}

export default Cart;
