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
    // Import styles
    require('../../../sass/common.scss');
    const { product } = this.props;

    return (
      <div className="m-b-2 flex">
        <div className="flex-expand">
          <Product
            title={product.title}
            price={product.price}
            image={product.image}
            id={product.id} />
        </div>
        <div className="flex-static">
          <button
            onClick={this.props.onAddToCartClicked}
            className="btn btn-sm btn-primary-outline"
            disabled={!product.quantity}>
            {product.quantity > 0 ? 'Add to cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    );
  }
}

export default ProductItem;
