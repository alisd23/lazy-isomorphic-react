import * as React from 'react';
import classnames = require('classnames');
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

import { endLoading } from '../redux/modules/global'
import { getProduct } from '../redux/modules/products'
import { addToCart } from '../redux/modules/cart';
import { changeRating } from '../redux/modules/productPage';

import IProduct from '../interfaces/Product';
import IAppPage from '../interfaces/AppPage';

import ProductPageComponent from '../components/ProductPage';

interface ProductParams {
  id: number;
}
interface ProductPageContainerProps extends IAppPage<ProductParams> {
  product: IProduct;
  rating: number;
  maxRating: number;
  addToCart?: Function;
  changeRating?: Function;
  endLoading?: Function;
  push?: (String) => any;
}

class ProductPageContainer extends React.Component<ProductPageContainerProps, {}> {

  componentDidMount(): void {
    this.props.endLoading();
  }

  render() : React.ReactElement<ProductPageContainerProps> {

    return (
      <ProductPageComponent
        onAddToCartClicked={() => this.addToCart()}
        onRatingClicked={(r) => this.props.changeRating(r)}
        maxRating={this.props.maxRating}
        rating={this.props.rating}
        product={this.props.product}
      />
    )
  }

  private addToCart() {
    this.props.addToCart(this.props.product.id);
    this.props.push('/');
  }
}

function mapStateToProps(state, ownProps) {
  return {
    product: getProduct(state.products, ownProps.params.id),
    rating: state.productPage.rating,
    maxRating: state.productPage.maxRating
  }
}

export default connect(
  mapStateToProps,
  Object.assign({},
    routeActions,
    { addToCart, changeRating, endLoading }
  ) as any
)(ProductPageContainer)
