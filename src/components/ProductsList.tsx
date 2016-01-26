import * as React from 'react'

interface IProductsListProps {
  title: string;
  children?: React.ReactElement<any>[];
}

class ProductsList extends React.Component<IProductsListProps, {}> {
  render() : React.ReactElement<IProductsListProps>  {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default ProductsList;
