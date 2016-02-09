import * as React from 'react'
import { connect } from 'react-redux'
import { addToCart, removeFromCart, deleteFromCart } from '../../redux/modules/cart';
import { getVisibleProducts, getProduct } from '../../redux/modules/products'
import Product from '../../components/Product/Product'
import IProduct from '../../interfaces/Product';
import IAppState from '../../interfaces/AppState';

interface IProductListProps {
  product: IProduct;
  leftInStock?: number;
  addToCart?: (id: number) => void;
  removeFromCart?: (id: number) => void;
  deleteFromCart?: (id: number) => void;
}

class ProductList extends React.Component<IProductListProps, {}> {

  render() : React.ReactElement<IProductListProps> {
    const { product } = this.props;

    const DeleteButton = (
      <div className="remove-button" onClick={() => this.props.deleteFromCart(product.id)}>
        <i className="material-icons md-18">close</i>
      </div>
    );

    const QuantityControls = (
      <div className="quantity-controls m-l-1">
        {
          (this.props.leftInStock > 0) &&
            <i
              className="material-icons md-18"
              onClick={() => this.props.addToCart(product.id)}>
              add_circle_outline
            </i>
        }
        {
          (this.props.product.quantity > 1) &&
            <i
              className="material-icons md-18"
              onClick={() => this.props.removeFromCart(product.id)}>
              remove_circle_outline
            </i>
        }
      </div>
    );

    return (
      <Product
        title={product.title}
        price={product.price}
        quantity={product.quantity}
        image={product.image}
        id={product.id}
        removeButton={DeleteButton}
        quantityControls={QuantityControls} >
      </Product>
    );
  }
}

function mapStateToProps(state: IAppState, ownProps: IProductListProps) {
  return {
    leftInStock: getProduct(state.products, ownProps.product.id).quantity
  }
}

export default connect(
  mapStateToProps,
  { addToCart, removeFromCart, deleteFromCart }
)(ProductList)
