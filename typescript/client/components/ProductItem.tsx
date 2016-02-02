import * as React from 'react';
import Product from './Product';
import IProduct from '../interfaces/Product';
import getClass from '../../helpers/classesHelper';

interface IProductItemProps {
  product: IProduct;
  onAddToCartClicked: React.EventHandler<any>;
  key?: any;
}

class ProductItem extends React.Component<IProductItemProps, {}> {

  render() : React.ReactElement<IProductItemProps> {
    const styles = require('../../../sass/common.scss');
    const { product } = this.props;

    return (
      <div className={getClass("m-b-2 flex", styles)}>
        <div className={getClass("flex-expand", styles)}>
          <Product
            title={product.title}
            price={product.price}
            id={product.id} />
        </div>
        <div className={getClass("flex-static", styles)}>
          <button
            onClick={this.props.onAddToCartClicked}
            className={getClass("btn btn-sm btn-primary-outline", styles)}
            disabled={!product.quantity}>
            {product.quantity > 0 ? 'Add to cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    );
  }
}

export default ProductItem;
