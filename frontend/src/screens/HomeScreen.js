import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Recipe from '../components/Recipe';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
//Redux
import { useDispatch, useSelector } from 'react-redux';

import { resetListActionCreator } from '../redux/slices/recipeSlice';
import {
  getRecipes,
  getMoreRecipes,
  getFavoriteRecipes,
} from '../redux/actions/recipeAction';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.recipes);
  const { recipesInfo, loading } = recipes;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { keyword } = useParams();

  useEffect(() => {
    dispatch(resetListActionCreator());
    dispatch(getRecipes(keyword));
    if (userInfo) {
      dispatch(getFavoriteRecipes());
    }
  }, [dispatch, keyword, userInfo]);

  const handleShowMoreClick = () => {
    dispatch(getMoreRecipes(recipesInfo._links.next.href));
  };

  return (
    <>
      <Row>
        {recipesInfo && recipesInfo.count > 0 ? (
          <>
            {recipesInfo.hits.map((recipe) => (
              <Col key={recipe.recipe.uri} sm={12} md={6} lg={4} xl={3}>
                <Recipe key={recipe.recipe.uri} recipe={recipe} />
              </Col>
            ))}
            <Col md={12} style={{ textAlign: 'center' }}>
              {loading ? (
                <Loader />
              ) : (
                <>
                  {recipesInfo.count > 20 && (
                    <Button variant='primary' onClick={handleShowMoreClick}>
                      Show More Results
                    </Button>
                  )}
                </>
              )}
            </Col>
          </>
        ) : (
          <>
            {loading ? (
              <Loader />
            ) : (
              <h2 className='mt-5'>No results for "{keyword}"</h2>
            )}
          </>
        )}
      </Row>
    </>
  );
};

export default HomeScreen;
