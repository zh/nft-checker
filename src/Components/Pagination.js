import React, { useState } from 'react';
import { Button } from '@material-ui/core';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const Pagination = (props) => {
  const { data, setOffset, offset, perPage } = props;

  const [currentPage, setCurrentPage] = useState(1 + offset / perPage);
  const [pageCount, setPageCount] = useState(0);

  React.useEffect(() => {
    if (!data) return;
    setPageCount(Math.ceil(data.length / perPage));
  }, [data, offset, perPage]);

  const switchPage = (page) => {
    setCurrentPage(page);
    const newOffset = (page - 1) * perPage;
    setOffset(newOffset);
  };

  return (
    <>
      {range(1, pageCount).map((index) => (
        <Button
          key={index}
          color={currentPage === index ? 'primary' : 'default'}
          variant={currentPage === index ? 'contained' : 'outlined'}
          size="small"
          onClick={() => {
            switchPage(index);
          }}
        >
          <i className="fa fa-refresh"></i>
          &nbsp;{index}
        </Button>
      ))}
    </>
  );
};

export default Pagination;
