import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Recipe from '../components/Recipe';
import Loader from '../components/Loader';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
//Redux
import { useDispatch, useSelector } from 'react-redux';

import { resetListActionCreator } from '../redux/slices/recipeSlice';
import { getRecipes } from '../redux/actions/recipeAction';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.recipes);
  const { recipesInfo, loading } = recipes;

  const { keyword } = useParams();
  let searchItem = 'beef';
  if (keyword) {
    searchItem = keyword;
  }

  // TODO: transfer app_id & app_key to .env
  let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=c491d062&app_key=2240fe8cb9c7aca4aed7b49a15064785&q=${searchItem}`;

  useEffect(() => {
    dispatch(resetListActionCreator());
    dispatch(getRecipes(url));
  }, [dispatch, url]);

  const handleShowMoreClick = () => {
    dispatch(getRecipes(recipesInfo._links.next.href));
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
