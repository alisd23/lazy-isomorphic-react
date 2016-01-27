import * as React from 'react'

interface IProductsListProps {
  title: string;
  children?: React.ReactElement<any>[];
}

class ProductsList extends React.Component<IProductsListProps, {}> {
  render() : React.ReactElement<IProductsListProps>  {
    return (
      <div className="p-a-2">
        <h3 className="m-b-2">{this.props.title}</h3>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default ProductsList;
