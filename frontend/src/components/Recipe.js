import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavoriteRecipe,
  deleteFavoriteRecipe,
} from '../redux/actions/recipeAction';

const heartIconStyle = { float: 'right', fontSize: 20 };
const cardTitleStyle = {
  textOverflow: 'ellipsis',
  width: 220,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};
const removeLinkUnderline = { textDecoration: 'none' };

const Recipe = ({ recipe: { recipe } }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);

  const isRecipeFavorite = (id) => {
    if (favorites) {
      return favorites.some((x) => x.recipe.uri === id);
    }

    return false;
  };

  const handleFavoriteClick = (e) => {
    const favoriteRecipe = favorites.find((x) => x.recipe.uri === recipe.uri);
    if (favoriteRecipe) {
      dispatch(deleteFavoriteRecipe(favoriteRecipe._id));
    } else {
      dispatch(addFavoriteRecipe(recipe));
    }
  };

  return (
    <Card className='my-3 p-3 rounded'>
      <Link
        to={`/recipes/${recipe.uri.slice(recipe.uri.lastIndexOf('_') + 1)}`}
        state={recipe}
        style={removeLinkUnderline}
      >
        <Card.Img
          src={recipe.images.SMALL.url}
          alt={recipe.label}
          variant='top'
        />
      </Link>
      <Card.Body className='p-0 mt-1'>
        <Card.Title as='div' style={cardTitleStyle}>
          <strong>{recipe.label}</strong>
        </Card.Title>
        <Card.Text as='div'>
          <Row>
            <Col as='h6'>{recipe.dishType[0]}</Col>
            <Col onClick={handleFavoriteClick}>
              {isRecipeFavorite(recipe.uri) ? (
                <i className={'fa-solid fa-heart'} style={heartIconStyle} />
              ) : (
                <i className={'fa-regular fa-heart'} style={heartIconStyle} />
              )}
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Recipe;
