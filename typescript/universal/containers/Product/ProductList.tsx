import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/modules/cart';
import { getVisibleProducts } from '../../redux/modules/products';
import ProductItem from '../../components/Product/ProductItem';
import ProductsList from '../../components/Product/ProductsList';
import IProduct from '../../interfaces/Product';

interface IProductListProps {
  products?: IProduct[];
  addToCart?: React.EventHandler<any>;
}

class ProductList extends React.Component<IProductListProps, {}> {

  render() : React.ReactElement<IProductListProps> {
    const { products } = this.props;
    return (
      <ProductsList productsCount={products.length}>
        <ReactCSSTransitionGroup transitionName="slide-in-right" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        {
          products.map(product =>
            <ProductItem
              key={product.id}
              product={product}
              onAddToCartClicked={() => this.props.addToCart(product.id)} />
          )
        }
        </ReactCSSTransitionGroup>
      </ProductsList>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: getVisibleProducts(state.products).reverse()
  }
}

export default connect(
  mapStateToProps,
  { addToCart }
)(ProductList)
