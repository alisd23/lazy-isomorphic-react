import * as React from 'react';
import Product from './Product';
import IProduct from '../interfaces/Product';

interface IProductItemProps {
  product: IProduct;
  onAddToCartClicked: React.EventHandler<any>;
  key?: any;
}

class ProductItem extends React.Component<IProductItemProps, {}> {

  render() : React.ReactElement<IProductItemProps> {

    const { product } = this.props;

    return (
      <div
        style={{ marginBottom: 20 }}>
        <Product
          title={product.title}
          price={product.price} />
        <button
          onClick={this.props.onAddToCartClicked}
          disabled={!product.quantity}>
          {product.quantity > 0 ? 'Add to cart' : 'Sold Out'}
        </button>
      </div>
    );
  }
}

export default ProductItem;
