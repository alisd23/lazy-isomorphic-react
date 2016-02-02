import * as React from 'react';
import Product from './Product';
import IProduct from '../interfaces/Product';
import getClass from '../../helpers/classesHelper';

interface ICartProps {
  products: IProduct[];
  total: number;
  onCheckoutClicked: React.EventHandler<any>;
}

class Cart extends React.Component<ICartProps, {}> {
  render() : React.ReactElement<ICartProps> {
    const styles = require('../../../sass/common.scss');

    const hasProducts = this.props.products.length > 0;
    const nodes = !hasProducts
      ? <em>Please add some products to cart.</em>
      : this.props.products.map(product =>
          <Product
            title={product.title}
            price={product.price}
            quantity={product.quantity}
            id={product.id}
            key={product.id} />
        );

    return (
      <div className={getClass("p-a-2", styles)}>
        <h3 className={getClass("m-b-2", styles)}>Your Cart</h3>
        <div>{nodes}</div>
        <p className={getClass("m-b-2", styles)}>Total: £{this.props.total}</p>
        <button className={getClass("btn btn-success-outline", styles)} onClick={this.props.onCheckoutClicked} disabled={!hasProducts}>
          Checkout
        </button>
      </div>
    );
  }
}

export default Cart;
