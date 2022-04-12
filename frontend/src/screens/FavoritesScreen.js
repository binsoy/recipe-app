import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Bootstrap
import { Row, Col } from 'react-bootstrap';

//Components
import Recipe from '../components/Recipe';
import Paginate from '../components/Paginate';
import Loader from '../components/Loader';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteRecipes } from '../redux/actions/recipeAction';
import { resetFavoritesActionCreator } from '../redux/slices/recipeSlice';

const FavoritesScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favorites, loading } = useSelector((state) => state.favorites);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(resetFavoritesActionCreator());
      dispatch(getFavoriteRecipes(1));
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <>
      <Row>
        {favorites && favorites.length > 0 ? (
          <>
            <h2>Favorites</h2>
            {favorites.map((recipe) => (
              <Col key={recipe.recipe.uri} sm={12} md={6} lg={4} xl={3}>
                <Recipe key={recipe.recipe.uri} recipe={recipe} />
              </Col>
            ))}
            <Paginate />
          </>
        ) : (
          <>
            {loading ? (
              <Loader />
            ) : (
              <h2 className='mt-5'>No favorites yet. Add now!</h2>
            )}
          </>
        )}
      </Row>
    </>
  );
};

export default FavoritesScreen;
