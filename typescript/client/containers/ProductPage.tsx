import * as React from 'react';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { getProduct, getVisibleProducts, IProductsState } from '../redux/modules/products'
import IProduct from '../interfaces/Product';
import IAppPage from '../interfaces/AppPage';
import { addToCart } from '../redux/modules/cart';
import { changeRating } from '../redux/modules/productPage';
import classnames = require('classnames');

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

// TODO - Separate into CONTAINER (this file - funcionality, state) and
// PRESENTATIONAL COMPONENT (Styles, markup)
class ProductContainer extends React.Component<IProductContainerProps, IProductContainerState> {

  componentWillMount() {
    this.setState({
      product: this.props.products.filter((p) => p.id == this.props.params.id)[0]
    })
  }

  render() : React.ReactElement<IProductContainerProps> {
    require('../../../sass/common.scss');
    require('../../../sass/productPage.scss');

    const Rating = [];
    let i;
    for (i = 1 ; i <= this.props.maxRating ; i++) {
      ((rating) => {
        const classes = classnames(
          'material-icons md-24 star',
          this.props.rating < i ? 'light' : 'star-gold'
        );
        Rating.push(<i onClick={() => this.props.changeRating(rating)} key={rating} className={classes}>star</i>);
      })(i);
    }

    return (
      <div id="product-page">
        {
          this.state.product &&
            <div className="p-y-3">
              <div className="flex">
                <div className="frame flex-static m-r-3">
                  <img src={`/assets/images/${this.state.product.image}`} />
                </div>
                <div>
                  <h2 className="m-b-1">
                    {this.state.product.title}
                    <span className="p-l-1">
                      { Rating }
                    </span>
                  </h2>
                  <h3><strong>£{this.state.product.price}</strong></h3>
                </div>
              </div>
              <button className="btn btn-lg btn-primary-outline add-to-cart m-t-3" onClick={() => this.addToCart()}>
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
