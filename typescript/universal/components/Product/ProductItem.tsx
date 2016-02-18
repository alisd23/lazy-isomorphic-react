import * as React from 'react';
import Product from './Product';
import IProduct from '../../interfaces/Product';

interface IProductItemProps {
  product: IProduct;
  onAddToCartClicked: React.EventHandler<any>;
  key?: any;
}

class ProductItem extends React.Component<IProductItemProps, {}> {

  render() : React.ReactElement<IProductItemProps> {
    // Import styles
    const { product } = this.props;

    return (
      <div className="p-y-2 flex row-center">
        <div className="flex-expand">
          <Product
            title={product.title}
            description={product.description}
            price={product.price}
            image={product.image}
            id={product.id} />
        </div>
        <div className="flex-static">
          <div
            onClick={this.props.onAddToCartClicked}
            className="add-button m-l-1"
            disabled={!product.quantity}>
            {
              product.quantity > 0
              ? <i className="material-icons md-24">add_shopping_cart</i>
              : <span className="small">Sold out</span>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ProductItem;
