import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Helmet} from 'react-helmet-async';
import Product from '../components/Product';

const reducer = (state, action) => {
  console.log('Action:', action.type); // Log the action type
  console.log('Previous State:', state); // Log the previous state
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


const initialState = {
  products: [],
  loading: true,
  error: '',
};

const logger = createLogger();

const store = createStore(reducer, initialState, applyMiddleware(logger));

function HomeScreen() {
  const [{ products, loading, error }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Artify</title>
      </Helmet>
      <h1>Featured Paintings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
              <Product product={product}></Product> 
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
