import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';

//Components
import Loader from '../components/Loader';

//Bootstrap
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavoriteRecipe,
  deleteFavoriteRecipe,
} from '../redux/actions/recipeAction';
import axios from 'axios';

const hrStyle = {
  color: 'black',
  backgroundColor: 'black',
  height: 1,
};

const RecipeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const recipe = location.state;

  const { favorites } = useSelector((state) => state.favorites);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const isRecipeFavorite = (id) => {
    if (favorites) {
      return favorites.some((x) => x.recipe.uri === id);
    }

    return false;
  };

  const handleFavoriteClick = () => {
    if (!userInfo) {
      navigate('/login');
    } else {
      const favoriteRecipe = favorites.find((x) => x.recipe.uri === recipe.uri);
      if (favoriteRecipe) {
        dispatch(deleteFavoriteRecipe(favoriteRecipe._id));
      } else {
        dispatch(addFavoriteRecipe(recipe));
      }
    }
  };

  const handleDownloadClick = () => {
    axios
      .post('/api/files/create-pdf', recipe)
      .then(() => axios.get('/api/files/download', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, `${recipe.label}_${Date.now()}.pdf`);
      });
  };

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
            <Button variant='primary' onClick={handleDownloadClick}>
              Download PDF
            </Button>
            <h5 className='pt-2' onClick={handleFavoriteClick}>
              {isRecipeFavorite(recipe.uri) ? (
                <i className={'fa-solid fa-heart'} style={{ fontSize: 30 }} />
              ) : (
                <i className={'fa-regular fa-heart'} style={{ fontSize: 30 }} />
              )}
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
