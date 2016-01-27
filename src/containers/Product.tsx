import * as React from 'react';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { getProduct, getVisibleProducts, IProductsState } from '../reducers/products'
import IProduct from '../interfaces/Product';
import IAppPage from '../interfaces/AppPage';
import { addToCart } from '../actions';


interface ProductParams {
  id: number;
}
interface IProductContainerProps extends IAppPage<ProductParams> {
  products: IProduct[];
  addToCart?: React.EventHandler<any>;
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
    return (
      <div>
        {
          this.state.product &&
            <div className="p-y-3">
              <h2>{this.state.product.title}</h2>
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
    products: getVisibleProducts(state.products)
  }
}

export default connect(
  mapStateToProps,
  Object.assign({},
    routeActions,
    {addToCart}
  ) as any
)(ProductContainer)
