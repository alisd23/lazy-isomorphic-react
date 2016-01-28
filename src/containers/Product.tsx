import * as React from 'react';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { getProduct, getVisibleProducts, IProductsState } from '../reducers/products'
import IProduct from '../interfaces/Product';
import IAppPage from '../interfaces/AppPage';
import { addToCart } from '../actions';
import { changeRating } from '../actions/productPage';
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

class ProductContainer extends React.Component<IProductContainerProps, IProductContainerState> {

  componentWillMount() {
    this.setState({
      product: this.props.products.filter((p) => p.id == this.props.params.id)[0]
    })
  }

  render() : React.ReactElement<IProductContainerProps> {
    const Rating = [];
    for (let i = 1 ; i <= this.props.maxRating ; i++) {
      const classes = classnames(
        'material-icons md-48 star',
        this.props.rating < i ? 'light' : 'star-gold'
      );
      Rating.push(<i onClick={() => this.props.changeRating(i)} key={i} className={classes}>star</i>);
    }

    return (
      <div id="product-page">
        {
          this.state.product &&
            <div className="p-y-3">
              <h2>
                {this.state.product.title}
                <span className="p-l-1">
                  { Rating }
                </span>
              </h2>
              <h3><strong>£{this.state.product.price}</strong></h3>
              <button className="btn btn-primary m-t-3" onClick={() => this.addToCart()}>
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
