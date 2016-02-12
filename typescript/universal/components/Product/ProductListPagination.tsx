import * as React from 'react';
import * as classNames from 'classnames';

const MAX_LINKS = 10;

interface IProductsListPaginationProps {
  page: number;
  pages: number;
  onPageSelected: (page: number) => void;
}

class ProductsListPagination extends React.Component<IProductsListPaginationProps, {}> {
  render() : React.ReactElement<IProductsListPaginationProps>  {

    const linksBefore = this.props.page - 1;
    const linksAfter = this.props.pages - this.props.page;

    let linksStart = this.props.page;
    let linksEnd = this.props.page;

    while ((linksEnd - linksStart) < MAX_LINKS) {
      if (linksEnd < this.props.pages) {
        linksEnd++;
      }
      if ((linksStart > 1) && ((linksEnd - linksStart) < MAX_LINKS)) {
        linksStart--;
      }
      if (linksEnd === this.props.pages && linksStart === 1) {
        break;
      }
    }

    const links: JSX.Element[] = [];

    for (let i = linksStart; i <= linksEnd; i++) {
      const classes = classNames(
        "pagination-link",
        i === this.props.page ? 'active' : ''
      )
      links.push(
        <div className={classes} key={i} onClick={() => this.props.onPageSelected(i)} >
          <span>{i}</span>
        </div>
      )
    }

    return (
      <div className="pagination p-y-3">
        { links }
      </div>
    );
  }
}

export default ProductsListPagination;
