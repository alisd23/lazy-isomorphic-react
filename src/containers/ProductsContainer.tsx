import * as React from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../actions'
import { getVisibleProducts } from '../reducers/products'
import ProductItem from '../components/ProductItem'
import ProductsList from '../components/ProductsList'
import IProduct from '../interfaces/Product';

interface IProductsContainerProps {
  products?: IProduct[];
  addToCart?: React.EventHandler<any>;
}

class ProductsContainer extends React.Component<IProductsContainerProps, {}> {

  render() : React.ReactElement<IProductsContainerProps> {
    const { products } = this.props;
    return (
      <ProductsList title="Products">
        {products.map(product =>
          <ProductItem
            key={product.id}
            product={product}
            onAddToCartClicked={() => this.props.addToCart(product.id)} />
        )}
      </ProductsList>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: getVisibleProducts(state.products)
  }
}

export default connect(
  mapStateToProps,
  { addToCart }
)(ProductsContainer)
