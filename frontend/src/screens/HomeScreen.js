import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Recipe from '../components/Recipe';
import Loader from '../components/Loader';
import { useState, useEffect } from 'react';
import axios from 'axios';

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data } = await axios.get(
        'https://api.edamam.com/api/recipes/v2?type=public&app_id=c491d062&app_key=2240fe8cb9c7aca4aed7b49a15064785&q=meat'
      );
      setRecipes(data.hits);
    };

    fetchRecipes();
  }, []);

  return (
    <>
      <Row>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Col key={recipe.recipe.uri} sm={12} md={6} lg={4} xl={3}>
              <Recipe key={recipe.recipe.uri} recipe={recipe} />
            </Col>
          ))
        ) : (
          <Loader />
        )}
      </Row>
    </>
  );
};

export default HomeScreen;
