import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const heartIconStyle = { float: 'right', fontSize: 20 };
const cardTitleStyle = {
  textOverflow: 'ellipsis',
  width: 220,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};
const removeLinkUnderline = { textDecoration: 'none' };

const Recipe = ({ recipe }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link
        to={`/recipes/${recipe.recipe.uri.slice(
          recipe.recipe.uri.lastIndexOf('_') + 1
        )}`}
      >
        <Card.Img
          src={recipe.recipe.images.SMALL.url}
          alt={recipe.recipe.label}
          variant='top'
        />
      </Link>
      <Card.Body className='p-0 mt-1'>
        <Link
          to={`/recipes/${recipe.recipe.uri.slice(
            recipe.recipe.uri.lastIndexOf('_') + 1
          )}`}
          style={removeLinkUnderline}
        >
          <Card.Title as='div' style={cardTitleStyle}>
            <strong>{recipe.recipe.label}</strong>
          </Card.Title>
          <Card.Text as='div'>
            <Row>
              <Col as='h6'>{recipe.recipe.dishType[0]}</Col>
              <Col>
                <i className='fa-regular fa-heart' style={heartIconStyle} />
              </Col>
            </Row>
          </Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Recipe;
