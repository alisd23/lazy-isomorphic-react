import * as React from 'react';

interface IProductsListProps {
  children?: React.ReactElement<any>[];
  total: number;
  pageTotal: number;
  pageLimit: number;
  currentPage: number;
  pages: number;
}

class ProductsList extends React.Component<IProductsListProps, {}> {
  render() : React.ReactElement<IProductsListProps>  {
    const startIndex = this.props.pageLimit * (this.props.currentPage - 1) + 1;

    return (
      <div className="p-x-2 p-y-3">
        <div className="flex row-center">
          <h5 className="m-b-2 small-caps flex-expand">Products</h5>
          <h6 className="m-b-2 flex-static">
            <strong>{startIndex} - {startIndex + this.props.pageTotal - 1}</strong>
            <span> of </span>
            <strong>{this.props.total}</strong>
          </h6>
        </div>
        <p className="m-b-3 small-caps small text-muted">Page {this.props.currentPage} of {this.props.pages}</p>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default ProductsList;
