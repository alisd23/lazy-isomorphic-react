import * as React from 'react'
import { connect } from 'react-redux'
import { removeFromCart } from '../../redux/modules/cart';
import { getVisibleProducts } from '../../redux/modules/products'
import Product from '../../components/Product/Product'
import IProduct from '../../interfaces/Product';

interface IProductListProps {
  product: IProduct;
  removeFromCart?: React.EventHandler<any>;
}

class ProductList extends React.Component<IProductListProps, {}> {

  render() : React.ReactElement<IProductListProps> {
    const { product } = this.props;
    return (
      <Product
        title={product.title}
        price={product.price}
        quantity={product.quantity}
        image={product.image}
        id={product.id} >
        <div className="remove-button" onClick={() => this.props.removeFromCart(product.id)}>
          <i className="material-icons md-18">close</i>
        </div>
      </Product>
    );
  }
}

export default connect(
  null,
  { removeFromCart }
)(ProductList)
