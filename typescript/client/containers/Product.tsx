import * as React from 'react';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { getProduct, getVisibleProducts, IProductsState } from '../redux/modules/products'
import IProduct from '../interfaces/Product';
import IAppPage from '../interfaces/AppPage';
import { addToCart } from '../redux/modules/shared';
import { changeRating } from '../redux/modules/productPage';
import getClass from '../../helpers/classesHelper';
import classnames = require('classnames');

// Import scss
import '../../../sass/productPage.scss';

interface ProductParams {
  id: number;
}
interface IProductContainerProps extends IAppPage<ProductParams> {
  products: IProduct[];
  rating: number;
  maxRating: number;
  addToCart?: Function;
  changeRating?: Function;
  push?: (String) => any;
}
interface IProductContainerState {
  product: IProduct;
}

class ProductContainer extends React.Component<IProductContainerProps, IProductContainerState> {

  componentWillMount() {
    this.setState({
      product: this.props.products.filter((p) => p.id == this.props.params.id)[0]
    })
  }

  render() : React.ReactElement<IProductContainerProps> {
    const styles = Object.assign({},
      require('../../../sass/common.scss'),
      require('../../../sass/productPage.scss')
    );

    const Rating = [];
    let i;
    for (i = 1 ; i <= this.props.maxRating ; i++) {
      ((rating) => {
        const classes = classnames(
          'material-icons md-24 star',
          this.props.rating < i ? 'light' : 'star-gold'
        );
        Rating.push(<i onClick={() => this.props.changeRating(rating)} key={rating} className={getClass(classes, styles)}>star</i>);
      })(i);
    }

    return (
      <div id={getClass("product-page", styles)}>
        {
          this.state.product &&
            <div className={getClass("p-y-3", styles)}>
              <h2>
                {this.state.product.title}
                <span className={getClass("p-l-1", styles)}>
                  { Rating }
                </span>
              </h2>
              <h3><strong>£{this.state.product.price}</strong></h3>
              <button className={getClass("btn btn-primary m-t-3", styles)} onClick={() => this.addToCart()}>
                Add to Cart
              </button>
            </div>
        }
      </div>
    )
  }

  private addToCart() {
    this.props.addToCart(this.state.product.id);
    this.props.push('/');
  }
}

function mapStateToProps(state) {
  return {
    products: getVisibleProducts(state.products),
    rating: state.productPage.rating,
    maxRating: state.productPage.maxRating
  }
}

export default connect(
  mapStateToProps,
  Object.assign({},
    routeActions,
    { addToCart, changeRating }
  ) as any
)(ProductContainer)
