import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Bootstrap
import { Form, Button } from 'react-bootstrap';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };
  return (
    <Form onSubmit={handleSubmit} style={{ display: 'inherit' }}>
      <Form.Control
        type='text'
        name='q'
        placeholder='Search...'
        className='ms-sm-3 me-sm-2'
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
