import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';

const hrStyle = {
  color: 'black',
  backgroundColor: 'black',
  height: 1,
};

const RecipeScreen = () => {
  const params = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const { data } = await axios.get(
        `https://api.edamam.com/api/recipes/v2/${params.id}?type=public&app_id=c491d062&app_key=2240fe8cb9c7aca4aed7b49a15064785`
      );
      setRecipe(data.recipe);
    };

    fetchRecipe();
  }, [params.id]);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {recipe ? (
        <Row>
          <Col>
            <Image src={recipe.images.REGULAR.url} alt={recipe.label} />
          </Col>
          <Col>
            <h2>{recipe.label}</h2>
            <p>
              See full recipe on:{' '}
              <a href={recipe.url} target='_blank' rel='noreferrer'>
                {recipe.source}
              </a>
            </p>
            <hr style={hrStyle} />
            <h6>Cuisine Type: {recipe.cuisineType[0]}</h6>
            <h6>Meal Type: {recipe.mealType[0]}</h6>
            <h6>Dish Type: {recipe.dishType[0]}</h6>
            <Button variant='primary'>Download PDF</Button>
            <h5 className='pt-2'>
              <i className='fa-regular fa-heart' style={{ fontSize: 30 }} />
            </h5>
          </Col>
          <Col>
            <h5>{recipe.ingredientLines.length} Ingredients</h5>
            <ListGroup>
              {recipe.ingredientLines.map((x, i) => {
                return <ListGroup.Item key={i}>{x}</ListGroup.Item>;
              })}
            </ListGroup>
          </Col>
        </Row>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default RecipeScreen;
