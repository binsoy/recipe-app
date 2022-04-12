import React from 'react';

//Redux
import { getFavoriteRecipes } from '../redux/actions/recipeAction';
import { useDispatch, useSelector } from 'react-redux';

//Bootstrap
import { Pagination } from 'react-bootstrap';

const Paginate = () => {
  const dispatch = useDispatch();
  const { page, pages } = useSelector((state) => state.favorites);

  const handlePageClick = (page) => {
    dispatch(getFavoriteRecipes(page));
  };

  return (
    pages > 1 && (
      <Pagination className='ps-2'>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            key={x + 1}
            active={x + 1 === page}
            onClick={() => handlePageClick(x + 1)}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
