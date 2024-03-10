import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  console.log(products);

  return (
    <>
      {loading ? (
        'Loading..'
      ) : (
        <div>
          {products?.products && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.25rem',
                margin: '1.25rem',
                'flex-wrap': 'wrap',
              }}
            >
              {products?.products?.map((product, i) => (
                <ProductCard product={product} key={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
