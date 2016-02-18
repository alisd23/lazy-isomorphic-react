import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as ReactTransitionGroup from 'react-addons-transition-group';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/modules/cart';
import { getVisibleProducts } from '../../redux/modules/products';
import ProductItem from '../../components/Product/ProductItem';
import SpringItem from '../../components/SpringItem';
import ProductsList from '../../components/Product/ProductsList';
import ProductListPagination from '../../components/Product/ProductListPagination';
import IProduct from '../../interfaces/Product';
import IAppState from '../../interfaces/AppState';


const PAGE_LENGTH = 10;

interface IProductListProps {
  products?: IProduct[];
  addToCart?: React.EventHandler<any>;
}
interface IProductListState {
  page?: number;
}

class ProductList extends React.Component<IProductListProps, {}> {
  state = {
    page: 1
  }

  render() : React.ReactElement<IProductListProps> {
    const { products } = this.props;

    const pages: IProduct[][] = [];
    for (let i = 0; i < this.props.products.length; i += PAGE_LENGTH) {
      pages.push(this.props.products.slice(i, i+PAGE_LENGTH));
    }

    return (
      <ProductsList
        total={products.length}
        pageTotal={pages[this.state.page - 1].length}
        pageLimit={PAGE_LENGTH}
        currentPage={this.state.page}
        pages={pages.length} >
        <div>
          {
            pages.map((pageProducts, i) => {

              return (i === this.state.page - 1) &&
                <div className="page-wrapper" key={i}>
                  {/*<ReactCSSTransitionGroup
                    transitionName="new-product"
                    transitionEnterTimeout={500}
                    transitionLeave={false} >
                    {
                      pageProducts.map(product =>
                        <ProductItem
                          key={product.id}
                          product={product}
                          onAddToCartClicked={() => this.props.addToCart(product.id)} />
                      )
                    }
                  </ReactCSSTransitionGroup>*/}
                  <ReactTransitionGroup>
                    {
                      pageProducts.map(product =>
                        <SpringItem key={product.id}>
                          <ProductItem
                            product={product}
                            onAddToCartClicked={() => this.props.addToCart(product.id)} />
                        </SpringItem>
                      )
                    }
                  </ReactTransitionGroup>
                </div>;
            })
          }
        </div>
        <ProductListPagination
          page={this.state.page}
          pages={pages.length}
          onPageSelected={(page) => this.changePage(page)} />

      </ProductsList>
    );
  }


  private changePage(page: number) {
    this.setState({ page });
    document.body.scrollTop = 0;
  }
}

function mapStateToProps(state: IAppState) {
  return {
    products: getVisibleProducts(state.products).reverse()
  }
}

export default connect(
  mapStateToProps,
  { addToCart }
)(ProductList)
