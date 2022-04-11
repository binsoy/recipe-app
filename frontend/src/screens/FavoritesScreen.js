import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Recipe from '../components/Recipe';
import { useNavigate } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';

const FavoritesScreen = () => {
  const navigate = useNavigate();

  const { favorites, loading } = useSelector((state) => state.favorites);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);
  return (
    <>
      <Row>
        <h2>Favorites</h2>
        {favorites ? (
          <>
            {favorites.map((recipe) => (
              <Col key={recipe.recipe.uri} sm={12} md={6} lg={4} xl={3}>
                <Recipe key={recipe.recipe.uri} recipe={recipe} />
              </Col>
            ))}
          </>
        ) : (
          <>
            <h2 className='mt-5'>No favorites yet. Add now!</h2>
          </>
        )}
      </Row>
    </>
  );
};

export default FavoritesScreen;
