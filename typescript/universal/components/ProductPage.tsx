import * as React from 'react';
import IProduct from '../interfaces/Product';
import { addToCart } from '../redux/modules/cart';
import classnames = require('classnames');

interface IProductComponentProps {
  product: IProduct;
  rating: number;
  maxRating: number;
  onAddToCartClicked?: () => any;
  onRatingClicked?: (number) => any;
}

export default class ProductContainer extends React.Component<IProductComponentProps, {}> {

  render() : React.ReactElement<IProductComponentProps> {
    require('../../../sass/productPage.scss');

    const Rating = [];
    let i;
    for (i = 1 ; i <= this.props.maxRating ; i++) {
      ((rating) => {
        const classes = classnames(
          'material-icons md-24 star',
          this.props.rating < i ? 'light' : 'star-gold'
        );
        Rating.push(<i onClick={() => this.props.onRatingClicked(rating)} key={rating}
          className={classes}>star</i>);
      })(i);
    }

    return (
      <div id="product-page" className="container">
        {
          this.props.product &&
            <div className="p-y-3">
              <div className="flex">
                <div className="frame flex-static m-r-3">
                  <img src={`/assets/images/${this.props.product.image}`} />
                </div>
                <div>
                  <h2 className="m-b-1">
                    {this.props.product.title}
                    <span className="p-l-1">{ Rating }</span>
                  </h2>
                  <h3><strong>£{this.props.product.price}</strong></h3>
                </div>
              </div>
              <button className="btn btn-lg btn-primary-outline add-to-cart m-t-3" onClick={() => this.props.onAddToCartClicked()}>
                Add to Cart
              </button>
            </div>
        }
      </div>
    )
  }
}
